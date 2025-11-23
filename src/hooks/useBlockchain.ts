import { useWriteContract, useReadContract } from 'wagmi';
import { useContract } from './useContract';
import { ItemType, ItemStatus, BlockchainItem } from '@/types';
import { toast } from 'sonner';

export function useBlockchain() {
  const { address, abi } = useContract();
  const { writeContractAsync } = useWriteContract();

  const createItem = async (itemType: ItemType, metadataCid: string) => {
    if (!address) {
      toast.error('Contract not deployed on this network');
      return;
    }

    try {
      const typeValue = itemType === 'LOST' ? 0 : 1;
      
      const hash = await writeContractAsync({
        address: address as `0x${string}`,
        abi,
        functionName: 'createItem',
        args: [typeValue, metadataCid],
      } as any);

      toast.success('Item created on blockchain!');
      return hash;
    } catch (error) {
      console.error('Error creating item:', error);
      toast.error('Failed to create item on blockchain');
      throw error;
    }
  };

  const markAsReturned = async (itemId: string) => {
    if (!address) {
      toast.error('Contract not deployed on this network');
      return;
    }

    try {
      const hash = await writeContractAsync({
        address: address as `0x${string}`,
        abi,
        functionName: 'markAsReturned',
        args: [BigInt(itemId)],
      } as any);

      toast.success('Item marked as returned!');
      return hash;
    } catch (error) {
      console.error('Error marking as returned:', error);
      toast.error('Failed to mark item as returned');
      throw error;
    }
  };

  const claimItem = async (itemId: string) => {
    if (!address) {
      toast.error('Contract not deployed on this network');
      return;
    }

    try {
      const hash = await writeContractAsync({
        address: address as `0x${string}`,
        abi,
        functionName: 'claimItem',
        args: [BigInt(itemId)],
      } as any);

      toast.success('Item claimed successfully!');
      return hash;
    } catch (error) {
      console.error('Error claiming item:', error);
      toast.error('Failed to claim item');
      throw error;
    }
  };

  return {
    createItem,
    markAsReturned,
    claimItem,
  };
}

export function useGetItem(itemId: string | undefined) {
  const { address, abi } = useContract();

  const { data, isLoading, error } = useReadContract({
    address: address as `0x${string}` | undefined,
    abi,
    functionName: 'getItem',
    args: itemId ? [BigInt(itemId)] : undefined,
  } as any);

  if (!data) return { item: null, isLoading, error };

  const [itemType, metadataCid, owner, status, timestamp] = data as [number, string, string, number, bigint];

  const item: BlockchainItem = {
    itemId: itemId || '0',
    itemType: itemType === 0 ? 'LOST' : 'FOUND',
    metadataCid,
    owner,
    status: ['PENDING', 'APPROVED', 'RETURNED', 'CLAIMED'][status] as ItemStatus,
    timestamp: Number(timestamp),
  };

  return { item, isLoading, error };
}
