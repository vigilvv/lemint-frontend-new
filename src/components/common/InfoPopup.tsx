import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface InfoPopupProps {
  title?: string;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ title = 'About LeMint' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-full w-6 h-6 bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Information"
      >
        <Info size={14} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>LeMint</strong> is an AI-powered NFT creation platform for the Lukso blockchain.
                </p>
                <p>
                  Create unique digital assets by generating AI art, music, or videos, and mint them directly
                  as NFTs on the Lukso network.
                </p>
                <h4 className="font-medium text-gray-800 mt-4">How to use:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Select your desired media type (Image, Music, or Video)</li>
                  <li>Upload your own media or generate using AI</li>
                  <li>Use the chat interface to describe what you want to create</li>
                  <li>When satisfied with the result, mint your NFT</li>
                </ol>
                <p className="text-sm text-gray-500 mt-4">
                  Note: Minting requires LYX tokens in your connected wallet.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setIsOpen(false)}>
                  Got it
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoPopup;