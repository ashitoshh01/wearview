
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

export default function CartSection() {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalPrice } = useCartStore();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    clearCart();
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        {items.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCart}
            className="text-muted-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-auto py-6">
        {items.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center">
            <ShoppingBagIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
            <Button asChild>
              <a href="#shop">Continue Shopping</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.product.id} 
                className="flex items-start gap-4 pb-4"
              >
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.imageSrc} 
                    alt={item.product.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{item.product.category}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => decreaseQuantity(item.product.id)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => increaseQuantity(item.product.id)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive" 
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {items.length > 0 && (
        <>
          <Separator />
          
          <div className="pt-4 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="font-medium">Total</span>
              <span className="font-bold">{formatPrice(getTotalPrice())}</span>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// Shopping bag icon component
function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
