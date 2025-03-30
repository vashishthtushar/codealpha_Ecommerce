declare module '../api' {
  interface ProductImage {
    url: string;
    alt?: string;
  }

  interface Product {
    _id: string;
    name: string;
    price: number;
    discountedPrice?: number;
    description: string;
    images: ProductImage[];
    category: string;
    ratings: number;
    inStock: boolean;
    reviews?: number;
  }

  interface Category {
    id: string;
    name: string;
  }

  export function getSampleProducts(): Promise<Product[]>;
  export function getProductById(id: string): Promise<Product>;
  export function getCategories(): Promise<Category[]>;
} 