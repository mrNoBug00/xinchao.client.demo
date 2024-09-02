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
