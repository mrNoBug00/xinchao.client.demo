
export interface Product {
    id: number;
    name: string;
    type: string;
    description: string;
    price: number;
    address: string;
    author: string | null;
    image: {
      id: number;
      imageUrl: string;
      imagePath: string;
    }[];
  }
  