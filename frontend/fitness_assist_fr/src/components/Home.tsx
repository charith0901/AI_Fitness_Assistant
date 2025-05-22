import { useState } from 'react';
import instance from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRunning, FaWeight, FaDumbbell, FaUserAlt } from 'react-icons/fa';
import { BiBody } from 'react-icons/bi';
import fitnessImage from '../assets/images/fitness_1.jpg';

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

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
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
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-block p-4 bg-indigo-500 rounded-full text-white mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaDumbbell className="text-3xl" />
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Fitness Assistant
          </motion.h1>
          <p className="text-lg text-gray-600">Let's create your personalized fitness plan</p>

          <motion.h1
            className="text-xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            How it works:
          </motion.h1>
          <motion.p className="text-lg text-gray-600">
            Based on your inputs, we will generate a personalized fitness plan (from trained model) that includes advice on diet, exercise, and lifestyle changes to help you achieve your fitness goals(from Gemini Api).
          </motion.p>

        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/recent">
                <motion.button 
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>View Recent Inputs</span>
                </motion.button>
              </Link>
              <Link to="/model_info">
                <motion.button 
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  //onClick={() => handleRetrainModel()}
                >
                  <span>Model Info</span>
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1"
                >
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="number" 
                      name="Age" 
                      value={formData.Age} 
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your age"
                      min="1"
                      max="120"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-1"
                >
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BiBody className="h-5 w-5 text-gray-400" />
                    </div>
                    <select 
                      name="Gender" 
                      value={formData.Gender} 
                      onChange={handleChange} 
                      required 
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select gender</option>
                      <option value="0">Female</option>
                      <option value="1">Male</option>
                    </select>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-1"
                >
                  <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaWeight className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="number" 
                      name="Weight" 
                      value={formData.Weight} 
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your weight in kg"
                      step="0.1"
                      min="20"
                      max="300"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-1"
                >
                  <label className="block text-sm font-medium text-gray-700">Goal</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDumbbell className="h-5 w-5 text-gray-400" />
                    </div>
                    <select 
                      name="Goal" 
                      value={formData.Goal} 
                      onChange={handleChange} 
                      required 
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select your goal</option>
                      <option value="0">Lose Weight</option>
                      <option value="1">Maintain Weight</option>
                      <option value="2">Gain Muscle</option>
                    </select>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-1"
                >
                  <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaRunning className="h-5 w-5 text-gray-400" />
                    </div>
                    <select 
                      name="ActivityLevel" 
                      value={formData.ActivityLevel} 
                      onChange={handleChange} 
                      required 
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="pt-4"
                >
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating Plan...</span>
                      </div>
                    ) : 'Get My Fitness Plan'}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className=" "
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div 
              className="h-full rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={fitnessImage} 
                alt="Fitness Motivation" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;