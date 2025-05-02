
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ShopSection from "@/components/shop-section";
import FeaturesSection from "@/components/features-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import CartSection from "@/components/cart-section";
import Footer from "@/components/footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Add slide animation observer functionality
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Target all sections except hero (which is already visible)
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <ShopSection />
          <FeaturesSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes moveUpDown {
          0%, 100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -15px);
          }
        }
      `}} />
    </ThemeProvider>
  );
};

export default Index;
