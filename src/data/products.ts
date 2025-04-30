
export interface Product {
  id: string;
  name: string;
  category: 'shirts' | 'pants' | 'accessories' | 'glasses' | 'hoodies' | 'jackets';
  price: number;
  imageSrc: string;
  virtualTryOnImage?: string; // Image to be displayed in virtual try-on
}

export const products: Product[] = [
  {
    id: "shirt-1",
    name: "Premium Cotton T-Shirt",
    category: "shirts",
    price: 1299,
    imageSrc: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "shirt-2",
    name: "Casual Button-Down Shirt",
    category: "shirts",
    price: 1899,
    imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "pants-1",
    name: "Slim Fit Jeans",
    category: "pants",
    price: 2499,
    imageSrc: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "pants-2",
    name: "Formal Trousers",
    category: "pants",
    price: 2899,
    imageSrc: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "accessories-1",
    name: "Designer Watch",
    category: "accessories",
    price: 4999,
    imageSrc: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "accessories-2",
    name: "Leather Belt",
    category: "accessories",
    price: 1499,
    imageSrc: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "glasses-1",
    name: "Aviator Sunglasses",
    category: "glasses",
    price: 1999,
    imageSrc: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "glasses-2",
    name: "Reading Glasses",
    category: "glasses",
    price: 1299,
    imageSrc: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "hoodies-1",
    name: "Pullover Hoodie",
    category: "hoodies",
    price: 2499,
    imageSrc: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "hoodies-2",
    name: "Zip-Up Hoodie",
    category: "hoodies",
    price: 2699,
    imageSrc: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "jackets-1",
    name: "Denim Jacket",
    category: "jackets",
    price: 3499,
    imageSrc: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "jackets-2",
    name: "Leather Jacket",
    category: "jackets",
    price: 4999,
    imageSrc: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=500"
  }
];
