
import { getComponentScore } from "@/lib/pcComponents";

export interface PCConfig {
  cpu: string;
  gpu: string;
  ramType: string;
  ramSize: string;
}

interface ComponentRating {
  name: string;
  score: number;
  weight: number;
  description: string;
}

export interface PCRating {
  overallScore: number;
  overallStars: number;
  components: ComponentRating[];
  description: string;
}

// Calculate PC rating based on component selection
export const calculatePCRating = (config: PCConfig): PCRating => {
  // Component weights for overall score calculation
  const weights = {
    cpu: 0.4,
    gpu: 0.4,
    ram: 0.2
  };
  
  // Get individual component scores
  const cpuScore = getComponentScore("cpu", config.cpu);
  const gpuScore = getComponentScore("gpu", config.gpu);
  const ramScore = getComponentScore("ram", config.ramType, config.ramSize);
  
  // Calculate overall weighted score (0-10 scale)
  const overallScore = 
    cpuScore * weights.cpu +
    gpuScore * weights.gpu +
    ramScore * weights.ram;
  
  // Round to 1 decimal place
  const roundedScore = Math.round(overallScore * 10) / 10;
  
  // Convert to star rating (0-10 scale)
  const overallStars = roundedScore;
  
  // Create component breakdown
  const components: ComponentRating[] = [
    {
      name: "CPU",
      score: cpuScore,
      weight: weights.cpu,
      description: getComponentDescription("cpu", cpuScore)
    },
    {
      name: "GPU",
      score: gpuScore,
      weight: weights.gpu,
      description: getComponentDescription("gpu", gpuScore)
    },
    {
      name: "RAM",
      score: ramScore,
      weight: weights.ram,
      description: getComponentDescription("ram", ramScore)
    }
  ];
  
  // Generate overall description
  const description = getOverallDescription(roundedScore);
  
  return {
    overallScore: roundedScore,
    overallStars,
    components,
    description
  };
};

// Helper function to get component description based on score
const getComponentDescription = (
  componentType: "cpu" | "gpu" | "ram",
  score: number
): string => {
  if (score >= 9) {
    return `Top-tier ${componentType.toUpperCase()} performance for any task`;
  } else if (score >= 7) {
    return `High-end ${componentType.toUpperCase()} suitable for demanding applications`;
  } else if (score >= 5) {
    return `Mid-range ${componentType.toUpperCase()} good for everyday use`;
  } else if (score >= 3) {
    return `Entry-level ${componentType.toUpperCase()} with limited performance`;
  } else {
    return `Basic ${componentType.toUpperCase()} that may struggle with modern applications`;
  }
};

// Helper function to get overall PC description based on score
const getOverallDescription = (score: number): string => {
  if (score >= 9) {
    return "Enthusiast-level system capable of handling any task, including demanding games at 4K, professional content creation, and intensive workloads.";
  } else if (score >= 7) {
    return "High-performance system great for gaming at 1440p, content creation, and multitasking with demanding applications.";
  } else if (score >= 5) {
    return "Mid-range system suitable for 1080p gaming, light content creation, and general productivity tasks.";
  } else if (score >= 3) {
    return "Entry-level system for basic tasks, office work, web browsing, and older or less demanding games.";
  } else {
    return "Basic system that will handle simple tasks but may struggle with modern applications and games.";
  }
};
