
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TopicsSection from "@/components/TopicsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    scrollTriggers.forEach((trigger) => observer.observe(trigger));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="space-bg"></div>
      <div className="lines-bg"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <HeroSection currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <TopicsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
