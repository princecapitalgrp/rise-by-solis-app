import { motion } from 'framer-motion';
import { LogOut, Zap, Shield, Compass, Share2, Calendar } from 'lucide-react';
import type { Archetype } from '../../types';
import { ARCHETYPE_DESCRIPTIONS } from '../../lib/archetypes';

// Mock data for a "Protocol"
const mockProtocol = {
  title: 'Deep Clarity Protocol',
  openingLine: 'The world is quiet; your mind is loud. Harness the noise.',
  steps: [
    { time: '06:00', duration: '10m', action: 'Light Exposure', description: 'Immediate sunlight or 10k lux lamp to reset circadian clock.' },
    { time: '06:15', duration: '20m', action: 'Non-Linear Movement', description: 'Mobility work to unlock joint capsules and promote lymphatic flow.' },
    { time: '06:40', duration: '45m', action: 'Deep Forge', description: 'Your highest leverage task. No communication. No notifications.' },
  ],
  nonNegotiable: 'No digital inputs until 07:30.',
  sensoryCue: 'Cool air on the face while hydrating.'
};

export default function DashboardView() {
  // In a real app, we'd fetch these from context or Firestore
  const archetype: Archetype = (localStorage.getItem('rise_archetype') as Archetype) || 'The Sentinel';
  const info = ARCHETYPE_DESCRIPTIONS[archetype];

  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      {/* Top Header */}
      <header className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gold-dawn rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="font-serif text-xl text-text-redBrown">Rise</span>
        </div>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="text-text-walnut p-2"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="px-6 pt-6 max-w-lg mx-auto">
        {/* Archetype Card */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-text-charcoal to-black p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden mb-8"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            {archetype === 'The Sentinel' && <Shield className="w-32 h-32" />}
            {archetype === 'The Nomad' && <Compass className="w-32 h-32" />}
          </div>
          
          <span className="text-gold-dawn font-semibold tracking-widest text-xs uppercase mb-2 block">Your Archetype</span>
          <h1 className="text-3xl font-serif mb-3 italic">{archetype}</h1>
          <p className="text-linen/80 text-sm leading-relaxed mb-6">
            {info.description}
          </p>
          <div className="flex items-center space-x-2 bg-white/10 w-max px-4 py-2 rounded-full border border-white/10">
            <Calendar className="w-4 h-4 text-gold-dawn" />
            <span className="text-xs font-medium">Protocol Active: Today</span>
          </div>
        </motion.section>

        {/* Protocol Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-text-redBrown">Today's Protocol</h2>
            <button className="text-gold-dawn"><Share2 className="w-5 h-5" /></button>
          </div>

          <div className="space-y-4">
            {mockProtocol.steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-linen/50 flex items-start space-x-4"
              >
                <div className="text-xs font-bold text-amber-muted pt-1 whitespace-nowrap">
                  {step.time}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-charcoal mb-1">{step.action}</h3>
                  <p className="text-sm text-text-walnut/70 leading-snug">{step.description}</p>
                  <div className="mt-2 text-[10px] font-bold text-gold-dawn uppercase tracking-widest">
                    Duration: {step.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Insight Box */}
        <section className="bg-amber-mist/20 p-6 rounded-3xl border border-amber-muted/20">
          <h3 className="text-sm font-bold text-text-redBrown uppercase mb-2 flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Strategic Constraint</span>
          </h3>
          <p className="text-text-walnut font-medium italic">
            "{mockProtocol.nonNegotiable}"
          </p>
        </section>
      </main>
    </div>
  );
}
