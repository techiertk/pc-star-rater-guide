
import React from 'react';
import { Cpu, Star } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6">
      <div className="container flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center gap-2">
          <Cpu className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold tech-gradient-text">
            RateYourPC
          </h1>
          <Star className="h-6 w-6 text-primary" />
        </div>
        <p className="text-muted-foreground text-center max-w-md">
          Enter your PC components below to get a performance rating out of 10
        </p>
      </div>
    </header>
  );
};

export default Header;
