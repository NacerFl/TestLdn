require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@eaglewalker/hardhat-cronoscan");
require('dotenv').config();

require("hardhat-gas-reporter");
// const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  "chat habit know cloth lonely diagram bargain antenna boss velvet embody employ",
  "https://evm-t3.cronos.org/:8545"
);
// const web3 = new Web3(provider);

// const accounts = await web3.eth.getAccounts(console.log);

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  networks: {
    hardhat: {
      gas: 1000000,
      gasPrice: 8750000000,
    },
    testnet: {
      accounts: ['29a83146579af69714e5c07964eb63ff77e349258e214d798fc0399adf9d77c5'],
      url: 'https://evm-t3.cronos.org',
      network_id: "338",
      skipDryRun: true
    },
    // testnet: {
    //   url: "https://evm-t3.cronos.org/:8545",
    //   accounts: getHDWallet(),
    // },
  },
  solidity: {
    version: "0.8.4",

    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    gasReporter: {
      currency: 'CHF',
      gasPrice: 21
    },
    
  },
  
};