import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import OnboardingView from "./features/onboarding/OnboardingView";

function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
      <div className="max-w-md w-full">
        <h1 className="text-5xl font-serif text-text-redBrown mb-6 leading-tight">Rise by Solis</h1>
        <p className="text-xl text-text-walnut mb-10 leading-relaxed font-sans">
          The morning system that understands who you need to be today.
          Adaptive protocols for the cognitively over-leveraged.
        </p>
        <button 
          onClick={() => navigate('/onboarding')}
          className="w-full bg-gradient-to-r from-amber-muted to-gold-dawn text-white px-8 py-4 rounded-full font-sans font-semibold shadow-[0_10px_20px_-10px_rgba(212,150,58,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(212,150,58,0.6)] hover:scale-[1.02] transition-all duration-300 active:scale-95"
        >
          Begin Protocol
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<OnboardingView />} />
      </Routes>
    </Router>
  );
}

export default App;
