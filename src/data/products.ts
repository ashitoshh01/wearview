
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
    imageSrc: "/lovable-uploads/340a34f0-e9ff-4e04-b814-c770e270e5d2.png",
    virtualTryOnImage: "/lovable-uploads/340a34f0-e9ff-4e04-b814-c770e270e5d2.png"
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
    id: "jacket-2",
    name: "Winter Jacket",
    category: "jackets",
    price: 3999,
    imageSrc: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=500",
    virtualTryOnImage: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=500"
  }
];
