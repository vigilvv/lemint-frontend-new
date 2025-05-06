export type MediaType = "image" | "music" | "video";

export interface NFTMetadata {
  id?: string;
  name?: string;
  description?: string;
  creator: string;
  mediaType: MediaType;
  mediaUrl?: string;
  previewUrl?: string;
  mintPrice: number;
  generatePrice: number;
  symbol?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}
