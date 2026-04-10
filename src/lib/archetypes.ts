import type { Archetype, OnboardingProfile } from '../types';

export function calculateArchetype(profile: Partial<OnboardingProfile>): Archetype {
  // Simple heuristic-based calculation for the "Solis" archetypes
  const pulse = profile.morningPulse?.toLowerCase() || '';
  const energy = profile.physicalBaseline || 3;
  const capacity = profile.morningCapacity?.toLowerCase() || '';

  // 1. The Sentinel: High reliability, structured, protective of routine
  if (energy >= 4 && (pulse.includes('clarity') || pulse.includes('focus'))) {
    return 'The Sentinel';
  }

  // 2. The Alchemist: High cognitive capacity early on, transforming ideas
  if (capacity.includes('high') || pulse.includes('creative') || pulse.includes('active')) {
    return 'The Alchemist';
  }

  // 3. The Nomad: Adaptive, needs movement, low initial structure
  if (pulse.includes('drift') || pulse.includes('slow') || energy <= 2) {
    return 'The Nomad';
  }

  // 4. The Weaver: Connecting dots, multi-tasking, social/relational focus
  return 'The Weaver';
}

export const ARCHETYPE_DESCRIPTIONS: Record<Archetype, { tagline: string; description: string }> = {
  'The Sentinel': {
    tagline: 'Guardian of the Morning Order',
    description: 'You thrive on predictability and physical readiness. Your protocol focuses on fortifying your existing strengths and defending your time.'
  },
  'The Alchemist': {
    tagline: 'Transformer of Cognitive Potential',
    description: 'Your peak window is immediate. Your protocol prioritizes deep work and creative transmutation before the world interrupts.'
  },
  'The Nomad': {
    tagline: 'Adaptive Voyager of the Early Hours',
    description: 'You require a gradual on-ramp. Your protocol focuses on gentle sensory activation and low-friction wins to build momentum.'
  },
  'The Weaver': {
    tagline: 'Harmonizer of Complex Threads',
    description: 'You excel at seeing the big picture. Your protocol focuses on alignment, connection, and setting the strategic tone for the day.'
  }
};
