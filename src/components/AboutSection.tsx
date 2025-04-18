
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Cpu } from 'lucide-react';

const AboutSection = () => {
  return (
    <Card className="glass-card w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Cpu className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">About RateYourPC</h2>
        </div>
        
        <p className="text-center text-muted-foreground mb-4">
          RateYourPC is a simple tool that evaluates your computer's performance based on your hardware components.
          Simply enter your CPU, GPU, and RAM details to get a performance rating out of 10.
        </p>
        
        <div className="flex items-center justify-center mt-6">
          <p className="flex items-center gap-2 text-sm text-muted-foreground italic">
            Made with passion and <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse-slow" /> for PC by TechieRTk
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
