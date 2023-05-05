const express = require('express');
const app = express();
const configRoutes = require('./routes');
// const redis = require('redis');
// const client = redis.createClient();
// client.connect().then(() => {});

const cors = require('cors');

app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5000');
  console.log();
});