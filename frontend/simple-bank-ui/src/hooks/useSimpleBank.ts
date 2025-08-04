import { simpleBankConfig } from "@/lib/contract";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";

export const useSimpleBank = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [depositing, setDepositing] = useState(false);

  console.log("useSimpleBank", useAccount(), address);

  const deposit = async (amountEth: string) => {
    setDepositing(true);
    try {
      await writeContractAsync({
        ...simpleBankConfig,
        functionName: "deposit",
        value: parseEther(amountEth),
      });
    } finally {
      setDepositing(false);
    }
  };

  const withdraw = async (amountEth: string) => {
    await writeContractAsync({
      ...simpleBankConfig,
      functionName: "withdraw",
      args: [parseEther(amountEth)],
    });
  };

  const {
    data: balance,
    refetch,
    isLoading,
  } = useReadContract({
    ...simpleBankConfig,
    functionName: "getBalance",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  return {
    deposit,
    withdraw,
    balance,
    refetchBalance: refetch,
    depositing,
    isPending,
    isConnected,
    address,
    isLoading,
  };
};
