import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Result from './components/Result';
import './App.css';
import RecentInputs from './components/RecentInputs';
import { BiHeart } from 'react-icons/bi';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 mb-4 sm:mb-6 md:mb-8 tracking-tight">
            Fitness Plan Predictor
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mx-1 sm:mx-2 md:mx-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
              <Route path='/recent' element={<RecentInputs />} />
            </Routes>
          </div>
        </div>
        <footer className="mt-4 sm:mt-6 md:mt-8 text-center text-gray-600 px-2">
          <p className="text-sm sm:text-base">&copy; 2025 Fitness Plan Predictor</p>
          <p className="text-xs sm:text-sm">
            Developed by
            <BiHeart aria-label="heart" className="inline mx-1 text-pink-500 align-text-bottom" />
            <a
              href='https://github.com/charith0901'
              target='_blank'
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Charith Jayasankha
            </a>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
