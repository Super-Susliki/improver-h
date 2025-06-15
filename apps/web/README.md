# Hackathon 2025 Frontend

This is the frontend application for the ETHKyiv2025 hackathon project. It's built with React, TypeScript, and Vite

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

## Environment Variables

Create a `.env` file in the root of the frontend directory with the following variables:

```env

# Privy
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_PRIVY_CLIENT_ID=your_privy_client_id

# Subgraph
VITE_SUBGRAPH_API_KEY=your_subgraph_api_key
VITE_SUBGRAPH_URL=your_subgraph_graphql_endpoint

# Api
VITE_API_BASE_URL=your_api_http_endpoint
```

## Installation

```bash
yarn install
```

## Development

To start the development server:

```bash
yarn dev
```

This will start the Vite development server, typically at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
yarn build
```

The build output will be in the `dist` directory.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Create production build
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn typecheck` - Run TypeScript type checking

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Apollo Client
- Privy
- Viem
- React Query
- Zustand (State Management)
