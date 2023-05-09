const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');

const bodyParser = require('body-parser');

// const redis = require('redis');
// const client = redis.createClient();
// client.connect().then(() => {});

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(
session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false}
  })
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.use('/register', (req, res, next) => {
  if (req.session.user) {
    console.log('/register: logged in')
    return res.redirect('/profile');
  } else {
    console.log('/register: not logged in')
    next(); 
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    console.log('/login: logged in')
    return res.redirect('/profile');
  } else {
    console.log('/login: not logged in')
    next(); 
  }
});

app.use('/profile', (req, res, next) => {
  if (!req.session.user) {
    console.log('/profile: not logged in')
    return res.redirect('/login');
  } else {
    console.log('/profile: logged in')
    next(); 
  }
});

app.use('/logout', (req, res, next) => {
  if (!req.session.user) {
    console.log('/logout: not logged in')
    return res.redirect('/login');
  } else {
    console.log('/logout: logged in')
    next(); 
  }
});


// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5000');
  console.log();
});