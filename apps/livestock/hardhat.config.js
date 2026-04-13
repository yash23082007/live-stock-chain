require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    polygonAmoy: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_URL || "https://rpc-amoy.polygon.technology/",
      accounts: process.env.BLOCKCHAIN_PRIVATE_KEY ? [process.env.BLOCKCHAIN_PRIVATE_KEY] : []
    }
  }
};
