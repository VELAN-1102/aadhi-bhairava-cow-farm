export interface CreateBreedDto {
  name: string;
  description?: string;
}

export interface RegisterCowDto {
  tagNumber: string;
  name: string;
  breedId: string;
  gender?: 'MALE' | 'FEMALE';
  dateOfBirth: string; // ISO date string
  weight: number;
  color: string;
  status?: 'HEALTHY' | 'SICK' | 'PREGNANT' | 'DRY' | 'LACTATING' | 'CALF';
  purchaseDate?: string;
  purchasePrice?: number;
  insuranceNumber?: string;
  fatherTag?: string;
  motherTag?: string;
  breedDetail?: string;
}

export interface UpdateCowDto {
  name?: string;
  breedId?: string;
  gender?: 'MALE' | 'FEMALE';
  dateOfBirth?: string;
  weight?: number;
  color?: string;
  status?: 'HEALTHY' | 'SICK' | 'PREGNANT' | 'DRY' | 'LACTATING' | 'CALF';
  purchaseDate?: string;
  purchasePrice?: number;
  insuranceNumber?: string;
  fatherTag?: string;
  motherTag?: string;
  breedDetail?: string;
}

export interface UploadCowPhotoDto {
  photoBase64: string;
  fileName: string;
  mimeType: string;
  isCover?: boolean;
}

export interface RegisterPregnancyDto {
  breedingDate: string;
  breedingMethod?: 'AI' | 'NATURAL';
  bullTag?: string;
  notes?: string;
}

export interface RegisterCalvingDto {
  pregnancyId: string;
  calvingDate: string;
  calfGender: 'MALE' | 'FEMALE';
  calfTagNumber?: string;
  calfName?: string;
  notes?: string;
}
