import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
const dotenv = require("dotenv")
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
