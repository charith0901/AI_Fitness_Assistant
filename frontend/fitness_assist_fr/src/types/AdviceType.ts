export type AdviceType = {
  predicted_plan: string;
  advice: {
    WeeklyWorkoutSchedule: {
      Overview: string;
      Schedule: {
        [day: string]: string[];
      };
      Progression: {
        [weeks: string]: string;
      };
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
      CalorieDeficit: string;
      Notes: string[];
    };
    FitnessTips: string[];
    MotivationMessage: string;
  };
};
