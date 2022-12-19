const hre = require("hardhat");

const {
  developmentChains,
  MOCK_V3_AGGREGATOR_DECIMALS,
  MOCK_V3_AGGREGATOR_INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (developmentChains.includes(hre.network.name)) {
    log("Local network detected! Deplooying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [MOCK_V3_AGGREGATOR_DECIMALS, MOCK_V3_AGGREGATOR_INITIAL_ANSWER],
    });
    log("Mocks deployed!");
    log("-------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
