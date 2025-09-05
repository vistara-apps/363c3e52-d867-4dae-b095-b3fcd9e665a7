'use client';

import { Shield, Menu } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

export function Header() {
  return (
    <header className="w-full bg-surface bg-opacity-90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen-sm mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-text-primary">CitizenShield</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Wallet>
            <ConnectWallet className="btn-secondary text-sm px-4 py-2">
              <Name />
            </ConnectWallet>
          </Wallet>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <Menu className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
}
