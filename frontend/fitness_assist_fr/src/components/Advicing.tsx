import { motion } from "framer-motion";
import type { AdviceType } from "../types/AdviceType";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Section components for better organization
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h3 
    className="text-xl font-bold text-indigo-800 mb-4 pb-2 border-b-2 border-indigo-200"
    variants={itemVariants}
  >
    {children}
  </motion.h3>
);

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300"
    variants={itemVariants}
  >
    {children}
  </motion.div>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-medium text-lg text-indigo-700 mb-2">
    {children}
  </h4>
);

export default function Advicing({ Result }: { Result: AdviceType }) {

  if (!Result) return null;

  return (
    <motion.div 
      className="max-w-4xl mx-auto my-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-bold text-center text-indigo-900 mb-8 uppercase tracking-wider"
        variants={itemVariants}
      >
        Your Personalized Fitness Plan
      </motion.h2>
      
      {/* Workout Schedule Section */}
      {Result.advice?.WeeklyWorkoutSchedule && (
        <SectionCard>
          <SectionTitle>Weekly Workout Schedule</SectionTitle>
          <motion.p className="mb-4 text-gray-700" variants={itemVariants}>
            {Result.advice.WeeklyWorkoutSchedule.Overview}
          </motion.p>
          
          {Result.advice.WeeklyWorkoutSchedule.Schedule && (
            <motion.div variants={itemVariants} className="mb-4">
              <SubTitle>Schedule</SubTitle>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                {Object.entries(Result.advice.WeeklyWorkoutSchedule.Schedule).map(([day, workouts]) => (
                  <motion.div 
                    key={day}
                    className="bg-indigo-50 rounded-lg p-3 hover:bg-indigo-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="font-bold text-indigo-800 mb-1">{day}</div>
                    <div className="text-sm text-gray-700">
                      {workouts.length ? workouts.join(', ') : 'Rest Day'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </SectionCard>
      )}
      
      {/* Diet Recommendation Section */}
      {Result.advice?.DietRecommendation && (
        <SectionCard>
          <SectionTitle>Diet Recommendations</SectionTitle>
          
          <motion.div variants={itemVariants} className="mb-6">
            <SubTitle>Focus Areas</SubTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="font-semibold text-green-800 mb-2">Fruits & Vegetables</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.Focus.FruitsAndVeggies}</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="font-semibold text-red-800 mb-2">Protein</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.Focus.Protein}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="font-semibold text-amber-800 mb-2">Whole Grains</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.Focus.WholeGrains}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="font-semibold text-blue-800 mb-2">Healthy Fats</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.Focus.HealthyFats}</div>
              </div>
              <div className="bg-cyan-50 rounded-lg p-4 md:col-span-2">
                <div className="font-semibold text-cyan-800 mb-2">Hydration</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.Focus.Hydration}</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <SubTitle>Meal Timing</SubTitle>
            <div className="bg-indigo-50 rounded-lg p-4 text-gray-700">
              {Result.advice.DietRecommendation.MealTiming}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <SubTitle>Sample Meal Plan</SubTitle>
            <div className="space-y-3">
              <motion.div 
                className="bg-orange-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.01 }}
              >
                <div className="font-semibold text-orange-800 mb-1">Breakfast</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.SampleMealPlan.Breakfast}</div>
              </motion.div>
              <motion.div 
                className="bg-yellow-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.01 }}
              >
                <div className="font-semibold text-yellow-800 mb-1">Lunch</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.SampleMealPlan.Lunch}</div>
              </motion.div>
              <motion.div 
                className="bg-emerald-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.01 }}
              >
                <div className="font-semibold text-emerald-800 mb-1">Dinner</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.SampleMealPlan.Dinner}</div>
              </motion.div>
              <motion.div 
                className="bg-purple-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.01 }}
              >
                <div className="font-semibold text-purple-800 mb-1">Snacks</div>
                <div className="text-gray-700">{Result.advice.DietRecommendation.SampleMealPlan.Snacks.join(', ')}</div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <SubTitle>Foods to Avoid</SubTitle>
            <div className="bg-red-50 rounded-lg p-4">
              <ul className="space-y-1">
                {Result.advice.DietRecommendation.Avoid.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <SubTitle>Calorie Deficit</SubTitle>
            <div className="bg-blue-50 rounded-lg p-4 text-gray-700">
              {Result.advice.DietRecommendation.CalorieDeficit}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <SubTitle>Important Notes</SubTitle>
            <div className="bg-amber-50 rounded-lg p-4">
              <ul className="space-y-2">
                {Result.advice.DietRecommendation.Notes.map((note: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span className="text-gray-700">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </SectionCard>
      )}
      
      {/* Fitness Tips Section */}
      {Result.advice?.FitnessTips && Result.advice.FitnessTips.length > 0 && (
        <SectionCard>
          <SectionTitle>Fitness Tips</SectionTitle>
          <motion.div variants={itemVariants} className="space-y-3">
            {Result.advice.FitnessTips.map((tip: string, idx: number) => (
              <motion.div 
                key={idx} 
                className="bg-teal-50 rounded-lg p-4 hover:bg-teal-100 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start">
                  <span className="text-teal-600 font-bold mr-2">{idx + 1}.</span>
                  <span className="text-gray-700">{tip}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </SectionCard>
      )}
      
      {/* Motivation Section */}
      {Result.advice?.MotivationMessage && (
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2">Your Motivation</h3>
          <p className="text-white/90 italic">"{Result.advice.MotivationMessage}"</p>
        </motion.div>
      )}
    </motion.div>
  );
}