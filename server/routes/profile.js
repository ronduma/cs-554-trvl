const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');


router.get('/', async(req,res) => {
    let userObj = await users.getUserByUsername(req.session.user);
    console.log(userObj)
    return res.status(200).json(userObj);
});

module.exports = router;