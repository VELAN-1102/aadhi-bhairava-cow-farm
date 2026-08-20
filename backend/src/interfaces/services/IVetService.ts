import { MedicalRecord, Vaccination, Disease } from '@prisma/client';

export interface IVetService {
  getMedicalRecords(params: { page: number; limit: number; cowId?: string; status?: string }): Promise<{ total: number; data: any[] }>;
  getMedicalRecordById(id: string): Promise<any>;
  
  openMedicalRecord(data: {
    cowId: string;
    date: Date;
    diagnosis: string;
    treatment: string;
    doctorName: string;
    prescription?: string;
    cost?: number;
    notes?: string;
  }): Promise<MedicalRecord>;
  
  closeMedicalRecord(id: string, additionalCost?: number, loggedByUserId?: string): Promise<MedicalRecord>;
  
  getVaccinations(params: {
    page: number;
    limit: number;
    cowId?: string;
    status?: string;
    dueDateRangeStart?: Date;
    dueDateRangeEnd?: Date;
  }): Promise<{ total: number; data: any[] }>;
  
  scheduleVaccination(data: { cowId: string; vaccineName: string; dueDate: Date }): Promise<Vaccination>;
  administerVaccine(id: string, administeredBy: string, notes?: string): Promise<Vaccination>;
  
  getDiseases(): Promise<Disease[]>;
  addDisease(name: string, description?: string, symptoms?: string, severity?: 'LOW' | 'MEDIUM' | 'HIGH'): Promise<Disease>;
}
