export type Archetype = 'The Sentinel' | 'The Alchemist' | 'The Nomad' | 'The Weaver';

export interface UserProfile {
  uid: string;
  createdAt: any; // Firestore Timestamp
  email?: string;
  displayName?: string;
  emailOptIn: boolean;
  onboardingCompleted: boolean;
  currentArchetype?: Archetype;
  archetypeTranslation?: string;
  sensoryModifier?: string;
  profileVersion: number;
}

export interface OnboardingProfile {
  uid: string;
  sleepWindow: string;
  morningCapacity: string;
  physicalBaseline: number; // 1-5
  morningPulse: string;
  agencyType: string;
  pressureResponse: string;
  sensoryRegulation: string;
  priorities12m: string;
  currentWeight: string;
  childhoodMorningTexture: string;
  createdAt: any;
  updatedAt: any;
}

export interface DailyCheckIn {
  uid: string;
  date: string; // YYYY-MM-DD
  energy: number; // 1-5
  stress: number; // 1-5
  sleepQuality: number; // 1-5
  mood: string;
  pressurePoint: string;
  firstCommitment: string;
  updatedWeight: string;
  note?: string;
  createdAt: any;
}

export interface ProtocolStep {
  time?: string;
  action: string;
  duration?: string;
  description?: string;
}

export interface Protocol {
  uid: string;
  date: string;
  protocolTitle: string;
  openingLine: string;
  mainProtocol: ProtocolStep[];
  fallbackProtocol: ProtocolStep[];
  nonNegotiableAction: string;
  sensoryCue: string;
  antiPatternWarning: string;
  summaryInsight: string;
  internalArchetype: string;
  createdAt: any;
  promptVersion: string;
  feedbackStatus: 'none' | 'followed' | 'skipped' | 'partial';
}
