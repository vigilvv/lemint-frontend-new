import { create } from "zustand";
import { NFTMetadata, MediaType, ChatMessage } from "../types";
import { DEFAULT_NFT } from "../services/mockData";
import {
  generateMedia,
  mintNFT,
  // getChatResponse,
  // uploadMedia,
} from "../services/api";

interface NFTState {
  currentNFT: NFTMetadata;
  isGenerating: boolean;
  isMinting: boolean;
  chatMessages: ChatMessage[];
  mintSuccess: boolean | null;
  txHash: string | null;
  mintStatus: string | null;

  // Actions
  setMediaType: (mediaType: MediaType) => void;
  setMediaUrl: (url: string) => void;
  // uploadFile: (file: File) => Promise<void>;
  generateFromPrompt: (prompt: string) => Promise<void>;
  mintCurrentNFT: (
    nftName: string,
    nftSymbol: string,
    recipientAddress: string
  ) => Promise<void>;
  // addChatMessage: (
  //   content: string,
  //   role: "user" | "assistant"
  // ) => Promise<void>;
  resetMintStatus: () => void;
}

export const useNFTStore = create<NFTState>((set, get) => ({
  currentNFT: { ...DEFAULT_NFT },
  isGenerating: false,
  isMinting: false,
  chatMessages: [],
  mintSuccess: null,
  txHash: null,
  mintStatus: null,

  setMediaType: (mediaType) =>
    set((state) => ({
      currentNFT: { ...state.currentNFT, mediaType },
    })),

  setMediaUrl: (mediaUrl) =>
    set((state) => ({
      currentNFT: { ...state.currentNFT, mediaUrl },
    })),

  // uploadFile: async (file) => {
  //   try {
  //     const mediaUrl = await uploadMedia(file);
  //     set((state) => ({
  //       currentNFT: { ...state.currentNFT, mediaUrl },
  //     }));
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // },

  generateFromPrompt: async (prompt) => {
    set({ isGenerating: true });
    try {
      // const mediaUrl = await generateMedia(prompt, get().currentNFT.mediaType);
      const mediaUrl = await generateMedia(prompt, "image"); // "image" for now
      set((state) => ({
        currentNFT: { ...state.currentNFT, mediaUrl },
        isGenerating: false,
      }));
    } catch (error) {
      console.error("Error generating media:", error);
      set({ isGenerating: false });
    }
  },

  mintCurrentNFT: async (nftName, nftSymbol, recipientAddress) => {
    const { currentNFT } = get();

    if (!currentNFT.mediaUrl) {
      console.error("Cannot mint without media");
      return;
    }

    set({ isMinting: true });

    const sessionId = crypto.randomUUID();

    // Set mint status polling first
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_SERVER
          }/api/mint-status?sessionId=${sessionId}`
        );
        if (res.status === 404) {
          clearInterval(interval);
          return;
        }
        const data = await res.json();
        if (data.status === "Mint success.") {
          clearInterval(interval);
        } else {
          console.log(data);
          set(() => ({ mintStatus: data.status }));
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
      }
    }, 10000); // this has to be high because /mint has to be fired first

    try {
      const { success, txHash } = await mintNFT(
        currentNFT,
        nftName,
        nftSymbol,
        recipientAddress,
        sessionId
      );
      console.log("Mint success: ", success);
      set({
        isMinting: false,
        mintSuccess: true,
        txHash,
      });
    } catch (error) {
      console.error("Error minting NFT:", error);
      set({
        isMinting: false,
        mintSuccess: false,
      });
    }
  },

  // addChatMessage: async (content, role) => {
  //   const newMessage: ChatMessage = {
  //     id: Date.now().toString(),
  //     content,
  //     role,
  //     timestamp: Date.now(),
  //   };

  //   set((state) => ({
  //     chatMessages: [...state.chatMessages, newMessage],
  //   }));

  //   if (role === "user") {
  //     // Get AI response
  //     const response = await getChatResponse([
  //       ...get().chatMessages,
  //       newMessage,
  //     ]);
  //     const aiMessage: ChatMessage = {
  //       id: (Date.now() + 1).toString(),
  //       content: response,
  //       role: "assistant",
  //       timestamp: Date.now() + 1,
  //     };

  //     set((state) => ({
  //       chatMessages: [...state.chatMessages, aiMessage],
  //     }));

  //     // If the message seems like a generation request, trigger generation
  //     if (
  //       content.toLowerCase().includes("create") ||
  //       content.toLowerCase().includes("generate") ||
  //       content.toLowerCase().includes("make")
  //     ) {
  //       get().generateFromPrompt(content);
  //     }
  //   }
  // },

  resetMintStatus: () =>
    set({ mintSuccess: null, txHash: null, mintStatus: null }),
}));
