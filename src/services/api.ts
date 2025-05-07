// import { ChatMessage, MediaType, NFTMetadata } from "../types";
import { MediaType, NFTMetadata } from "../types";
// import { mockGenerateResponse, mockMintResponse } from "./mockData";
import axios from "axios";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions
export const generateMedia = async (
  prompt: string,
  mediaType: MediaType
): Promise<string> => {
  // return mockGenerateResponse(prompt, mediaType);

  console.log("Generating image");
  console.log("Prompt: ", prompt, mediaType);

  try {
    const response = await axios.post(
      // "http://localhost:3000/api/generate-image",
      `${import.meta.env.VITE_BACKEND_SERVER}/api/generate-image`,
      {
        prompt,
      }
    );

    // console.log("ImageData: ", response.data.imageData);

    const dataUrl = `data:image/png;base64,${response.data.imageData}`;
    return dataUrl;
  } catch (err) {
    console.log("===== Image generation error =====");
    console.error(err);
    return "Error generating image";
  }
  // finally {
  //   setIsLoading(false);
  // }
};

export const mintNFT = async (
  metadata: NFTMetadata,
  nftName: string,
  nftSymbol: string,
  recipientAddress: string,
  sessionId: string
): Promise<{ success: boolean; txHash: string }> => {
  // return mockMintResponse(metadata);

  console.log("Minting NFT");

  console.log("sessionId: ", sessionId);
  try {
    // Then actual minitng

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/mint`,
      {
        metadata: {
          ...metadata,
          // name: "My Best NFT5",
          // symbol: "MBN",
          name: nftName,
          symbol: nftSymbol,
          description: "This is the best!",
        },
        recipientAddress: recipientAddress,
        sessionId,
      }
    );

    console.log(response.data);

    return {
      success: true,
      txHash:
        "0x" +
        Math.random().toString(16).slice(2) +
        Math.random().toString(16).slice(2),
    };

    // const {
    //   success,
    //   tokenId,
    //   tokenIdBytes32,
    //   imageUrl,
    //   metadataUrl,
    //   contractAddress,
    // } = response.data;
  } catch (err) {
    // console.log("Failed to save image to IPFS. Please try again.");
    console.log("Failed to mint. Please try again.");
    console.error(err);

    return {
      success: false,
      txHash:
        "0x" +
        Math.random().toString(16).slice(2) +
        Math.random().toString(16).slice(2),
    };
  }

  // 1. Save image to Pinata
  // console.log("Saving to Pinata");
  // try {
  //   const response = await axios.post(
  //     "http://localhost:3000/api/save-to-ipfs",
  //     {
  //       imageData: metadata.mediaUrl,
  //       fileName: "nft.png",
  //     }
  //   );

  //   console.log(response.data);

  //   const { ipfsHash, pinataUrl } = response.data;
  // } catch (err) {
  //   // console.log("Failed to save image to IPFS. Please try again.");
  //   console.log("Failed to mint. Please try again.");
  //   console.error(err);
  // }
  // finally {
  //   setIsSaving(false);
  // }

  //==============
};

// export const getChatResponse = async (
//   messages: ChatMessage[]
// ): Promise<string> => {
//   await delay(1000);

//   const lastMessage =
//     messages.length > 0 ? messages[messages.length - 1] : null;
//   const userPrompt = lastMessage?.content.toLowerCase() || "";

//   if (userPrompt.includes("create") || userPrompt.includes("generate")) {
//     return "I'll help you generate that. What kind of style or elements would you like to include?";
//   } else if (userPrompt.includes("help") || userPrompt.includes("how")) {
//     return "To create an NFT, first select the media type, then either upload your own or let me generate one for you using AI. When you're ready, click the mint button.";
//   } else {
//     return "I can help you create unique NFT content. Describe what you'd like to generate or ask for suggestions!";
//   }
// };

// export const uploadMedia = async (file: File): Promise<string> => {
//   await delay(1500);
//   // In a real app, we would upload to IPFS or similar
//   // Here we just create an object URL for preview
//   return URL.createObjectURL(file);
// };
