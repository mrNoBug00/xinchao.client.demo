export interface FormDataType {
  userId: string;
  identificationCardIds: string;
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
  signature: string;
  phone?: string; // Add optional properties
  identificationId?: string;
  productName?: string;
  imagePreviews?: string[];
}

export interface PrintButtonProps {
  formData: FormDataType;
}

export interface PrintableTemplateProps {
  formData: FormDataType;
}