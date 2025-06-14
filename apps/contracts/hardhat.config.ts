import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    basesepolia: {
      chainId: 84532,
      url: "https://base-sepolia.drpc.org",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
