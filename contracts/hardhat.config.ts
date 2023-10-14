import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
const dotenv = require("dotenv")
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: {
      scrollSepolia: "D62920783A4311EE9D6600155D570C742E"
    },
    customChains: [{
      network: "scrollSepolia",
      chainId: 534351,
      urls: {
        apiURL: "https://api-sepolia.scrollscan.dev/api",
        browserURL: "https://sepolia.scrollscan.dev"
      }
    }]
  },
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
