"use client";
import { useState } from "react";

export default function Home() {
  const [selectedChain, setSelectedChain] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const handleSubmit = () => {
    console.log("Chain:", selectedChain);
    console.log("Contract Address:", contractAddress);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg">
        {/* Chain Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Chain</label>
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Choose a chain --</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="bsc">Binance Smart Chain</option>
            <option value="base">Base</option>
            <option value="sui">Sui</option>
          </select>
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Address</label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
