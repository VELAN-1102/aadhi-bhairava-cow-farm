import { Cow, CowBreed, Pregnancy, CalvingHistory, Prisma } from '@prisma/client';

export interface ICowRepository {
  getBreeds(): Promise<CowBreed[]>;
  findBreedByName(name: string): Promise<CowBreed | null>;
  createBreed(name: string, description?: string): Promise<CowBreed>;
  
  findCowById(id: string): Promise<any>;
  findCowByTag(tagNumber: string): Promise<Cow | null>;
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
  createCow(data: Prisma.CowCreateInput): Promise<Cow>;
  updateCow(id: string, data: Prisma.CowUpdateInput): Promise<Cow>;
  deleteCow(id: string): Promise<Cow>;
  
  addCowImage(cowId: string, imageUrl: string, isCover?: boolean): Promise<any>;
  
  getPregnancies(cowId?: string): Promise<any[]>;
  createPregnancy(data: Prisma.PregnancyUncheckedCreateInput): Promise<Pregnancy>;
  updatePregnancyStatus(id: string, status: string, notes?: string): Promise<Pregnancy>;
  
  getCalvingHistory(cowId?: string): Promise<any[]>;
  createCalvingRecord(data: Prisma.CalvingHistoryUncheckedCreateInput, motherStatus: string): Promise<CalvingHistory>;
}
