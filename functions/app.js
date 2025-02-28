require('dotenv').config();

const serverless = require('serverless-http');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const helmet = require('helmet');
const cors = require('cors');

const ordersRouter = require('./routes/orders');

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/.netlify/functions/app/', (req, res) => {
  res.send('<h1>Orders API</h1>');
})

app.use('/.netlify/functions/app/api/v1/get-order', ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})

module.exports.handler = serverless(app);