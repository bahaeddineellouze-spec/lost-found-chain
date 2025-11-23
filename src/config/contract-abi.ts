// Lost & Found Smart Contract ABI
export const LOST_FOUND_ABI = [
  {
    inputs: [
      { internalType: 'uint8', name: 'itemType', type: 'uint8' },
      { internalType: 'string', name: 'metadataCid', type: 'string' },
    ],
    name: 'createItem',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'itemId', type: 'uint256' }],
    name: 'getItem',
    outputs: [
      { internalType: 'uint8', name: 'itemType', type: 'uint8' },
      { internalType: 'string', name: 'metadataCid', type: 'string' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint8', name: 'status', type: 'uint8' },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'itemId', type: 'uint256' }],
    name: 'markAsReturned',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'itemId', type: 'uint256' }],
    name: 'claimItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'getItemsByOwner',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'itemId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: false, internalType: 'uint8', name: 'itemType', type: 'uint8' },
      { indexed: false, internalType: 'string', name: 'metadataCid', type: 'string' },
    ],
    name: 'ItemCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'itemId', type: 'uint256' },
      { indexed: false, internalType: 'uint8', name: 'status', type: 'uint8' },
    ],
    name: 'ItemStatusUpdated',
    type: 'event',
  },
] as const;
