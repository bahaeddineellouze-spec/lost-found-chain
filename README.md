# Lost & Found dApp

A decentralized Lost & Found application built with React, Web3, and IPFS. Report lost or found items, leverage blockchain verification, and use AI-powered matching to reunite items with their owners.

## 🚀 Features

- **Blockchain Verification**: All items are registered on the blockchain for transparency and immutability
- **IPFS Storage**: Item metadata and images are stored on IPFS via Pinata
- **Wallet Integration**: Connect with MetaMask, WalletConnect, and other Web3 wallets
- **AI Matching**: (Coming soon) Advanced algorithms to match lost and found items
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Dark Mode**: Built-in dark mode support

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Web3**: Wagmi, ConnectKit, Ethers.js
- **State Management**: Zustand
- **Storage**: IPFS (via Pinata)
- **HTTP Client**: Axios

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 16+ installed
- A Pinata account for IPFS storage ([Sign up here](https://app.pinata.cloud/))
- A WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com/))
- A Web3 wallet (MetaMask, etc.)

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd lost-found-dapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual keys:

```env
# Pinata IPFS Configuration
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
VITE_PINATA_JWT=your_pinata_jwt_token

# WalletConnect Configuration
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

**Getting Pinata Credentials:**
1. Sign up at [Pinata](https://app.pinata.cloud/)
2. Go to API Keys in your dashboard
3. Create a new API key with upload permissions
4. Copy the API Key, Secret Key, and JWT

**Getting WalletConnect Project ID:**
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your Project ID

### 4. Update contract addresses

Edit `src/config/web3.ts` and update the `CONTRACT_ADDRESSES` object with your deployed smart contract addresses:

```typescript
export const CONTRACT_ADDRESSES = {
  [mainnet.id]: '0xYourContractAddress',
  [sepolia.id]: '0xYourSepoliaContractAddress',
  // ... other networks
};
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 📦 Smart Contract

The dApp expects a smart contract with the following interface:

```solidity
// Simplified interface
function createItem(uint8 itemType, string memory metadataCid) external returns (uint256);
function getItem(uint256 itemId) external view returns (uint8, string memory, address, uint8, uint256);
function markAsReturned(uint256 itemId) external;
function claimItem(uint256 itemId) external;
function getItemsByOwner(address owner) external view returns (uint256[] memory);
```

See `src/config/contract-abi.ts` for the full ABI.

## 🎯 Usage

### Report a Lost Item
1. Connect your wallet
2. Navigate to "Report Lost"
3. Fill in item details and upload an image
4. Submit to create an IPFS record and blockchain entry

### Report a Found Item
1. Connect your wallet
2. Navigate to "Report Found"
3. Fill in item details and upload an image
4. Submit to help reunite the item with its owner

### View Your Dashboard
- See all items you've reported (lost and found)
- Check the status of each item
- Track potential matches

### Claim an Item
1. Browse found items
2. Click on a match
3. Submit a claim on the blockchain

## 🌐 Deployment

### Build for production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Deploy to Lovable

You can easily deploy this project using Lovable:

1. Open your [Lovable Project](https://lovable.dev/projects/77940b36-21a2-47f2-85fe-393f383dd31c)
2. Click Share → Publish

Or deploy to other platforms like Vercel, Netlify, or any static hosting service.

## 🔐 Security Notes

- Never commit your `.env` file
- Keep your private keys secure
- The smart contract should include proper access controls
- Always verify contract addresses before transactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Project URL](https://lovable.dev/projects/77940b36-21a2-47f2-85fe-393f383dd31c)
- [Pinata Documentation](https://docs.pinata.cloud/)
- [Wagmi Documentation](https://wagmi.sh/)
- [ConnectKit Documentation](https://docs.family.co/connectkit)

## 💡 Future Enhancements

- [ ] Implement AI-powered image matching using CLIP model
- [ ] Add geolocation-based searching
- [ ] Implement reward system for finders
- [ ] Add notification system for matches
- [ ] Multi-language support
- [ ] Mobile app version
