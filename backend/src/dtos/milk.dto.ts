export interface LogMilkCollectionDto {
  cowId?: string;
  quantity: number;
  shift: 'MORNING' | 'EVENING';
  date: string;
  fatPercentage: number;
  snfPercentage: number;
  temperature?: number;
  collectedBy?: string;
  notes?: string;
}

export interface LogMilkSaleDto {
  customerId: string;
  date: string;
  quantity: number;
  ratePerLiter: number;
  notes?: string;
}
