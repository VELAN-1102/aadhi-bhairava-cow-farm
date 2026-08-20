import { Cow, CowBreed, Pregnancy, CalvingHistory } from '@prisma/client';

export interface ICowService {
  getBreeds(): Promise<CowBreed[]>;
  createBreed(name: string, description?: string): Promise<CowBreed>;
  
  getCows(params: {
    page: number;
    limit: number;
    search?: string;
    breedId?: string;
    status?: string;
    gender?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ total: number; data: any[] }>;
  
  getCowById(id: string): Promise<any>;
  registerCow(data: {
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
  }): Promise<Cow>;
  
  updateCow(id: string, data: any): Promise<Cow>;
  deleteCow(id: string): Promise<Cow>;
  
  uploadCowPhoto(cowId: string, fileBuffer: Buffer, fileName: string, mimeType: string, isCover?: boolean): Promise<any>;
  
  registerPregnancy(data: {
    cowId: string;
    breedingDate: Date;
    breedingMethod?: string;
    bullTag?: string;
    notes?: string;
  }): Promise<Pregnancy>;
  
  registerCalving(data: {
    cowId: string;
    pregnancyId: string;
    calvingDate: Date;
    calfGender: string;
    calfTagNumber?: string;
    calfName?: string;
    notes?: string;
  }): Promise<CalvingHistory>;
}
