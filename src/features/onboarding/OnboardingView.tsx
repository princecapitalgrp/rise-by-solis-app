import { useMachine } from '@xstate/react';
import { onboardingMachine } from './onboardingMachine';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { calculateArchetype } from '../../lib/archetypes';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 'sleepWindow', title: 'Sleep Window', question: 'When do you typically wake up?' },
  { id: 'capacity', title: 'Morning Capacity', question: 'How much cognitive load can you handle in the first hour?' },
  { id: 'physicalBaseline', title: 'Physical Baseline', question: 'Rate your general morning physical energy (1-5).' },
  { id: 'morningPulse', title: 'Morning Pulse', question: 'What is your primary state of mind upon waking?' },
  { id: 'agencyType', title: 'Agency Type', question: 'How do you prefer to take control of your day?' },
  { id: 'pressureResponse', title: 'Pressure Response', question: 'How do you handle early morning demands?' },
  { id: 'sensoryRegulation', title: 'Sensory Regulation', question: 'What level of sensory stimulation do you prefer early on?' },
  { id: 'priorities', title: 'Priorities', question: 'What is your focus for the next 12 months?' },
  { id: 'currentWeight', title: 'Current Weight', question: 'What is weighing most heavily on you right now?' },
  { id: 'childhoodTexture', title: 'Childhood Texture', question: 'What is your earliest memory of a morning routine?' },
  { id: 'review', title: 'Review', question: 'Confirm your profile details.' },
];

export default function OnboardingView() {
  const [state, send] = useMachine(onboardingMachine);
  const navigate = useNavigate();
  
  const currentStep = steps.find(s => state.matches(s.id as any));
  const progress = (steps.findIndex(s => state.matches(s.id as any)) / (steps.length - 1)) * 100;

  const [isSaving, setIsSaving] = useState(false);

  const handleNext = (data: any) => {
    send({ type: 'NEXT', data });
  };

  const handleBack = () => {
    send({ type: 'BACK' });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const archetype = calculateArchetype(state.context);
      localStorage.setItem('rise_archetype', archetype);

      await addDoc(collection(db, 'onboarding'), {
        ...state.context,
        calculatedArchetype: archetype,
        createdAt: serverTimestamp(),
        status: 'completed'
      });
      send({ type: 'SUBMIT' });
    } catch (error) {
      console.error("Error saving profile:", error);
      // Fallback to complete even if save fails for demo purposes
      send({ type: 'SUBMIT' });
    } finally {
      setIsSaving(false);
    }
  };

  if (state.matches('completing')) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full"
        >
          <div className="w-20 h-20 bg-gold-dawn/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-gold-dawn w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif text-text-redBrown mb-4">Profile Created</h2>
          <p className="text-text-walnut mb-8 font-sans">
            Your morning archetype has been established. Preparing your first protocol...
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-text-charcoal text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Enter Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header / Progress */}
      <div className="p-6 flex items-center justify-between">
        <button 
          onClick={handleBack}
          disabled={state.matches('sleepWindow')}
          className="p-2 disabled:opacity-0 transition-opacity"
        >
          <ChevronLeft className="text-text-charcoal" />
        </button>
        <div className="flex-1 mx-8 h-1 bg-linen rounded-full relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-amber-muted"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <main className="flex-1 flex flex-col px-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.value as string}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <span className="text-amber-muted font-semibold tracking-wider text-sm uppercase mb-2">
              {currentStep?.title}
            </span>
            <h2 className="text-3xl font-serif text-text-redBrown mb-8 leading-tight">
              {currentStep?.question}
            </h2>

            {state.matches('review') ? (
              <div className="flex-1 overflow-y-auto space-y-4 mb-8">
                {Object.entries(state.context).map(([key, value]) => (
                  <div key={key} className="bg-surface p-4 rounded-xl border border-linen">
                    <span className="block text-xs text-text-walnut uppercase tracking-tighter mb-1">{key}</span>
                    <span className="text-text-charcoal font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col space-y-4">
                {/* Simplified input mapping based on step ID */}
                {state.matches('physicalBaseline') ? (
                  <div className="flex justify-between items-center bg-surface p-8 rounded-2xl border border-linen">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => handleNext({ physicalBaseline: num })}
                        className="w-12 h-12 rounded-full border-2 border-linen hover:border-amber-muted hover:bg-amber-mist/20 transition-all text-text-charcoal font-bold"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input 
                    key={currentStep?.id}
                    autoFocus
                    className="w-full bg-surface border-b-2 border-linen focus:border-amber-muted outline-none py-4 text-xl text-text-charcoal transition-colors placeholder:text-linen"
                    placeholder="Type your response..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleNext({ [currentStep?.id || '']: e.currentTarget.value });
                      }
                    }}
                  />
                )}
                <p className="text-sm text-text-walnut/60 italic">Press Enter to continue</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto">
          {state.matches('review') ? (
            <button 
              onClick={handleSubmit}
              disabled={isSaving}
              className="w-full bg-text-charcoal text-white py-5 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Finalize Profile</span>
                  <Check className="w-5 h-5" />
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={() => {
                const input = document.querySelector('input');
                if (input) handleNext({ [currentStep?.id || '']: input.value });
              }}
              className="w-full bg-gradient-to-r from-amber-muted to-gold-dawn text-white py-5 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
