import { Contract, JsonRpcProvider, Wallet } from "ethers";
import fs from 'fs';
import csv from 'csv-parser';

const ABI = [
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

const ec = await instance.eventcount("TENK")

console.log("Done :)", Number(ec[0]), Number(ec[1]), ec[2]);