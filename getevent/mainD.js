import { Contract, JsonRpcProvider, Wallet } from "ethers";

const ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "examno",
        "type": "string"
      }
    ],
    "name": "getDataMap",
    "outputs": [
      {
        "internalType": "string[][]",
        "name": "",
        "type": "string[][]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const address = "0x5681495692C07a470B59b7Fb160B7a6d2CDB4A2E";

const provider = new JsonRpcProvider("http://192.168.3.104:8545");
const wallet = new Wallet('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', provider);

const instance = new Contract(address, ABI, wallet);

console.log("Getting data from blockchain");

console.time('getLogsDuration');

const trx = await instance.getDataMap("A");

console.log(trx.length);

const duration = console.timeEnd('getLogsDuration');