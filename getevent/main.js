import { id, Interface, JsonRpcProvider, Contract, Wallet } from 'ethers'

const provider = new JsonRpcProvider('http://192.168.3.104:8545')
const eventTopic = id('Datas(string,string[])')

const courseTopic = id('A')

const certABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "eventcount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
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

const certAddress = "0x8caa34dE363af3ecD21677845F4508Ebd5F41ba3"

let eventlogs = []

BigInt.prototype.toJSON = function () {
    return this.toString()
}

console.time('getLogsDuration');

const wallet = new Wallet('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', provider);

const instance = new Contract(certAddress, certABI, wallet);

const start = await instance.eventcount('A',0);
const end = await instance.eventcount('A',1);

console.log("Range: ", start, end);
console.log("Range: ", `0x${start.toString(16).toUpperCase()}`, `0x${end.toString(16).toUpperCase()}`);

const getLogsPromise = provider.getLogs({
    fromBlock: `0x${start.toString(16).toUpperCase()}`,
    toBlock: `0x${end.toString(16).toUpperCase()}`,
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