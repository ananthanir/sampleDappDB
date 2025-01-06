import { Contract, JsonRpcProvider, Wallet } from "ethers";
import fs from 'fs';
import csv from 'csv-parser';

const ABI = [
  {
    "inputs": [
      {
        "internalType": "string[][]",
        "name": "newStrings",
        "type": "string[][]"
      }
    ],
    "name": "storeDataMap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "eventcount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "end",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "firstentry",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

// const address = "0x42699A7612A82f1d9C36148af9C77354759b210b";
const address = "0x963EE428fe653985ca9d6c9761B722088B507a72";

const provider = new JsonRpcProvider("http://192.168.3.104:8545");
// const provider = new JsonRpcProvider("http://127.0.0.1:8545");
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
// console.log("Sending data to blockchain");

// for (let i = 0; i < 3; i += 2000) {
//   const chunk = datas.slice(i, i + 2000);
//   const trx = await instance.storeDataMap(chunk);
//   console.log(`Inserted chunk ${i / 2000 + 1}`);
// }

const chunk = datas.slice(0, 1000);
const trx = await instance.storeDataMap(chunk);
const ec = await instance.eventcount("TENK")

console.log("Done :)", Number(ec[0]), Number(ec[1]), ec[2]);