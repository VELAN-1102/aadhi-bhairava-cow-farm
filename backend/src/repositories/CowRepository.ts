import prisma from '../utils/prisma';
import { Cow, CowBreed, Pregnancy, CalvingHistory, Prisma } from '@prisma/client';
import { ICowRepository } from '../interfaces/repositories/ICowRepository';

export class CowRepository implements ICowRepository {
  // --- Breed Management ---
  public async getBreeds(): Promise<CowBreed[]> {
    return prisma.cowBreed.findMany({
      orderBy: { name: 'asc' },
    });
  }

  public async findBreedByName(name: string): Promise<CowBreed | null> {
    return prisma.cowBreed.findUnique({ where: { name } });
  }

  public async createBreed(name: string, description?: string): Promise<CowBreed> {
    return prisma.cowBreed.create({ data: { name, description } });
  }

  // --- Cow Management ---
  public async findCowById(id: string) {
    return prisma.cow.findUnique({
      where: { id },
      include: {
        breed: true,
        images: true,
        pregnancies: { orderBy: { breedingDate: 'desc' } },
        calvingHistories: { orderBy: { calvingDate: 'desc' } },
        vaccinations: { orderBy: { dueDate: 'asc' } },
        medicalRecords: { orderBy: { date: 'desc' } },
      },
    });
  }

  public async findCowByTag(tagNumber: string): Promise<Cow | null> {
    return prisma.cow.findUnique({
      where: { tagNumber },
      include: { breed: true },
    });
  }

  public async getCows(params: {
    page: number;
    limit: number;
    search?: string;
    breedId?: string;
    status?: string;
    gender?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const { page, limit, search, breedId, status, gender, sortBy = 'tagNumber', sortOrder = 'asc' } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.CowWhereInput = {};

    if (breedId) whereClause.breedId = breedId;
    if (status) whereClause.status = status;
    if (gender) whereClause.gender = gender;

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tagNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await prisma.$transaction([
      prisma.cow.count({ where: whereClause }),
      prisma.cow.findMany({
        where: whereClause,
        include: { breed: true, images: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
    ]);

    return { total, data };
  }

  public async createCow(data: Prisma.CowCreateInput): Promise<Cow> {
    return prisma.cow.create({ data });
  }

  public async updateCow(id: string, data: Prisma.CowUpdateInput): Promise<Cow> {
    return prisma.cow.update({ where: { id }, data });
  }

  public async deleteCow(id: string): Promise<Cow> {
    return prisma.cow.delete({ where: { id } });
  }

  // --- Cow Cover Images ---
  public async addCowImage(cowId: string, imageUrl: string, isCover = false) {
    if (isCover) {
      // Set all other images as not cover
      await prisma.cowImage.updateMany({
        where: { cowId },
        data: { isCover: false },
      });
    }
    return prisma.cowImage.create({
      data: { cowId, imageUrl, isCover },
    });
  }

  // --- Pregnancy Tracking ---
  public async getPregnancies(cowId?: string) {
    return prisma.pregnancy.findMany({
      where: cowId ? { cowId } : {},
      include: { cow: true },
      orderBy: { breedingDate: 'desc' },
    });
  }

  public async createPregnancy(data: Prisma.PregnancyUncheckedCreateInput): Promise<Pregnancy> {
    return prisma.$transaction(async (tx) => {
      // Create pregnancy record
      const pregnancy = await tx.pregnancy.create({ data });
      // Update cow status to PREGNANT
      await tx.cow.update({
        where: { id: data.cowId },
        data: { status: 'PREGNANT' },
      });
      return pregnancy;
    });
  }

  public async updatePregnancyStatus(id: string, status: string, notes?: string): Promise<Pregnancy> {
    return prisma.pregnancy.update({
      where: { id },
      data: { status, notes },
    });
  }

  // --- Calving History ---
  public async getCalvingHistory(cowId?: string) {
    return prisma.calvingHistory.findMany({
      where: cowId ? { cowId } : {},
      include: { cow: true, pregnancy: true },
      orderBy: { calvingDate: 'desc' },
    });
  }

  public async createCalvingRecord(data: Prisma.CalvingHistoryUncheckedCreateInput, motherStatus: string): Promise<CalvingHistory> {
    return prisma.$transaction(async (tx) => {
      // Create calving record
      const calving = await tx.calvingHistory.create({ data });

      // Update pregnancy record status
      await tx.pregnancy.update({
        where: { id: data.pregnancyId },
        data: { status: 'COMPLETED' },
      });

      // Reset mother's status (e.g. LACTATING, HEALTHY)
      await tx.cow.update({
        where: { id: data.cowId },
        data: { status: motherStatus },
      });

      return calving;
    });
  }
}

export default new CowRepository();
