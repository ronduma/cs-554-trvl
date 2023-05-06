const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
// const redis = require('redis');
// const client = redis.createClient();
// client.connect().then(() => {});

const cors = require('cors');

app.use(cors());

app.options('*', cors({
  credentials: true,
  origin: true
}));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false
  })
);

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/profile');
  } else {
    next();
  }
});

configRoutes(app);

app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5000');
  console.log();
});