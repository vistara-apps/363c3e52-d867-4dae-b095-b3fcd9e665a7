'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ActionCard } from '@/components/ActionCard';
import { RecordingButton } from '@/components/RecordingButton';
import { AlertBanner } from '@/components/AlertBanner';
import { ShareSheet } from '@/components/ShareSheet';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { 
  BookOpen, 
  MessageSquare, 
  Shield, 
  Crown,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import { GUIDES, SCRIPTS, PREMIUM_FEATURES } from '@/lib/constants';
import { generateIncidentId, formatTimestamp } from '@/lib/utils';
import type { RecordingData, Incident } from '@/lib/types';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [currentView, setCurrentView] = useState<'home' | 'guides' | 'scripts' | 'record' | 'premium'>('home');
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [recordingData, setRecordingData] = useState<RecordingData | null>(null);
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null);
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleRecordingStart = () => {
    console.log('Recording started');
  };

  const handleRecordingStop = (blob: Blob) => {
    const recordingData: RecordingData = {
      blob,
      timestamp: new Date().toISOString(),
      duration: 0, // Would be calculated from actual recording
    };
    setRecordingData(recordingData);
    
    // Create incident
    const incident: Incident = {
      incidentId: generateIncidentId(),
      userId: 'current_user', // Would come from auth
      timestamp: recordingData.timestamp,
      location: 'Current Location', // Would use geolocation
      recordingUrl: URL.createObjectURL(blob),
      notes: 'Recorded incident',
      sharedWith: [],
    };
    
    setCurrentIncident(incident);
    setShareSheetOpen(true);
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4 py-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">CitizenShield</h1>
          <p className="text-text-secondary text-lg">Know Your Rights, Document Your Experience. Instantly.</p>
        </div>
      </div>

      <AlertBanner
        variant="info"
        title="Quick Access"
        message="Tap any feature below for immediate access during an interaction."
      />

      <div className="space-y-4">
        <ActionCard
          title="Know Your Rights"
          description="Quick access to essential legal rights and guidelines for police interactions."
          icon={<BookOpen className="w-6 h-6 text-primary" />}
          variant="guide"
          onClick={() => setCurrentView('guides')}
        />

        <ActionCard
          title="Scripted Responses"
          description="Pre-written, legally sound phrases in English and Spanish for common situations."
          icon={<MessageSquare className="w-6 h-6 text-accent" />}
          variant="script"
          onClick={() => setCurrentView('scripts')}
        />

        <ActionCard
          title="Quick Record"
          description="One-tap recording to document your interaction with audio and video."
          icon={<div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>}
          variant="record"
          onClick={() => setCurrentView('record')}
        />

        <ActionCard
          title="Premium Features"
          description="Extended storage, AI summaries, and advanced sharing options."
          icon={<Crown className="w-6 h-6 text-purple-400" />}
          variant="premium"
          premium={true}
          onClick={() => setCurrentView('premium')}
        />
      </div>

      <div className="glass-card p-4 space-y-3">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Recent Activity
        </h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center justify-between">
            <span>Rights guide accessed</span>
            <span>2 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Script copied</span>
            <span>1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGuides = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          ← Back
        </button>
        <div className="flex space-x-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-primary text-white' : 'bg-gray-700 text-text-secondary'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`px-3 py-1 rounded-full text-sm ${language === 'es' ? 'bg-primary text-white' : 'bg-gray-700 text-text-secondary'}`}
          >
            ES
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text-primary">Know Your Rights</h2>

      <div className="space-y-3">
        {GUIDES.filter(guide => guide.language === language).map((guide) => (
          <div key={guide.guideId} className="glass-card p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">{guide.title}</h3>
            <div className="prose prose-invert text-text-secondary whitespace-pre-line">
              {guide.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScripts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          ← Back
        </button>
        <div className="flex space-x-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-primary text-white' : 'bg-gray-700 text-text-secondary'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`px-3 py-1 rounded-full text-sm ${language === 'es' ? 'bg-primary text-white' : 'bg-gray-700 text-text-secondary'}`}
          >
            ES
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text-primary">Scripted Responses</h2>

      <div className="space-y-3">
        {SCRIPTS.filter(script => script.language === language).map((script) => (
          <div key={script.scriptId} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-primary">{script.title}</h3>
              <button
                onClick={() => navigator.clipboard.writeText(script.content)}
                className="btn-secondary text-sm px-3 py-1"
              >
                Copy
              </button>
            </div>
            <p className="text-text-secondary">{script.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecord = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Quick Record</h2>
        <p className="text-text-secondary">Document your interaction safely</p>
      </div>

      <AlertBanner
        variant="warning"
        title="Recording Notice"
        message="Inform others you are recording if legally required in your jurisdiction. Stay safe and follow local laws."
      />

      <div className="glass-card p-8">
        <RecordingButton
          onRecordingStart={handleRecordingStart}
          onRecordingStop={handleRecordingStop}
        />
      </div>

      <div className="glass-card p-4 space-y-3">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Current Location
        </h3>
        <p className="text-text-secondary">Location services will help document where the incident occurred.</p>
        <button className="btn-secondary w-full">Enable Location</button>
      </div>
    </div>
  );

  const renderPremium = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home')}
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Premium Features</h2>
          <p className="text-text-secondary">Unlock advanced protection tools</p>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="text-xl font-semibold text-text-primary mb-4">What's Included:</h3>
        <div className="space-y-3">
          {PREMIUM_FEATURES.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 text-center space-y-4">
        <div className="text-3xl font-bold text-text-primary">$0.99</div>
        <p className="text-text-secondary">One-time payment via USDC on Base</p>
        <button className="btn-primary w-full">Upgrade Now</button>
        <p className="text-xs text-text-secondary">
          Secure payment powered by Base blockchain
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-gray-900 to-purple-900">
      <Header />
      
      <main className="max-w-screen-sm mx-auto px-4 py-6">
        {currentView === 'home' && renderHome()}
        {currentView === 'guides' && renderGuides()}
        {currentView === 'scripts' && renderScripts()}
        {currentView === 'record' && renderRecord()}
        {currentView === 'premium' && renderPremium()}
      </main>

      {shareSheetOpen && currentIncident && (
        <ShareSheet
          isOpen={shareSheetOpen}
          onClose={() => setShareSheetOpen(false)}
          incidentData={{
            id: currentIncident.incidentId,
            timestamp: formatTimestamp(currentIncident.timestamp),
            location: currentIncident.location,
            summary: currentIncident.notes,
          }}
        />
      )}
    </div>
  );
}
