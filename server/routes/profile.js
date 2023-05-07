const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');


router.get('/', async(req,res) => {
    // console.log('Gets req.session.user');
    console.log(req.session.user)
    return res.status(200).json(req.session.user);
});

module.exports = router;