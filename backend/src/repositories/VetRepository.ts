import prisma from '../utils/prisma';
import { MedicalRecord, Vaccination, Disease, Treatment, Prisma } from '@prisma/client';
import { IVetRepository } from '../interfaces/repositories/IVetRepository';

export class VetRepository implements IVetRepository {
  // --- Medical Records ---
  public async getMedicalRecords(params: {
    page: number;
    limit: number;
    cowId?: string;
    status?: string;
  }) {
    const { page, limit, cowId, status } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.MedicalRecordWhereInput = {};
    if (cowId) whereClause.cowId = cowId;
    if (status) whereClause.status = status;

    const [total, data] = await prisma.$transaction([
      prisma.medicalRecord.count({ where: whereClause }),
      prisma.medicalRecord.findMany({
        where: whereClause,
        include: { cow: true, treatments: { include: { disease: true } } },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
    ]);

    return { total, data };
  }

  public async getMedicalRecordById(id: string) {
    return prisma.medicalRecord.findUnique({
      where: { id },
      include: { cow: true, treatments: { include: { disease: true } } },
    });
  }

  public async createMedicalRecord(data: Prisma.MedicalRecordUncheckedCreateInput): Promise<MedicalRecord> {
    return prisma.medicalRecord.create({ data });
  }

  public async updateMedicalRecord(id: string, data: Prisma.MedicalRecordUncheckedUpdateInput): Promise<MedicalRecord> {
    return prisma.medicalRecord.update({ where: { id }, data });
  }

  // --- Vaccinations ---
  public async getVaccinations(params: {
    page: number;
    limit: number;
    cowId?: string;
    status?: string;
    dueDateRangeStart?: Date;
    dueDateRangeEnd?: Date;
  }) {
    const { page, limit, cowId, status, dueDateRangeStart, dueDateRangeEnd } = params;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.VaccinationWhereInput = {};
    if (cowId) whereClause.cowId = cowId;
    if (status) whereClause.status = status;
    if (dueDateRangeStart || dueDateRangeEnd) {
      whereClause.dueDate = {};
      if (dueDateRangeStart) whereClause.dueDate.gte = dueDateRangeStart;
      if (dueDateRangeEnd) whereClause.dueDate.lte = dueDateRangeEnd;
    }

    const [total, data] = await prisma.$transaction([
      prisma.vaccination.count({ where: whereClause }),
      prisma.vaccination.findMany({
        where: whereClause,
        include: { cow: true },
        skip,
        take: limit,
        orderBy: { dueDate: 'asc' },
      }),
    ]);

    return { total, data };
  }

  public async createVaccination(data: Prisma.VaccinationUncheckedCreateInput): Promise<Vaccination> {
    return prisma.vaccination.create({ data });
  }

  public async updateVaccination(id: string, data: Prisma.VaccinationUncheckedUpdateInput): Promise<Vaccination> {
    return prisma.vaccination.update({ where: { id }, data });
  }

  // --- Diseases ---
  public async getDiseases(): Promise<Disease[]> {
    return prisma.disease.findMany({ orderBy: { name: 'asc' } });
  }

  public async createDisease(data: Prisma.DiseaseCreateInput): Promise<Disease> {
    return prisma.disease.create({ data });
  }

  // --- Treatments ---
  public async addTreatment(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment> {
    return prisma.treatment.create({ data });
  }
}

export default new VetRepository();
