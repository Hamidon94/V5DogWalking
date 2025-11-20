import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import SearchForm from "@/components/search/SearchForm";
import DogWalkingProtectSection from "@/components/home/DogWalkingProtectSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SearchForm className="shadow-2xl" />
        </div>
        <DogWalkingProtectSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
