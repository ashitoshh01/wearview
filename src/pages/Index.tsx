
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ShopSection from "@/components/shop-section";
import FeaturesSection from "@/components/features-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

const Index = () => {
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
    </ThemeProvider>
  );
};

export default Index;
