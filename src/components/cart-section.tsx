
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";

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
      <div className="flex-1 py-6">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
            <SheetClose asChild>
              <Button asChild>
                <a href="#shop">Continue Shopping</a>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img 
                        src={item.product.imageSrc} 
                        alt={item.product.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{item.product.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => decreaseQuantity(item.product.id)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => increaseQuantity(item.product.id)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1 sm:flex-none text-right sm:text-left">
                      <p className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {items.length > 0 && (
        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-bold">{formatPrice(getTotalPrice())}</span>
          </div>
          
          <SheetFooter>
            <div className="flex w-full gap-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="flex-1"
              >
                Clear Cart
              </Button>
              <SheetClose asChild>
                <Button 
                  onClick={handleCheckout}
                  className="flex-1"
                >
                  Checkout
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </div>
      )}
    </div>
  );
}
