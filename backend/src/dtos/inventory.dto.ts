export interface AddFeedItemDto {
  name: string;
  quantity: number;
  minQuantityAlert: number;
  unitPrice: number;
  supplierId?: string;
  expiryDate?: string;
}

export interface ConsumeFeedDto {
  quantity: number;
}

export interface AddMedicineItemDto {
  name: string;
  batchNumber: string;
  quantity: number;
  minQuantityAlert: number;
  unitPrice: number;
  supplierId?: string;
  expiryDate?: string;
}

export interface ConsumeMedicineDto {
  quantity: number;
}

export interface RegisterEquipmentDto {
  name: string;
  serialNumber?: string;
  cost: number;
  purchaseDate: string;
}

export interface UpdateEquipmentStatusDto {
  status: 'OPERATIONAL' | 'UNDER_MAINTENANCE' | 'BROKEN';
}

export interface RegisterSupplierDto {
  name: string;
  contactPerson?: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface PlacePurchaseOrderDto {
  supplierId: string;
  totalAmount: number;
  items: Array<{
    itemName: string;
    quantity: number;
    unitPrice: number;
  }>;
}
