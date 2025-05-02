
import { useState, useEffect, useRef } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "./product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = 'all' | 'shirts' | 'pants' | 'accessories' | 'hoodies' | 'jackets' | 'sets';

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const categories: { value: Category, label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'pants', label: 'Pants' },
    { value: 'hoodies', label: 'Hoodies' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'sets', label: 'Sets' }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Filter products by category and limit to 8 items
  const filteredProducts = activeCategory === 'all' 
    ? products.slice(0, 8) 
    : products.filter(product => product.category === activeCategory).slice(0, 8);

  return (
    <section 
      id="shop" 
      ref={sectionRef}
      className={`py-16 bg-secondary/30 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-2">Shop</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Browse our collection and use our virtual try-on technology to see how items look on you
        </p>
        
        <Tabs 
          defaultValue="all" 
          value={activeCategory} 
          onValueChange={(value) => setActiveCategory(value as Category)}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="overflow-x-auto flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
