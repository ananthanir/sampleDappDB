import { id, Interface, JsonRpcProvider } from 'ethers'

const provider = new JsonRpcProvider('http://192.168.3.104:8545')
const eventTopic = id('Datas(string,string[])')

const courseTopic = id('A')

const certABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "examno",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string[]",
        "name": "data",
        "type": "string[]"
      }
    ],
    "name": "Datas",
    "type": "event"
  }
]
const iface = new Interface(certABI)

const certAddress = "0x42aeb727C3D7E4eF8ccde8039bDF9bE804B3B9FF"


let eventlogs = []

BigInt.prototype.toJSON = function () {
  return this.toString()
}

console.time('getLogsDuration');

const getLogsPromise = provider.getLogs({
  fromBlock: 'earliest',
  toBlock: 'latest',
  address: certAddress,
  topics: [eventTopic, courseTopic],
});

const [logs1, logs2] = await Promise.all([getLogsPromise, getLogsPromise]);

console.log(logs1.length);

logs1.forEach((log) => {
  eventlogs.push(iface.parseLog(log));
});

logs2.forEach((log) => {
  eventlogs.push(iface.parseLog(log));
});

console.log(eventlogs.length);

const duration = console.timeEnd('getLogsDuration');