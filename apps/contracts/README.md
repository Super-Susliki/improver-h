# Improver-Hs Smart Contracts

This directory contains the smart contracts for the ETHKyiv2025 hackathon project.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- Yarn

## Environment Setup

1. Create a `.env` file in the root of the contracts directory with the following variables:

```env
# Private key of the deployer wallet
PRIVATE_KEY=

# Etherscan API key for contract verification
ETHERSCAN_API_KEY=
```

## Installation

1. Install dependencies:

```bash
yarn install
```

## Development

### Compile Contracts

```bash
# For incremental builds
yarn compile

# For clean builds
yarn build

```

### Run Tests

```bash
yarn test
```

## Project Structure

- `contracts/` - Smart contract source files
- `test/` - Test files
- `ignition/` - Deployment scripts

## Deployment

The project uses Hardhat Ignition for deployment.

The deployment script is located in `ignition/modules/SignaturesSubmitter.ts`.

To deploy:

1. Ensure your `.env` file is properly configured
2. Run `yarn deploy --newtork basesepolia`

## Contract Verification

After deployment, you can verify your contracts on Etherscan using the Hardhat verify plugin. Make sure you have set the `ETHERSCAN_API_KEY` in your `.env` file.

To verify a contract run

```bash
yarn hardhat verify {deployed contract address} --network basesepolia {relayer address used in deployment}
```
