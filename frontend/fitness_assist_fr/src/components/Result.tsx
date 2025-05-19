import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaDumbbell, FaRunning, FaAppleAlt, FaMedal } from 'react-icons/fa';
import { GiMuscleUp, GiWeightScale } from 'react-icons/gi';
import { useState } from 'react';
import type { AdviceType } from '../types/AdviceType';
import { useEffect } from 'react';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ adviceByAi, setAdvice ] = useState<AdviceType>({
    prediction_plan: "",
    advice: {
      WeeklyWorkoutSchedule: {
        Overview:"",
        Schedule: []
      },
      Progression: []
    },
    DietRecommendation: {
      Focus: {
        FruitsAndVeggies: "",
        Protein: "",
        WholeGrains: "",
        HealthyFats: "",
        Hydration: ""
      },
      MealTiming: "",
      SampleMealPlan: {
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Snacks: []
      },
      Avoid: [],
      CaloriesDeficit: "",
      Notes: []
    },
    FitnessTips: [],
    MotivationMessage: ""
  });
  const prediction = location.state?.prediction;
  const userData = location.state?.userData;

  useEffect(() => {
    if (location.state?.advice) {
      setAdvice(location.state.advice);
    }
  }, [location.state?.advice]);

  if (!prediction) {
    navigate('/');
    return null;
  }

  // Determine which icon to show based on the user's goal
  const getGoalIcon = () => {
    if (userData?.Goal === '0') return <GiWeightScale className="text-4xl text-red-500" />;
    if (userData?.Goal === '1') return <FaAppleAlt className="text-4xl text-green-500" />;
    if (userData?.Goal === '2') return <GiMuscleUp className="text-4xl text-blue-500" />;
    return <FaDumbbell className="text-4xl text-indigo-500" />;
  };

  const formatPrediction = (text: string) => {
    const sentences = text.split('.');
    const paragraphs = [];
    let currentParagraph = '';

    sentences.forEach(sentence => {
      if (!sentence.trim()) return;

      // Start new paragraphs for certain keywords
      if (
        sentence.toLowerCase().includes('workout') ||
        sentence.toLowerCase().includes('diet') ||
        sentence.toLowerCase().includes('plan') ||
        (currentParagraph.length > 100 && sentence.trim().length > 10)
      ) {
        if (currentParagraph) {
          paragraphs.push(currentParagraph.trim() + '.');
        }
        currentParagraph = sentence.trim();
      } else {
        currentParagraph += '. ' + sentence.trim();
      }
    });

    if (currentParagraph) {
      paragraphs.push(currentParagraph.trim() + '.');
    }

    return paragraphs;
  };

  const formattedPrediction = formatPrediction(prediction);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="mx-auto w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-4"
          >
            <FaMedal className="text-white text-3xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold text-gray-900 mb-2"
          >
            Your Personalized Fitness Plan
          </motion.h1>
          <p className="text-gray-600">Here's your custom recommendation based on your profile</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center">
            <div className="bg-white p-2 rounded-full mr-4">
              {getGoalIcon()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Your Fitness Journey</h2>
              <p className="text-blue-100 text-sm">
                {userData?.Gender === '0' ? 'Female' : 'Male'} • {userData?.Age} years • {userData?.Weight} kg
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {formattedPrediction.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-indigo-500"
                >
                  <p className="text-gray-800">{paragraph}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 bg-indigo-50 p-4 rounded-lg flex items-center"
            >
              <FaRunning className="text-indigo-600 text-2xl mr-3" />
              <p className="text-indigo-800 font-medium">
                Follow this plan consistently for best results. Adjust as needed based on your progress.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="mr-2" /> Create Another Plan
          </motion.button>
        </motion.div>
      </motion.div>
      <div>
        <h2>advices</h2>
        {adviceByAi.advice.WeeklyWorkoutSchedule &&(
            <div>
            <h3>Weekly Workouts Schedule</h3>
            <p>{adviceByAi.advice.WeeklyWorkoutSchedule.Overview}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
