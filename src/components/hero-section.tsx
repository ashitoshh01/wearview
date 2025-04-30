
import { Button } from "@/components/ui/button";
import FloatingObjects from "./floating-objects";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden py-20 md:py-32">
      {/* Dark background with gradient */}
      <div className="absolute inset-0 bg-[#1a0933] -z-20" />
      
      {/* Floating objects */}
      <FloatingObjects />
      
      <div className="container min-h-[80vh] flex flex-col items-center justify-center text-center z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Try Before You Buy,
            <br />
            <span className="text-purple-400">Virtually</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience clothes in a whole new dimension with our revolutionary
            virtual try-on technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8" asChild>
              <a href="#shop">Try It Now</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
