const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const { Contract, JsonRpcProvider,Wallet } = require ('ethers');

const ABI = require('./contract-data/Storage.json');
const Address = require('./contract-data/deployed_addresses.json');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'exampleuser',
  host: '192.168.1.101',
  database: 'exampledb',
  password: 'examplepass',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.post('/api/data', async (req, res) => {
  const { data } = req.body;
  console.log('Received data:', data);

  const provider = new JsonRpcProvider("http://192.168.1.100:8545");
  const wallet = new Wallet('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', provider);
  const instance = new Contract(Address.Storage,  ABI.abi, wallet);

  try {
    const trx = await instance.store(data);
    console.log(trx);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testdata (
        id SERIAL PRIMARY KEY,
        data TEXT NOT NULL
      )
    `);
    console.log('Table created or already exists');
    const result = await pool.query('INSERT INTO testdata (data) VALUES ($1) RETURNING *', [data]);
    console.log('Data inserted:', result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});