export interface ProductProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
  tags?: string[];
}

export interface ProductListResponse {
  products: { id: number; title: string; price: number; thumbnail: string }[];
  total: number;
  skip: number;
}
