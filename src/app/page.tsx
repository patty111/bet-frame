"use client";

import { ConnectButton, useSendTransaction, useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "./client";
import { useState, useEffect } from "react";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    initiator: "",
    opponent: "",
    arbitrator: "",
    betAsset: "",
    betAmount: "",
    claim: "",
  });

  const [isConnected, setIsConnected] = useState(false);

  const activeAccount = useActiveAccount();

  useEffect(() => {
    if (activeAccount) {
      setFormData((prevData) => ({ ...prevData, initiator: activeAccount?.address }));
      setIsConnected(true);
    }
  }, [activeAccount]);

  const contract = getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    chain: sepolia,
    client,
  });

  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { initiator, opponent, arbitrator, betAsset, betAmount, claim } = formData;

    const transaction = prepareContractCall({
      contract,
      method: "constructor",
      params: [initiator, opponent, arbitrator, betAsset, betAmount, claim],
    });

    await sendTx(transaction);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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

        {isConnected && (
          <div className="flex justify-center mt-20">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleButtonClick}
            >
              Create Bet
            </button>
          </div>
        )}

        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl mb-4">Create Bet</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Your Address</label>
                  <input
                    type="text"
                    name="initiator"
                    value={formData.initiator}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-black"
                    readOnly // Make the input read-only since it's the connected wallet address
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Opponent's Address</label>
                  <input
                    type="text"
                    name="opponent"
                    value={formData.opponent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Arbitrator Address</label>
                  <input
                    type="text"
                    name="arbitrator"
                    value={formData.arbitrator}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Bet Asset Address</label>
                  <input
                    type="text"
                    name="betAsset"
                    value={formData.betAsset}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Bet Amount</label>
                  <input
                    type="number"
                    name="betAmount"
                    value={formData.betAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Claim</label>
                  <input
                    type="text"
                    name="claim"
                    value={formData.claim}
                    onChange={handleInputChange}
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