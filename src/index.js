const express = require('express');
const Ioredis = require('ioredis');
const createBottle = require('./create-bottle');
const fetchBottle = require('./fetch-bottle');

const redis = new Ioredis({
  host: 'localhost',
  port: 6379,
});

const app = express();

app.use(express.json());

app.get('/', fetchBottle(redis));
app.post('/', createBottle(redis));

const port = 3000;
app.listen(port, () => {
  console.info(`server running on http://localhost:${port}`);
});
