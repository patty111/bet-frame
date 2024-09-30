import React from 'react';

interface InputFormProps {
  formData: any;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleButtonClick: () => void;
}

export default function InputForm({ formData, handleInputChange, handleSubmit, handleButtonClick }: InputFormProps) {
  return (
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
  );
}