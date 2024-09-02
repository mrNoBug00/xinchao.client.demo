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
  type: string;
  description: string;
  status: Status;
  price: number;
  electricityFee: string;
  waterFee: string;
  gasFee: string;
  address: string;
  imageUrl: Image[];
  author: string | null;
}
  
export interface EditContractProps {
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
  address: string;
  status: string;
  images: { file: File | null; imageUrl: string }[];
}




