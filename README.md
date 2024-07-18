# Wagmi + RainbowKit + Web3.js Integration

This repository demonstrates the integration of RainbowKit for wallet connection and Wagmi for interacting with Ethereum smart contracts using React hooks. It has two branches:

1. **main**: Uses RainbowKit and Wagmi hooks for both reading from and writing to contracts.
2. **rainbow-wagmi-web3.js**: Uses RainbowKit for wallet connection and Web3.js for contract interactions, utilizing Wagmi client as a provider.

## Branches

### main

The `main` branch uses RainbowKit to connect to wallets such as MetaMask and Trust Wallet and leverages Wagmi React hooks for interacting with smart contracts. 

- **Deployed Link**: [rain-wagmi.netlify.app](https://rain-wagmi.netlify.app/)

#### Features

- Connect wallets using RainbowKit.
- Read from and write to Ethereum smart contracts using Wagmi hooks.
- Easy integration with various Ethereum-based wallets.

### rainbow-wagmi-web3.js

The `rainbow-wagmi-web3.js` branch uses RainbowKit to connect to wallets and Web3.js for contract interactions. It uses the Wagmi client as a provider, enabling a streamlined approach to both reading and writing to contracts.

- **Deployed Link**: [rainbow-wagmi-web3js.netlify.app](https://rainbow-wagmi-web3js.netlify.app/)

#### Features

- Connect wallets using RainbowKit.
- Use Web3.js for reading from and writing to Ethereum smart contracts.
- Leverage Wagmi client for enhanced provider management.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js and npm installed on your local machine.
- A modern web browser to view the app.

### Installation

Clone the repository and navigate to the desired branch:

```bash
git clone https://github.com/m-Jawa-d/wagmi-rainbowkit.git
cd wagmi-rainbowkit
git checkout main # or rainbow-wagmi-web3.js
npm install
```
Running the App
Start the development server:
```bash
npm start
```
Open your web browser and navigate to http://localhost:3000 to see the app in action.
## Usage

### Connecting Wallet

1. Click on the "Connect Wallet" button.
2. Select your preferred wallet (e.g., MetaMask, WalletConnect).
3. Approve the connection in your wallet.

### Interacting with Contracts

#### main Branch

- **Reading Data**: Use Wagmi hooks to read data from contracts.
- **Writing Data**: Use Wagmi hooks to send transactions and interact with contracts.

#### rainbow-wagmi-web3.js Branch

- **Reading Data**: Use Web3.js to call contract methods.
- **Writing Data**: Use Web3.js to send transactions and interact with contracts, using Wagmi client as a provider.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Acknowledgments

- [RainbowKit](https://www.rainbowkit.com/)
- [Wagmi](https://wagmi.sh/)
- [Web3.js](https://web3js.readthedocs.io/)

A start to this repo would be great 🥹
