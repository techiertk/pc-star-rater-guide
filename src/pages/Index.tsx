
import React, { useState } from 'react';
import Header from '@/components/Header';
import PCForm from '@/components/PCForm';
import RatingResult from '@/components/RatingResult';
import AboutSection from '@/components/AboutSection';
import { calculatePCRating, PCConfig, PCRating } from '@/utils/ratingLogic';

const Index = () => {
  const [rating, setRating] = useState<PCRating | null>(null);
  
  const handleSubmit = (config: PCConfig) => {
    const result = calculatePCRating(config);
    setRating(result);
    
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  const handleRateAgain = () => {
    setRating(null);
    
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container px-4 py-8 space-y-8 flex-1">
        <Header />
        
        {rating ? (
          <div className="py-4">
            <RatingResult rating={rating} onRateAgain={handleRateAgain} />
          </div>
        ) : (
          <div className="py-4">
            <PCForm onSubmit={handleSubmit} />
          </div>
        )}
        
        <div className="py-4 mt-8">
          <AboutSection />
        </div>
      </div>
      
      <footer className="py-6 bg-tech-dark border-t border-white/10">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RateYourPC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
