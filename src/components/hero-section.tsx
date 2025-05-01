
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="home" className="relative overflow-hidden h-screen flex items-center">
      {/* Background based on theme */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-purple-950' : 'bg-gradient-to-br from-white to-purple-50'} -z-20 transition-colors duration-300`} />
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'} transition-colors duration-300`}>
            Try Before You Buy,
            <br />
            <span className="text-purple-600">Virtually</span>
          </h1>
          
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto transition-colors duration-300`}>
            Experience clothes in a whole new dimension with our revolutionary
            virtual try-on technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 rounded-full py-6" asChild>
              <a href="#shop">Try It Now</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className={`${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-400 text-gray-700 hover:bg-gray-100'} text-lg px-8 rounded-full py-6 transition-colors duration-300`} 
              asChild
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - positioned with transform to be visible without scrolling */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className={`w-10 h-14 border-2 ${theme === 'dark' ? 'border-gray-400' : 'border-gray-400'} rounded-full flex justify-center transition-colors duration-300`}>
          <div className={`w-1.5 h-3 ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-400'} rounded-full mt-2 animate-bounce transition-colors duration-300`} />
        </div>
        <ArrowDown className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} animate-bounce transition-colors duration-300`} />
      </div>
    </section>
  );
}
