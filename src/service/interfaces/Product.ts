// interfaces/Product.ts

export interface Image {
  id: number;
  imageUrl: string;
  imagePath: string;
}

export interface Status {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: Type;
  description: string;
  status?: Status;
  companyInfo?: CompanyInfo;
  price: number;
  electricityFee?: string;
  waterFee?: string;
  gasFee?: string;
  numberOfTenantsByRoomRate?: string;
  address: string;
  image: Image[];
  author: string | null;
}

export interface Type {
  id: number;
  name: string;
}

export interface EditContractProps {
  params: {
    id: string;
  };
}

export interface EditContractProps {
  params: {
    id: string;
  };
}

export interface ProductDetailProps {
  params: {
    id: string;
  };
}

export interface FormImage {
  file: File | null;
  imageUrl: string;
}

export interface FormData {
  name: string;
  type: string;
  description: string;
  price: number;
  electricityFee: string;
  waterFee: string;
  gasFee: string;
  numberOfTenantsByRoomRate: string;
  address: string;
  status: string;
  images: { file: File | null; imageUrl: string }[];
}

export interface CompanyInfo {
  id: string;
  name: string;
  taxNumber: string;
  address: string;
  line: string;
}
