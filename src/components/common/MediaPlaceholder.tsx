import React from "react";
import { Plus, Music, Film } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { MediaType } from "../../types";

interface MediaPlaceholderProps {
  mediaType: MediaType;
  mediaUrl?: string;
  creator: string;
  onAddMedia?: () => void;
  className?: string;
}

const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  mediaType,
  mediaUrl,
  creator,
  onAddMedia,
  className,
}) => {
  const renderMediaContent = () => {
    if (mediaUrl) {
      switch (mediaType) {
        case "image":
          return (
            <img
              src={mediaUrl}
              alt="NFT Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          );
        case "music":
          return (
            <div className="flex flex-col items-center justify-center h-full w-full p-4">
              <Music size={48} className="text-indigo-600 mb-2" />
              <audio src={mediaUrl} controls className="w-full mt-2" />
            </div>
          );
        case "video":
          return (
            <video
              src={mediaUrl}
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          );
        default:
          return null;
      }
    }

    // Default placeholder
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
        {mediaType === "image" && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 flex items-center justify-center">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {mediaType === "music" && <Music size={48} />}
        {mediaType === "video" && <Film size={48} />}
        <p className="mt-2 text-sm">No {mediaType} selected</p>
      </div>
    );
  };

  return (
    <div
      className={twMerge(
        "relative bg-gray-50 rounded-lg overflow-hidden aspect-square w-full",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {renderMediaContent()}
      </div>

      {/* {onAddMedia && mediaType === 'image' && !mediaUrl && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddMedia}
          className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-600 border border-gray-200 hover:bg-gray-50 group"
          title="Upload image"
        >
          <Plus size={20} />
        </motion.button>
      )} */}

      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
        BY: {creator}
      </div>
    </div>
  );
};

export default MediaPlaceholder;
