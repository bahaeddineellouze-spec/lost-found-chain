import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, polygon, polygonMumbai } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

// Contract addresses (update these with your deployed contract addresses)
export const CONTRACT_ADDRESSES = {
  [mainnet.id]: '0x0000000000000000000000000000000000000000',
  [sepolia.id]: '0x0000000000000000000000000000000000000000',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [polygonMumbai.id]: '0x0000000000000000000000000000000000000000',
};

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, sepolia, polygon, polygonMumbai],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [polygon.id]: http(),
      [polygonMumbai.id]: http(),
    },
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '',
    appName: 'Lost & Found dApp',
    appDescription: 'Decentralized Lost & Found application',
    appUrl: 'https://lostandfound.app',
    appIcon: 'https://lostandfound.app/icon.png',
  })
);
