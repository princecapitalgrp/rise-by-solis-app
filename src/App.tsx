import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-serif text-text-redBrown mb-4">Rise by Solis</h1>
      <p className="text-lg text-text-walnut mb-8 max-w-md">
        The morning system that understands who you need to be today.
        Adaptive mornings for people whose routines keep breaking.
      </p>
      <button className="bg-gradient-to-r from-amber-muted to-gold-dawn text-white px-8 py-3 rounded-full font-sans shadow-lg hover:shadow-xl transition-all">
        Start
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
