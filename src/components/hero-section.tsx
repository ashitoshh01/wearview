
import { Button } from "@/components/ui/button";
import Floating3DObject from "./3d-object";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient-dark -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbC1vcGFjaXR5PSIuMDUiIGZpbGw9IiNGRkYiIGN4PSI1MCIgY3k9IjUwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20 -z-10" />
      
      <div className="container min-h-[90vh] flex flex-col md:flex-row items-center justify-between py-20">
        <div className="flex-1 space-y-8 text-center md:text-left pb-8 md:pb-0">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Virtual Try-On
            <br />
            <span className="heading-gradient">Next Generation</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            Experience the future of online shopping with our advanced 
            virtual try-on technology. See how products look on you before you buy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <a href="#shop">Try Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 rounded-full blur-3xl animate-pulse-slow"></div>
            <Floating3DObject className="animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
