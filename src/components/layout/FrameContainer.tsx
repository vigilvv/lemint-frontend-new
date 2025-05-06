import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface FrameContainerProps extends PropsWithChildren {
  className?: string;
  showFrame?: boolean;
}

const FrameContainer: React.FC<FrameContainerProps> = ({ 
  children, 
  className,
  showFrame = true 
}) => {
  return (
    <div className={twMerge("w-full max-w-3xl mx-auto h-full", className)}>
      {showFrame ? (
        <motion.div 
          className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Frame top bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 flex items-center px-2 z-10">
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
          </div>
          
          {/* Content with padding for the top bar */}
          <div className="pt-6 w-full h-full">
            {children}
          </div>
        </motion.div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default FrameContainer;