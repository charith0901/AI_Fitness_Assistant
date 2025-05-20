import { useState } from 'react';
import instance from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRunning, FaWeight, FaDumbbell, FaUserAlt } from 'react-icons/fa';
import { BiBody } from 'react-icons/bi';

function Home() {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    Weight: '',
    Goal: '',
    ActivityLevel: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await instance.post('/predict', {
        Age: parseInt(formData.Age),
        Gender: parseInt(formData.Gender),
        Weight: parseFloat(formData.Weight),
        Goal: parseInt(formData.Goal),
        ActivityLevel: parseInt(formData.ActivityLevel),
      });
      navigate('/result', { 
        state: { 
          prediction: response.data.predicted_plan,
          userData: formData,
          advice: response.data,
        } 
      });
    } catch (error) {
      console.error('Error making prediction:', error);
      alert('Error making prediction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "block text-lg font-medium text-gray-700 mb-2";
  const formGroupClass = "mb-8 relative";
  const iconClass = "absolute top-[43px] left-3 text-blue-500 text-xl";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4"
          >
            <FaDumbbell className="text-white text-4xl" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold text-gray-900 mb-2"
          >
            Fitness Assistant
          </motion.h1>
          <p className="text-gray-600 text-lg">Let's create your personalized fitness plan</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-lg mb-6"
        >
          <Link to="/recent" className="block text-center mb-4">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            View Recent Inputs
          </motion.button>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <form onSubmit={handleSubmit}>
            <motion.div 
              className={formGroupClass}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className={labelClass}>Age</label>
              <div className="relative">
                <FaUserAlt className={iconClass} />
                <input 
                  type="number" 
                  name="Age" 
                  value={formData.Age} 
                  onChange={handleChange} 
                  required 
                  className={inputClass}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className={formGroupClass}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className={labelClass}>Gender</label>
              <div className="relative">
                <BiBody className={iconClass} />
                <select 
                  name="Gender" 
                  value={formData.Gender} 
                  onChange={handleChange} 
                  required 
                  className={inputClass}
                >
                  <option value="">Select gender</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </div>
            </motion.div>
            
            <motion.div 
              className={formGroupClass}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className={labelClass}>Weight (kg)</label>
              <div className="relative">
                <FaWeight className={iconClass} />
                <input 
                  type="number" 
                  name="Weight" 
                  value={formData.Weight} 
                  onChange={handleChange} 
                  required 
                  className={inputClass}
                  placeholder="Enter your weight in kg"
                  step="0.1"
                  min="20"
                  max="300"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className={formGroupClass}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className={labelClass}>Goal</label>
              <div className="relative">
                <FaDumbbell className={iconClass} />
                <select 
                  name="Goal" 
                  value={formData.Goal} 
                  onChange={handleChange} 
                  required 
                  className={inputClass}
                >
                  <option value="">Select your goal</option>
                  <option value="0">Lose Weight</option>
                  <option value="1">Maintain Weight</option>
                  <option value="2">Gain Muscle</option>
                </select>
              </div>
            </motion.div>
            
            <motion.div 
              className={formGroupClass}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className={labelClass}>Activity Level</label>
              <div className="relative">
                <FaRunning className={iconClass} />
                <select 
                  name="ActivityLevel" 
                  value={formData.ActivityLevel} 
                  onChange={handleChange} 
                  required 
                  className={inputClass}
                >
                  <option value="">Select activity level</option>
                  <option value="0">Sedentary</option>
                  <option value="1">Lightly Active</option>
                  <option value="2">Moderately Active</option>
                  <option value="3">Very Active</option>
                </select>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button 
                type="submit" 
                className="w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Plan...
                  </div>
                ) : 'Get My Fitness Plan'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
