import { Contract, JsonRpcProvider, Wallet } from "ethers";
import fs from 'fs';
import csv from 'csv-parser';

const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "name": "Datas",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getAllData",
      "outputs": [
        {
          "internalType": "string[][]",
          "name": "",
          "type": "string[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getData",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[][]",
          "name": "newStrings",
          "type": "string[][]"
        }
      ],
      "name": "storeData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[][]",
          "name": "newStrings",
          "type": "string[][]"
        }
      ],
      "name": "storeDatas",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

const address = "0xa50a51c09a5c451C52BB714527E1974b686D8e77";

const provider = new JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new Wallet('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', provider);

const instance = new Contract(address, ABI, wallet);

async function readCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('./marklist.csv')
      .pipe(csv())
      .on('data', (row) => {
        results.push(Object.values(row));
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

let datas = await readCSV();
console.log("Sending data to blockchain");

for (let i = 0; i < datas.length; i += 1000) {
  const chunk = datas.slice(i, i + 1000);
  const trx = await instance.storeDatas(chunk);
  console.log(`Inserted chunk ${i / 1000 + 1}`);
}