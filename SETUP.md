# Quick Setup Guide

## Required Configuration

To run this Lost & Found dApp, you need to set up two services:

### 1. Pinata (for IPFS storage) 🔧

**Why?** All item images and metadata are stored on IPFS using Pinata.

**Steps:**
1. Go to https://app.pinata.cloud/ and sign up
2. Navigate to **API Keys** in your dashboard
3. Click **New Key** and enable:
   - `pinFileToIPFS`
   - `pinJSONToIPFS`
4. Copy your credentials:
   - API Key
   - API Secret
   - JWT Token

### 2. WalletConnect Project ID 🔧

**Why?** Required for wallet connection functionality.

**Steps:**
1. Visit https://cloud.walletconnect.com/
2. Create a new project
3. Copy your **Project ID**

### 3. Create .env file

In your project root, create a `.env` file:

```env
# Pinata Configuration
VITE_PINATA_API_KEY=your_api_key_here
VITE_PINATA_SECRET_KEY=your_secret_key_here
VITE_PINATA_JWT=your_jwt_token_here

# WalletConnect
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 4. Deploy Smart Contract (Optional for Testing)

The app includes mock blockchain interaction. For production:

1. Deploy the Lost & Found smart contract to your preferred network
2. Update contract addresses in `src/config/web3.ts`
3. Ensure the contract ABI matches `src/config/contract-abi.ts`

### 5. Start Development

```bash
npm install
npm run dev
```

## Testing Without Full Setup

You can test the UI without completing all setup:
- The app will show errors for IPFS uploads (need Pinata)
- Wallet connection will work if you add WalletConnect Project ID
- Blockchain transactions require deployed contract

## Architecture Overview

```
┌─────────────────┐
│   React App     │
│  (Vite + TS)    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐  ┌──────────┐
│ Wagmi │  │  Pinata  │
│  Web3 │  │  (IPFS)  │
└───┬───┘  └─────┬────┘
    │            │
    ▼            ▼
┌────────────────────┐
│  Smart Contract    │
│  (Blockchain)      │
└────────────────────┘
```

## Next Steps

1. ✅ Complete environment setup
2. ✅ Deploy smart contract (or use test mode)
3. ✅ Connect your wallet
4. ✅ Report your first lost/found item!

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review [Pinata Docs](https://docs.pinata.cloud/)
- Check [Wagmi Docs](https://wagmi.sh/)
