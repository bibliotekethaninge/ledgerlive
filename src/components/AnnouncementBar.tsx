import React from 'react';
import { ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black animate-pulse"
        style={{ 
          animation: 'gradient 3s ease infinite',
          backgroundSize: '200% 100%'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between py-5">
          <p className="text-white text-base font-medium">
            Review and sign transactions from a single secure screen with Ledger Flex™
          </p>
          <a 
            href="#" 
            className="inline-flex items-center text-gray-300 hover:text-white text-base font-medium transition-colors duration-200"
          >
            Discover now
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;