'use client';

import { Shield } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-gray-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">
            Something went wrong!
          </h2>
          <p className="text-text-secondary">
            We encountered an error while loading CitizenShield. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary w-full"
          >
            Go Home
          </button>
        </div>

        {error.message && (
          <details className="text-left">
            <summary className="text-text-secondary text-sm cursor-pointer hover:text-text-primary">
              Error Details
            </summary>
            <pre className="text-xs text-red-400 mt-2 p-2 bg-gray-800 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
