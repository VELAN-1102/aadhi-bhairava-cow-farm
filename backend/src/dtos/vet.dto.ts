export interface OpenMedicalRecordDto {
  cowId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  doctorName: string;
  prescription?: string;
  cost?: number;
  notes?: string;
}

export interface CloseMedicalRecordDto {
  additionalCost?: number;
}

export interface ScheduleVaccinationDto {
  cowId: string;
  vaccineName: string;
  dueDate: string;
}

export interface AdministerVaccineDto {
  notes?: string;
}

export interface AddDiseaseDto {
  name: string;
  description?: string;
  symptoms?: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH';
}
