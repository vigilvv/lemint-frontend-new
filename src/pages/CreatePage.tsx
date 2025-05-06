import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNFTStore } from "../store/nftStore";
import Navigation from "../components/layout/Navigation";
import InfoPopup from "../components/common/InfoPopup";
import RadioGroup from "../components/common/RadioGroup";
import Button from "../components/common/Button";
import MediaPlaceholder from "../components/common/MediaPlaceholder";
import ChatInput from "../components/common/ChatInput";
import { MediaType } from "../types";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useUpProvider } from "../components/upProvider";

import { ERC725 } from "@erc725/erc725.js";
import erc725schema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

//========== Lukso related
// import { parseUnits } from "viem";
// import { waitForTransactionReceipt } from "viem/actions";

const IPFS_GATEWAY = "https://api.universalprofile.cloud/ipfs/";

//============================================================

const CreatePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [fullName, setFullName] = useState("username");

  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");

  const [prompt, setPrompt] = useState("");

  //========== Lukso related

  // const { client, accounts, contextAccounts, walletConnected } =
  //   useUpProvider();

  const { accounts, contextAccounts } = useUpProvider();

  console.log("accounts[0] : ", accounts[0]);
  console.log("contextAccounts[0] : ", contextAccounts[0]);

  //====== Get full name:
  useEffect(() => {
    async function fetchFullNameImage() {
      if (!accounts) return;

      try {
        const config = { ipfsGateway: IPFS_GATEWAY };
        const rpcEndpoint = "https://rpc.testnet.lukso.network";
        const profile = new ERC725(
          erc725schema,
          accounts[0],
          rpcEndpoint,
          config
        );
        const fetchedData = await profile.fetchData("LSP3Profile");

        if (
          fetchedData?.value &&
          typeof fetchedData.value === "object" &&
          "LSP3Profile" in fetchedData.value
        ) {
          const fullName = fetchedData.value.LSP3Profile.name;

          setFullName(fullName);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }

    fetchFullNameImage();
  }, [accounts]);

  // console.log(contextAccounts[0])
  // const [amount, setAmount] = useState<number>(0.5);
  // const [isSendingToken, setIsSendingToken] = useState(false);

  // const sendToken = useCallback(async () => {
  //   if (!client || !walletConnected || !amount) {
  //     return;
  //   }

  //   try {
  //     setIsSendingToken(true);
  //     const tx = await client.sendTransaction({
  //       account: accounts[0] as `0x${string}`,
  //       to: "0x5f5911b3204b2f3a655045af5B2de48DC1EBB11d" as `0x${string}`, // TESTNET address
  //       value: parseUnits(amount.toString(), 18),
  //       chain: client.chain,
  //     });

  //     // Wait for transaction confirmation
  //     await waitForTransactionReceipt(client, { hash: tx });

  //     console.log("Amount sent");

  //     // Reset amount after successful transaction
  //     setAmount(0);
  //   } catch (err) {
  //     console.error("Transaction failed:", err);
  //   } finally {
  //     setIsSendingToken(false);
  //   }
  // }, [accounts, amount, client, walletConnected]);

  // const sendTokenKeyPress = useCallback(
  //   (e: React.KeyboardEvent) => {
  //     if (e.key === "Enter" || e.key === " ") {
  //       sendToken();
  //     }
  //   },
  //   [sendToken]
  // );

  // const handleMint = async () => {
  // const data = await deployNFTCollection("Test ABC", "TABC");
  // if (!data) {
  //   console.error("Failed to deploy contract");
  // } else {
  //   const { contractAddress, tokenId } = data;
  //   console.log("Contract address: ", contractAddress);
  //   console.log("TokenId: ", tokenId);
  // }
  // setContractAddress(address);
  // };

  //============================================================

  const {
    currentNFT,
    setMediaType,
    uploadFile,
    mintCurrentNFT,
    isMinting,
    isGenerating,
    mintSuccess,
    txHash,
    resetMintStatus,
    generateFromPrompt,
  } = useNFTStore();

  // useEffect(() => {});

  //============================================================

  //============================================================

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleMint = async () => {
    if (!currentNFT.mediaUrl) return;

    await mintCurrentNFT(nftName, nftSymbol, accounts[0]);
    if (mintSuccess) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        resetMintStatus();
      }, 5000);
    }
  };

  const handleGenerate = async () => {
    console.log("generating");
    if (!prompt.trim() || isGenerating) return;

    await generateFromPrompt(prompt);
  };

  const mediaTypeOptions = [
    { value: "image" as MediaType, label: "Image" },
    // { value: "music" as MediaType, label: "Music" },
    // { value: "video" as MediaType, label: "Video" },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6">
        <div className="flex items-center justify-between mb-2">
          <Navigation />
          <InfoPopup />
        </div>
      </div>

      <div className="flex-1 px-6 pb-6">
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-4">
              <RadioGroup
                name="mediaType"
                options={mediaTypeOptions}
                value={currentNFT.mediaType}
                onChange={setMediaType}
              />
            </div>

            <div className="flex-1">
              <MediaPlaceholder
                mediaType={currentNFT.mediaType}
                mediaUrl={currentNFT.mediaUrl}
                // creator={currentNFT.creator}
                creator={fullName}
                onAddMedia={handleFileUpload}
              />

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept={
                  currentNFT.mediaType === "image"
                    ? "image/*"
                    : currentNFT.mediaType === "music"
                    ? "audio/*"
                    : "video/*"
                }
              />
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex-1">
              <ChatInput className="mb-6" setPrompt={setPrompt} />

              <div className="flex space-x-3">
                <Button
                  className="flex-1"
                  variant="secondary"
                  isLoading={isGenerating}
                  disabled={isGenerating}
                  price={undefined}
                  onClick={handleGenerate}
                >
                  Generate
                </Button>

                <Button
                  className="flex-1"
                  isLoading={isMinting}
                  disabled={!currentNFT.mediaUrl || isMinting}
                  onClick={handleMint}
                  price={undefined}
                >
                  Mint
                </Button>
              </div>

              {isGenerating && (
                <p className="mt-2 text-xs text-gray-500">
                  Please be patient. This will take 2-3 mins.
                </p>
              )}

              {/* NFT Name and Symbol Inputs */}
              {currentNFT.mediaUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-3"
                >
                  <div>
                    <label
                      htmlFor="nft-name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      NFT Name{" "}
                      <span className="text-xs text-red-400">*required</span>
                    </label>
                    <input
                      type="text"
                      id="nft-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="My Awesome NFT"
                      value={nftName}
                      onChange={(e) => setNftName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nft-symbol"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      NFT Symbol{" "}
                      <span className="text-xs text-red-400">*required</span>
                    </label>
                    <input
                      type="text"
                      id="nft-symbol"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="AWESOME"
                      value={nftSymbol}
                      onChange={(e) => setNftSymbol(e.target.value)}
                      maxLength={10}
                    />
                  </div>
                </motion.div>
              )}

              {/* Success alert */}
              {showSuccessAlert && txHash && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-start p-3 mt-4 border border-green-200 rounded-lg bg-green-50"
                >
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      NFT minted successfully!
                    </p>
                    <p className="text-xs text-green-600">
                      {/* Transaction: {txHash.substring(0, 10)}...
                      {txHash.substring(txHash.length - 6)} */}
                      Check the "Collectibles" tab in your profile!
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error alert */}
              {mintSuccess === false && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-start p-3 mt-4 border border-red-200 rounded-lg bg-red-50"
                >
                  <AlertCircle
                    className="text-red-500 mr-2 flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Failed to mint NFT
                    </p>
                    <p className="text-xs text-red-600">
                      Please try again or check your wallet connection.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
