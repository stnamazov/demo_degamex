// Demo build: no wallet / no Web3Modal.
import { defineChain } from 'viem'

export const blastMainnet = defineChain({
    id: 81457,
    name: 'Blast Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.blast.io'] },
        public: { http: ['https://rpc.blast.io'] },
    },
    blockExplorers: {
        default: { name: 'Blastscan', url: 'https://blastscan.io' },
        public: { name: 'Blastscan', url: 'https://blastscan.io' },
    },
})