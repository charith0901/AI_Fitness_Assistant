export type AdviceType = {
  prediction_plan: string;
  advice: {
    WeeklyWorkoutSchedule: {
      Overview: string;
      Schedule: string[];
    };
    Progression: string[];
  };
  DietRecommendation: {
    Focus: {
      FruitsAndVeggies: string;
      Protein: string;
      WholeGrains: string;
      HealthyFats: string;
      Hydration: string;
    };
    MealTiming: string;
    SampleMealPlan: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
      Snacks: string[];
    };
    Avoid: string[];
    CaloriesDeficit: string;
    Notes: string[];
  };
  FitnessTips: string[];
  MotivationMessage: string;
};
