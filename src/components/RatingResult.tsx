
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PCRating } from '@/utils/ratingLogic';
import { Cpu, MonitorPlay, Layers, Star, ArrowUpRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface RatingResultProps {
  rating: PCRating;
  onRateAgain: () => void;
}

const RatingResult: React.FC<RatingResultProps> = ({ rating, onRateAgain }) => {
  return (
    <Card className="glass-card w-full max-w-2xl mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">Your PC Rating</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-5xl font-bold tech-gradient-text mb-2">
            {rating.overallScore.toFixed(1)}/10
          </div>
          <div className="star-rating text-yellow-400 my-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Star
                key={i}
                className={`h-7 w-7 ${i < Math.floor(rating.overallStars) ? 'fill-yellow-400' : (
                  i === Math.floor(rating.overallStars) && rating.overallStars % 1 > 0 
                    ? 'fill-yellow-400 opacity-50' 
                    : 'stroke-yellow-400 fill-transparent'
                )}`}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-center mt-2 max-w-md">
            {rating.description}
          </p>
        </div>
        
        {/* Component Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Component Breakdown</h3>
          
          {/* CPU Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <span className="font-medium">CPU</span>
              </div>
              <span className="text-lg font-semibold">{rating.components[0].score.toFixed(1)}/10</span>
            </div>
            <Progress value={rating.components[0].score * 10} className="h-2" />
            <p className="text-sm text-muted-foreground">{rating.components[0].description}</p>
          </div>
          
          {/* GPU Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MonitorPlay className="h-5 w-5 text-primary" />
                <span className="font-medium">GPU</span>
              </div>
              <span className="text-lg font-semibold">{rating.components[1].score.toFixed(1)}/10</span>
            </div>
            <Progress value={rating.components[1].score * 10} className="h-2" />
            <p className="text-sm text-muted-foreground">{rating.components[1].description}</p>
          </div>
          
          {/* RAM Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <span className="font-medium">RAM</span>
              </div>
              <span className="text-lg font-semibold">{rating.components[2].score.toFixed(1)}/10</span>
            </div>
            <Progress value={rating.components[2].score * 10} className="h-2" />
            <p className="text-sm text-muted-foreground">{rating.components[2].description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <button 
          onClick={onRateAgain}
          className="w-full flex items-center justify-center gap-2 py-3 text-primary font-medium hover:underline transition-all"
        >
          <ArrowUpRight className="h-4 w-4" />
          Rate Another PC
        </button>
      </CardFooter>
    </Card>
  );
};

export default RatingResult;
