"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { useState } from "react";
import {
  useContractWrite,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  // const { contract } = useContract("");
  // const { mutateAsync, isLoading, error } = useContractWrite(
  //   contract,
  //   "setName",
  // );

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
        </div>

        <div className="flex justify-center mt-20">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Create Bet
          </button>
        </div>

        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl mb-4">Create Bet</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Your Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Challenger's Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Arbitrator Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Bet Asset Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Bet Amount</label>
                  <input
                    type="float"
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Claim</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Initiator</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    onClick={handleButtonClick}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Bet 
        <span className="text-zinc-300 inline-block mx-1">  +  </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Frame </span>
      </h1>

      <p className="text-zinc-300 text-base">
      </p>
    </header>
  );
}