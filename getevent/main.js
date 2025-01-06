import { id, Interface, JsonRpcProvider, Contract, Wallet } from "ethers";

const provider = new JsonRpcProvider("http://192.168.3.104:8545");
// const provider = new JsonRpcProvider("http://127.0.0.1:8545");

const eventTopic = id("Datas(string,string[])");

const courseTopic = id("NEW2K");

const certABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "eventcount",
    outputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "firstentry",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "examno",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "data",
        type: "string[]",
      },
    ],
    name: "Datas",
    type: "event",
  },
];
const iface = new Interface(certABI);

// const certAddress = "0x42699A7612A82f1d9C36148af9C77354759b210b";
const certAddress = "0x963EE428fe653985ca9d6c9761B722088B507a72";

let eventlogs = [];

BigInt.prototype.toJSON = function () {
  return this.toString();
};

console.time("getLogsDuration");

const wallet = new Wallet(
  "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
  provider
);

const instance = new Contract(certAddress, certABI, wallet);

const ec = await instance.eventcount("NEW2K")

const start = Number(ec[0]);
const end = Number(ec[1]);

console.log("Range: ", start, end);

const getLogsPromise = provider.getLogs({
  fromBlock: `0x${start.toString(16).toUpperCase()}`,
  toBlock: `0x${end.toString(16).toUpperCase()}`,
  address: certAddress,
  topics: [eventTopic, courseTopic],
});

const [logs1] = await Promise.all([getLogsPromise]);

// console.log(logs1.length);

logs1.forEach((log) => {
  eventlogs.push(iface.parseLog(log));
});

console.log(eventlogs.length);

const duration = console.timeEnd("getLogsDuration");
