export interface ProductDetails {
  total: number;
  skip: number;
  limit: number;
  products: ProductProps[];
}

export interface ProductCardProps {
  products: ProductProps;
}

export interface ProductProps {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}

export interface ProductStateTypes {
  categoryList: string[];
  products: ProductDetails;
  skip: number;
  loading: boolean;
  params: object;
  category: string;
  sortBy: string | undefined;
  sortByOrder: string | undefined;
  cartItems: ProductProps[];
}

export type ProductStateAction = {
  type: string;
  [key: string]: any;
};
