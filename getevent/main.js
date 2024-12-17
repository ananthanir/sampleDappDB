import { id, Interface, JsonRpcProvider } from 'ethers'

const provider = new JsonRpcProvider('http://127.0.0.1:8545')
const eventTopic = id('Datas(string[])')

const certABI = [
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
  }
]
const iface = new Interface(certABI)

const certAddress = "0xa50a51c09a5c451C52BB714527E1974b686D8e77"


let eventlogs = []

BigInt.prototype.toJSON = function () {
  return this.toString()
}

console.time('getLogsDuration');

const getLogsPromise = provider.getLogs({
  fromBlock: 'earliest',
  toBlock: 'latest',
  address: certAddress,
  topics: [eventTopic],
});

const [logs1, logs2] = await Promise.all([getLogsPromise, getLogsPromise]);

logs1.forEach((log) => {
  eventlogs.push(iface.parseLog(log));
});

logs2.forEach((log) => {
  eventlogs.push(iface.parseLog(log));
});

console.log(eventlogs.length);

const duration = console.timeEnd('getLogsDuration');