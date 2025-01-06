require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "duk",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: ["8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"],
    },
    duk: {
      url: "http://192.168.3.104:8545",
      accounts: ["8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"],
    },
    hardhat: {
      gas: 9007199254740891, // Increase the gas limit
      blockGasLimit: 9007199254740991, // Increase the block gas limit
      initialBaseFeePerGas: 0, // Set the base fee per gas to 0
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        accountsBalance: "99000000000000000000000000" // Set initial balance to 9,000,000 ETH
      }
    }
  }
};
