"use client";

import { useSimpleBank } from "@/hooks/useSimpleBank";
import { useState } from "react";
import { formatEther } from "viem";

const Dashboard = () => {
  const {
    deposit,
    withdraw,
    address,
    balance,
    isConnected,
    refetchBalance,
    depositing,
    isLoading,
  } = useSimpleBank();
  const [amount, setAmount] = useState("0.01");
  if (!isConnected) return <p>Please connect your wallet.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto text-center space-y-8">
      <h2 className="text-3xl font-semibold">
        Welcome {address ? address.slice(0, 10) + "..." : ""}
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        {isLoading ? (
          <p className="text-gray-500">Loading balance...</p>
        ) : (
          <p className="text-xl font-bold">
            Balance: {formatEther(balance || 0n)} ETH
          </p>
        )}
      </div>

      {/* <BankActions /> */}
    </div>
  );
};

export default Dashboard;
