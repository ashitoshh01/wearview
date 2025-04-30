
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import VirtualTryonModal from "./virtual-tryon-modal";
import { ShoppingCart, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
          <p className="text-sm text-muted-foreground mt-1 capitalize">
            Category: {product.category}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button 
            onClick={handleAddToCart} 
            className="flex-1"
            variant="default"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button 
            onClick={() => setIsTryOnModalOpen(true)}
            variant="outline" 
            className="flex-1"
          >
            <Camera className="mr-2 h-4 w-4" /> Try On
          </Button>
        </CardFooter>
      </Card>
      
      <VirtualTryonModal
        product={product}
        isOpen={isTryOnModalOpen}
        onClose={() => setIsTryOnModalOpen(false)}
      />
    </>
  );
}
