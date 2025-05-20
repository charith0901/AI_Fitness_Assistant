import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Result from './components/Result';
import './App.css';
import RecentInputs from './components/RecentInputs';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-8 tracking-tight">
            Fitness Plan Predictor
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
              <Route path='/recent' element={<RecentInputs />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
