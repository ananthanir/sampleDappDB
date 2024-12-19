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
]

const address = "0x8caa34dE363af3ecD21677845F4508Ebd5F41ba3";

const provider = new JsonRpcProvider("http://192.168.3.104:8545");
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

// for (let i = 0; i < 3; i += 2000) {
//   const chunk = datas.slice(i, i + 2000);
//   const trx = await instance.storeDataMap(chunk);
//   console.log(`Inserted chunk ${i / 2000 + 1}`);
// }

const chunk = datas.slice(0, 2000);
const trx = await instance.storeDataMap(chunk);
console.log("Done :)");