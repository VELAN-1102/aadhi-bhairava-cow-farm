import { MedicalRecord, Vaccination, Disease, Treatment, Prisma } from '@prisma/client';

export interface IVetRepository {
  getMedicalRecords(params: {
    page: number;
    limit: number;
    cowId?: string;
    status?: string;
  }): Promise<{ total: number; data: any[] }>;
  getMedicalRecordById(id: string): Promise<any>;
  createMedicalRecord(data: Prisma.MedicalRecordUncheckedCreateInput): Promise<MedicalRecord>;
  updateMedicalRecord(id: string, data: Prisma.MedicalRecordUncheckedUpdateInput): Promise<MedicalRecord>;
  
  getVaccinations(params: {
    page: number;
    limit: number;
    cowId?: string;
    status?: string;
    dueDateRangeStart?: Date;
    dueDateRangeEnd?: Date;
  }): Promise<{ total: number; data: any[] }>;
  createVaccination(data: Prisma.VaccinationUncheckedCreateInput): Promise<Vaccination>;
  updateVaccination(id: string, data: Prisma.VaccinationUncheckedUpdateInput): Promise<Vaccination>;
  
  getDiseases(): Promise<Disease[]>;
  createDisease(data: Prisma.DiseaseCreateInput): Promise<Disease>;
  
  addTreatment(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment>;
}
