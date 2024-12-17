export interface ContractData {
  createTime: [number, number, number];
  renter: string;
  identificationId: string;
  phone: string;
  product: {
    address: string;
    name: string;
  };
  equipmentProvidedByTheLessor: string;
  rentTimeFrom: [number, number, number];
  rentTimeTo: [number, number, number];
  numberOfRenter: number;
  rentFee: number;
  dayOfPayRentFee: number;
  electricityFee: number;
  waterFee: number;
  tenancyDeposit: number;
  signature: {
    imageUrl: string;
  };
    identificationCard: {
        id: string;
        imageUrl: string;
  }[];
}

export interface FormData {
  userId: string;
  identificationCardIds: string;
  phone: string;
  identificationId: string;
  lessor: string;
  renter: string;
  rentTimeFrom: string;
  rentTimeTo: string;
  productId: string;
  productType: string;
  equipmentProvidedByTheLessor: string;
  numberOfRenter: string;
  rentFee: string;
  dayOfPayRentFee: string;
  electricityFee: string;
  waterFee: string;
  tenancyDeposit: string;
  regulations: string;
  agree: boolean;
  signatureId: string;
}