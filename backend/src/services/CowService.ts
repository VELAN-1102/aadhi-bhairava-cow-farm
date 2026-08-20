import cowRepository from '../repositories/CowRepository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import s3Service from './S3Service';
import { ICowService } from '../interfaces/services/ICowService';

export class CowService implements ICowService {
  public async getBreeds() {
    return cowRepository.getBreeds();
  }

  public async createBreed(name: string, description?: string) {
    const existing = await cowRepository.findBreedByName(name);
    if (existing) {
      throw new BadRequestError(`Breed name "${name}" is already registered`);
    }
    return cowRepository.createBreed(name, description);
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
    return cowRepository.getCows(params);
  }

  public async getCowById(id: string) {
    const cow = await cowRepository.findCowById(id);
    if (!cow) {
      throw new NotFoundError(`Cattle record with ID ${id} not found`);
    }
    return cow;
  }

  public async registerCow(data: {
    tagNumber: string;
    name: string;
    breedId: string;
    gender?: string;
    dateOfBirth: Date;
    weight: number;
    color: string;
    status?: string;
    purchaseDate?: Date;
    purchasePrice?: number;
    insuranceNumber?: string;
    fatherTag?: string;
    motherTag?: string;
    breedDetail?: string;
  }) {
    const existing = await cowRepository.findCowByTag(data.tagNumber);
    if (existing) {
      throw new BadRequestError(`A cow with tag number ${data.tagNumber} is already registered`);
    }

    return cowRepository.createCow({
      tagNumber: data.tagNumber,
      name: data.name,
      breed: { connect: { id: data.breedId } },
      gender: data.gender || 'FEMALE',
      dateOfBirth: data.dateOfBirth,
      weight: data.weight,
      color: data.color,
      status: data.status || 'HEALTHY',
      purchaseDate: data.purchaseDate,
      purchasePrice: data.purchasePrice,
      insuranceNumber: data.insuranceNumber,
      fatherTag: data.fatherTag,
      motherTag: data.motherTag,
      breedDetail: data.breedDetail,
    });
  }

  public async updateCow(id: string, data: any) {
    await this.getCowById(id); // Throws NotFoundError if not exists
    return cowRepository.updateCow(id, data);
  }

  public async deleteCow(id: string) {
    const cow = await this.getCowById(id);

    // Delete associated images from S3/disk
    for (const image of cow.images) {
      await s3Service.deleteFile(image.imageUrl);
    }

    return cowRepository.deleteCow(id);
  }

  public async uploadCowPhoto(cowId: string, fileBuffer: Buffer, fileName: string, mimeType: string, isCover = false) {
    await this.getCowById(cowId); // Throws NotFoundError if not exists

    // Upload via S3Service
    const fileUrl = await s3Service.uploadFile(fileBuffer, fileName, mimeType);

    // Record in DB
    return cowRepository.addCowImage(cowId, fileUrl, isCover);
  }

  public async registerPregnancy(data: {
    cowId: string;
    breedingDate: Date;
    breedingMethod?: string;
    bullTag?: string;
    notes?: string;
  }) {
    const cow = await this.getCowById(data.cowId);
    if (cow.gender === 'MALE') {
      throw new BadRequestError('Cannot register pregnancy records for male cattle');
    }

    const expectedCalvingDate = new Date(data.breedingDate.getTime());
    // Average cow gestation period is ~283 days
    expectedCalvingDate.setDate(expectedCalvingDate.getDate() + 283);

    return cowRepository.createPregnancy({
      cowId: data.cowId,
      breedingDate: data.breedingDate,
      breedingMethod: data.breedingMethod || 'AI',
      bullTag: data.bullTag,
      expectedCalvingDate,
      status: 'ACTIVE',
      notes: data.notes,
    });
  }

  public async registerCalving(data: {
    cowId: string;
    pregnancyId: string;
    calvingDate: Date;
    calfGender: string;
    calfTagNumber?: string;
    calfName?: string;
    notes?: string;
  }) {
    const mother = await this.getCowById(data.cowId);

    // Check if expected mother tag matches
    const newCalfStatus = 'CALF';

    // If tag number is provided, automatically insert the calf into Cow table
    if (data.calfTagNumber) {
      const existingCalf = await cowRepository.findCowByTag(data.calfTagNumber);
      if (existingCalf) {
        throw new BadRequestError(`Cattle with tag number ${data.calfTagNumber} already exists`);
      }

      await cowRepository.createCow({
        tagNumber: data.calfTagNumber,
        name: data.calfName || `Calf of ${mother.name}`,
        breed: { connect: { id: mother.breedId } },
        gender: data.calfGender,
        dateOfBirth: data.calvingDate,
        weight: 35.0, // Avg weight at birth in kg
        color: mother.color,
        status: newCalfStatus,
        motherTag: mother.tagNumber,
      });
    }

    return cowRepository.createCalvingRecord(
      {
        cowId: data.cowId,
        pregnancyId: data.pregnancyId,
        calvingDate: data.calvingDate,
        calfGender: data.calfGender,
        calfTagNumber: data.calfTagNumber,
        status: 'ALIVE',
        notes: data.notes,
      },
      'LACTATING' // Mother becomes lactating after calving
    );
  }
}

export default new CowService();
