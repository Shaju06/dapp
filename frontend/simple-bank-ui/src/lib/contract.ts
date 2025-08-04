import { getPublicClient } from "wagmi/actions";
import abi from "./abi.json";
import { contractAddress } from "./constants";
import { config } from "./wallet";

export const simpleBankConfig = {
  address: contractAddress,
  abi: abi,
  publicClient: getPublicClient(config),
} as const;
