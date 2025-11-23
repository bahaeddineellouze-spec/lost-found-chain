import { useAccount, useChainId } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/config/web3';
import { LOST_FOUND_ABI } from '@/config/contract-abi';

export function useContract() {
  const chainId = useChainId();
  const { address } = useAccount();

  const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];

  return {
    address: contractAddress,
    abi: LOST_FOUND_ABI,
    chainId,
    userAddress: address,
  };
}
