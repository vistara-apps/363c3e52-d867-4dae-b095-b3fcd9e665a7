'use client';

import { useState } from 'react';
import { Share2, Copy, Download, X } from 'lucide-react';

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  incidentData: {
    id: string;
    timestamp: string;
    location?: string;
    summary: string;
  };
}

export function ShareSheet({ isOpen, onClose, incidentData }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/incident/${incidentData.id}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CitizenShield Incident Report',
          text: incidentData.summary,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="w-full bg-surface rounded-t-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Share Incident</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="glass-card p-4 space-y-2">
          <div className="text-sm text-text-secondary">Incident ID: {incidentData.id}</div>
          <div className="text-sm text-text-secondary">Time: {incidentData.timestamp}</div>
          {incidentData.location && (
            <div className="text-sm text-text-secondary">Location: {incidentData.location}</div>
          )}
          <div className="text-text-primary mt-2">{incidentData.summary}</div>
        </div>

        <div className="space-y-3">
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center space-x-2 btn-secondary"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {navigator.share && (
            <button
              onClick={shareNative}
              className="w-full flex items-center justify-center space-x-2 btn-primary"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          )}

          <button className="w-full flex items-center justify-center space-x-2 btn-accent">
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
