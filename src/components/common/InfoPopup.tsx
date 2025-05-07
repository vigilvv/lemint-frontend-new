import React, { useState } from "react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface InfoPopupProps {
  title?: string;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ title = "About LeMint" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-6 h-6 transition-colors bg-orange-200 rounded-full hover:bg-orange-300"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
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
                  <strong>LeMint</strong> is an AI-powered NFT creation platform
                  for the Lukso blockchain.
                </p>
                <p>
                  Create unique digital assets by generating AI art (for now),
                  music, or videos, and mint them directly as NFTs on the Lukso
                  network.
                </p>
                <h4 className="mt-4 font-medium text-gray-800">How to use:</h4>
                <ol className="pl-5 space-y-2 list-decimal">
                  <li>
                    Use the chat interface to describe what you want to create
                  </li>
                  <li>When satisfied with the result, mint your NFT</li>
                  <li>Minting takes approximately 2-3 minutes</li>
                  <li>If minting fails please try again later</li>
                </ol>
                <p className="mt-4 text-sm text-gray-500">
                  Note: Minting will require LYX tokens when the mini-app will
                  be deployed to mainnet.
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => setIsOpen(false)}>Got it</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoPopup;
