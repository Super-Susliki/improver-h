# Improver-H API

This is the backend API service built with NestJS for the ETHKyiv2025 hackathon .

## Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- PostgreSQL database

## Environment Variables

Create a `.env` file in the root of the API project with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api
API_URL=http://localhost:3000
PINO_LOG_LEVEL=info

# CORS
CORS_ORIGINS=http://localhost:5173

# Cookies and Security
COOKIE_SECRET=your-secure-cookie-secret-min-32-chars

# Privy Authentication
PRIVY_APP_ID=your-privy-app-id
PRIVY_SECRET=your-privy-secret

# Database
DATABASE=postgresql://user:password@localhost:5432/dbname

# Blockchain
BLOCKCHAIN_RPC_URL=https://base-sepolia.drpc.org
BLOCKCHAIN_PRIVATE_KEY=your-private-key
```

## Getting started

```bash
# Install all dependencies
yarn install


# Apply migration and generate prisma types
yarn db:migrate:dev

# Seed database with initial values
yarn db:seed

# Start API in developer mode
yarn dev
```

## Project Structure

The API is organized into several feature modules:

- `auth/` - Authentication and authorization using Privy
- `users/` - User management and profiles
- `merchants/` - Merchant management and operations
- `stores/` - Store management and configuration
- `loyalty/` - Loyalty program and rewards system
- `blockchain/` - Blockchain interactions and smart contract integration
- `queue/` - Background job processing and task queues
- `data-access/` - Database access layer using Prisma
- `config/` - Environment variables parsing and validation
- `logger/` - Application logging and monitoring
- `guards/` - Request guards and middleware
- `utils/` - Shared utilities and helper functions

Each module follows NestJS best practices and contains its own:

- Controllers for handling HTTP requests
- Services for business logic
- DTOs for data validation
- Entities for database models
- Guards for route protection
