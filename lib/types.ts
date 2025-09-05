export interface User {
  userId: string; // Farcaster ID
  walletAddress?: string;
  preferredLanguage: 'en' | 'es';
  premiumStatus: boolean;
}

export interface Incident {
  incidentId: string;
  userId: string;
  timestamp: string;
  location?: string;
  recordingUrl?: string;
  notes: string;
  sharedWith: string[];
}

export interface Guide {
  guideId: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  stateSpecific?: string;
}

export interface Script {
  scriptId: string;
  title: string;
  content: string;
  language: 'en' | 'es';
}

export interface RecordingData {
  blob: Blob;
  timestamp: string;
  duration: number;
}
