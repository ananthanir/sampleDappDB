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
  }
};
