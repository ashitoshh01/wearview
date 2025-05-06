
export interface Product {
  id: string;
  name: string;
  category: 'shirts' | 'pants' | 'accessories' | 'hoodies' | 'jackets' | 'sets';
  price: number;
  imageSrc: string;
  virtualTryOnImage?: string;
}

export const products: Product[] = [
  {
    id: "hoodie-1",
    name: "Blessed Hoodie",
    category: "hoodies",
    price: 2499,
    imageSrc: "/lovable-uploads/bac85def-42ce-4989-8f60-9d1aac95bd14.png",
    virtualTryOnImage: "/lovable-uploads/878a3275-b0de-4241-9953-15ce283ae6d6.png" // 4th uploaded image
  },
  {
    id: "pants-1",
    name: "Blue Denim Jeans",
    category: "pants",
    price: 2299,
    imageSrc: "/lovable-uploads/ec83e07b-0739-420d-b66b-eb12c06803a8.png",
    virtualTryOnImage: "/lovable-uploads/122d4a95-a185-4907-be63-ccf8f00a7219.png" // 5th uploaded image
  },
  {
    id: "jacket-1",
    name: "Leather Jacket",
    category: "jackets",
    price: 4999,
    imageSrc: "/lovable-uploads/b2b96b2d-ec58-48a4-92cb-6f55f7518018.png",
    virtualTryOnImage: "/lovable-uploads/c996a3bf-e073-46ce-9eaf-94f66601703d.png"
  },
  {
    id: "sets-1",
    name: "White T-Shirt",
    category: "shirts",
    price: 3499,
    imageSrc: "/lovable-uploads/76a597d2-fe97-4ac9-8c7e-07f2a08adbbd.png",
    virtualTryOnImage: "/lovable-uploads/bea02bb0-0a84-4d21-82ca-80b1069a4daa.png" // 2nd uploaded image
  },
  {
    id: "shirt-1",
    name: "Summer Wear",
    category: "sets",
    price: 1199,
    imageSrc: "/lovable-uploads/197ce515-f0d4-4ca5-b090-2f1a1ef3218b.png",
    virtualTryOnImage: "/lovable-uploads/212be7b4-9344-4526-b7c9-9a06caa4ea7b.png" // 1st uploaded image
  },
  {
    id: "accessories-1",
    name: "Sunglasses",
    category: "accessories",
    price: 2999,
    imageSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    virtualTryOnImage: "/lovable-uploads/821267e1-a504-4672-8b72-16d0ad2a729f.png"
  },
  {
    id: "jacket-2",
    name: "Winter Jacket",
    category: "jackets",
    price: 3999,
    imageSrc: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "shirt-2",
    name: "Casual Shirt",
    category: "shirts",
    price: 1899,
    imageSrc: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "/lovable-uploads/8b0223b8-d6de-45ef-8ee4-22a41ed178d6.png" // 3rd uploaded image
  }
];
