import { NFTMetadata } from '../types';

export const DEFAULT_NFT: NFTMetadata = {
  creator: '@username',
  mediaType: 'image',
  mintPrice: 0.2,
  generatePrice: 0.5,
};

export const MOCK_GENERATIONS = {
  image: [
    'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  music: [
    'https://example.com/music1.mp3',
    'https://example.com/music2.mp3',
    'https://example.com/music3.mp3'
  ],
  video: [
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
    'https://example.com/video3.mp4'
  ]
};

export const mockGenerateResponse = (prompt: string, mediaType: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      // Return a random media URL based on the type
      const mediaArray = MOCK_GENERATIONS[mediaType as keyof typeof MOCK_GENERATIONS] || MOCK_GENERATIONS.image;
      const randomIndex = Math.floor(Math.random() * mediaArray.length);
      resolve(mediaArray[randomIndex]);
    }, 1500);
  });
};

export const mockMintResponse = (metadata: NFTMetadata) => {
  return new Promise<{ success: boolean; txHash: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        txHash: '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
      });
    }, 2000);
  });
};