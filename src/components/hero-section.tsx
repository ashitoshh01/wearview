
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  // Reference for floating elements canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation for floating elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    // Create particles with different shapes
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 50 + 20,
        color: `rgba(196, 181, 253, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        
        // Randomly choose between circle and rounded rectangle
        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          roundedRect(ctx, particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size, 10);
          ctx.fill();
        }
        
        ctx.restore();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    };
    
    // Helper function for rounded rectangles
    function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.arcTo(x + width, y, x + width, y + height, radius);
      context.arcTo(x + width, y + height, x, y + height, radius);
      context.arcTo(x, y + height, x, y, radius);
      context.arcTo(x, y, x + width, y, radius);
      context.closePath();
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="home" className="relative overflow-hidden h-screen flex items-center">
      {/* Light mode background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 -z-20" />
      
      {/* Floating elements canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10"></canvas>
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-neutral-900">
            Try Before You Buy,
            <br />
            <span className="text-purple-600">Virtually</span>
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Experience clothes in a whole new dimension with our revolutionary
            virtual try-on technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 rounded-full py-6" asChild>
              <a href="#shop">Try It Now</a>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100 text-lg px-8 rounded-full py-6" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - positioned at bottom but visible without scrolling */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-10 h-14 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
        </div>
        <ArrowDown className="mt-2 text-gray-400 animate-bounce" />
      </div>
    </section>
  );
}
