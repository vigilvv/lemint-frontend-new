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
  const { isGenerating, generateFromPrompt } = useNFTStore();

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
      </form>
    </div>
  );
};

export default ChatInput;
