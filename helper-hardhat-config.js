const networkConfig = {
  1: {
    name: "ethereum",
    ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  },
  5: {
    name: "goerli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  137: {
    name: "polygon",
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  },
};
const developmentChains = ["hardhat", "localhost"];
const MOCK_V3_AGGREGATOR_DECIMALS = 8;
const MOCK_V3_AGGREGATOR_INITIAL_ANSWER = 120000000000;

module.exports = {
  networkConfig,
  developmentChains,
  MOCK_V3_AGGREGATOR_DECIMALS,
  MOCK_V3_AGGREGATOR_INITIAL_ANSWER,
};
