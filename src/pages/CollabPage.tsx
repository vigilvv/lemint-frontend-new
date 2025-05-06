import React from 'react';
import Navigation from '../components/layout/Navigation';
import InfoPopup from '../components/common/InfoPopup';

const CollabPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6">
        <div className="flex items-center justify-between mb-6">
          <Navigation />
          <InfoPopup />
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
          <p className="text-gray-600">The Collab section is under development</p>
        </div>
      </div>
    </div>
  );
};

export default CollabPage;