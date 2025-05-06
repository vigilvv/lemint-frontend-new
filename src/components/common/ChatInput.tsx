import React, { useState, useRef, useEffect } from "react";
// import { SendHorizontal } from "lucide-react";
// import { motion } from "framer-motion";
import { useNFTStore } from "../../store/nftStore";

interface ChatInputProps {
  className?: string;
  setPrompt: React.ComponentState;
}

const ChatInput: React.FC<ChatInputProps> = ({ className, setPrompt }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentNFT, isGenerating, generateFromPrompt } = useNFTStore();

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;

    // Generate media based on the prompt
    // setPrompt(inputValue);
    await generateFromPrompt(inputValue);
  };

  useEffect(() => {
    setPrompt(inputValue);
  }, [inputValue, setPrompt]);

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Describe what you want to create..."
          className="w-full px-4 py-3 pr-12 transition-all bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
          disabled={isGenerating}
        />

        {/* <motion.button
          whileTap={{ scale: 0.92 }}
          type="submit"
          disabled={!inputValue.trim() || isGenerating}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 disabled:text-gray-400 disabled:cursor-not-allowed p-1.5 rounded-full hover:bg-indigo-50"
        >
          <SendHorizontal size={18} />
        </motion.button> */}

        {isGenerating && (
          <div className="absolute flex items-center text-xs text-indigo-600 left-4 -bottom-6">
            <svg
              className="w-3 h-3 mr-2 -ml-1 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating {currentNFT.mediaType}...
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
