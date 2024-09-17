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
  id: number;
  returnPolicy: string;
  warrantyInformation: string;
  shippingInformation: string;
  reviews: Array<{
    rating: number;
    comment: string;
    reviewerName: string;
  }>;
}

export interface ProductStateTypes {
  categoryList: string[];
  products: ProductDetails;
  skip: number;
  loading: boolean;
  params: object;
  category: string;
  sortBy: string | null;
  sortByOrder: string | null;
  cartItems: ProductProps[];
}

export type ProductStateAction = {
  type: string;
  [key: string]: any;
};
