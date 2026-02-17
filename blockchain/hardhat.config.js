require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { PRIVATE_KEY, HELA_RPC_URL } = process.env;

module.exports = {
  solidity: "0.8.19",

  networks: {
    hardhat: {},

    hela: {
      url: HELA_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
  },
};
