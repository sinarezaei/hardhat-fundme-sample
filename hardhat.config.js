require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url:
        process.env.GOERLI_RPC_URL || "https://eth-goerli.public.blastapi.io",
      accounts: [process.env.GOERLI_PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      // accounts: Thanks hardhat!
    },
  },
  // solidity: "0.8.8",
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "ETH", // for gas-usd conversion price of token is used from CMC
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
