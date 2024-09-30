"use client";

import { ConnectButton, useSendTransaction, useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "./client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";

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
              name: "Bet Form",
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
          <InputForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleButtonClick={handleButtonClick}
          />
        )}
      </div>
    </main>
  );
}

