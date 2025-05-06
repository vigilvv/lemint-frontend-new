import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Image, Music, FileVideo, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import FrameContainer from '../components/layout/FrameContainer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center mb-4"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold mr-2">
              L
            </div>
            <h1 className="text-4xl font-bold text-gray-900">LeMint</h1>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto"
          >
            Create stunning AI-generated NFTs on the Lukso blockchain
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            <div className="mb-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full text-indigo-600 mr-4">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">AI-Powered Creation</h3>
                  <p className="text-gray-600">Generate unique digital art, music, and videos with a simple prompt.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full text-purple-600 mr-4">
                  <Image size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Multiple Media Types</h3>
                  <p className="text-gray-600">Create NFTs from images, music, or videos - all in one platform.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full text-pink-600 mr-4">
                  <FileVideo size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">One-Click Minting</h3>
                  <p className="text-gray-600">Seamlessly mint your creations as NFTs on the Lukso blockchain.</p>
                </div>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => navigate('/create')}
                size="lg"
                className="w-full md:w-auto"
                icon={<ArrowRight size={18} />}
              >
                Launch App
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex-1 w-full max-w-md"
          >
            <div className="relative pt-10 px-6">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1 rounded-full text-white text-xs font-medium">
                Preview
              </div>
              <FrameContainer>
                <div className="flex flex-col items-center justify-center p-6 min-h-[400px]">
                  <div className="text-center mb-6">
                    <div className="mb-2 inline-flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-2">L</div>
                      <h3 className="text-xl font-semibold">LeMint</h3>
                    </div>
                    <p className="text-sm text-gray-500">AI-powered NFT creation platform</p>
                  </div>
                  
                  <div className="w-full max-w-xs bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-4">
                    <p className="text-gray-400 text-sm">NFT Preview</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs">Image</div>
                    <div className="px-3 py-1 rounded-full bg-white text-gray-600 text-xs border border-gray-200">Music</div>
                    <div className="px-3 py-1 rounded-full bg-white text-gray-600 text-xs border border-gray-200">Video</div>
                  </div>
                  
                  <div className="w-full max-w-xs bg-white border border-gray-200 rounded-full px-4 py-2 text-gray-400 text-sm mb-4">
                    Describe what you want to create...
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">Generate</button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm">Mint NFT</button>
                  </div>
                </div>
              </FrameContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;