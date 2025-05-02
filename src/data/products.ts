
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
    virtualTryOnImage: "/lovable-uploads/bac85def-42ce-4989-8f60-9d1aac95bd14.png"
  },
  {
    id: "pants-1",
    name: "Blue Denim Jeans",
    category: "pants",
    price: 2299,
    imageSrc: "/lovable-uploads/ec83e07b-0739-420d-b66b-eb12c06803a8.png",
    virtualTryOnImage: "/lovable-uploads/ec83e07b-0739-420d-b66b-eb12c06803a8.png"
  },
  {
    id: "jacket-1",
    name: "Leather Jacket",
    category: "jackets",
    price: 4999,
    imageSrc: "/lovable-uploads/b2b96b2d-ec58-48a4-92cb-6f55f7518018.png",
    virtualTryOnImage: "/lovable-uploads/b2b96b2d-ec58-48a4-92cb-6f55f7518018.png"
  },
  {
    id: "sets-1",
    name: "Palm Pattern Set",
    category: "sets",
    price: 3499,
    imageSrc: "/lovable-uploads/76a597d2-fe97-4ac9-8c7e-07f2a08adbbd.png",
    virtualTryOnImage: "/lovable-uploads/76a597d2-fe97-4ac9-8c7e-07f2a08adbbd.png"
  },
  {
    id: "shirt-1",
    name: "Basic White T-Shirt",
    category: "shirts",
    price: 1199,
    imageSrc: "/lovable-uploads/197ce515-f0d4-4ca5-b090-2f1a1ef3218b.png",
    virtualTryOnImage: "/lovable-uploads/197ce515-f0d4-4ca5-b090-2f1a1ef3218b.png"
  },
  {
    id: "accessories-1",
    name: "Designer Sunglasses",
    category: "accessories",
    price: 2999,
    imageSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    virtualTryOnImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
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
    virtualTryOnImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=500"
  }
];
