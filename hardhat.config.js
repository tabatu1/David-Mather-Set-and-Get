/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

// Import the task file
require("./tasks/Call_Setter_And_Setter_ethers.js");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.6",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
}
