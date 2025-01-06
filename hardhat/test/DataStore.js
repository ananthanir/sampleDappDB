const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const fs = require("fs");
const csv = require("csv-parser");

describe("DataStore", function () {
  async function deployCertFixture() {
    const [admin, other] = await ethers.getSigners();
    const DataStore = await ethers.getContractFactory("DataStoreMul");
    const datastore = await DataStore.deploy();
    return { datastore, admin, other };
  }

  async function readCSV() {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream("./marklist.csv")
        .pipe(csv())
        .on("data", (row) => {
          results.push(Object.values(row));
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  it("Should issue the certificate", async function () {
    const { datastore } = await loadFixture(deployCertFixture);
    let datas = await readCSV();
    console.log("Sending data to blockchain");

    const chunk1 = datas.slice(0, 1000);
    const trx1 = await datastore.storeDataMap(chunk1);

    console.log("Block Range: ", await datastore.eventcount("A"));

    const chunk2 = datas.slice(1001, 2000);
    const trx2 = await datastore.storeDataMap(chunk2);

    console.log("Block Range: ", await datastore.eventcount("A"));
    
    console.log("Done :)");
  });
});
