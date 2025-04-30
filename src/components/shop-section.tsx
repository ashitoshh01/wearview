
import { useState } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "./product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = 'all' | 'shirts' | 'pants' | 'accessories' | 'glasses' | 'hoodies' | 'jackets';

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  
  const categories: { value: Category, label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'pants', label: 'Pants' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'glasses', label: 'Glasses' },
    { value: 'hoodies', label: 'Hoodies' },
    { value: 'jackets', label: 'Jackets' },
  ];
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="shop" className="py-16 bg-secondary/30">
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
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
