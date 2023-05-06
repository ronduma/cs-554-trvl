const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require('path');
const helpers = require('../helpers');
const xss = require('xss');

router.get('/', async(req,res) => {
    if (!req.session.user){
        return res.status(200).json(
            console.log("not logged in")
        );
    } else
    return res.status(200).json(
        console.log("logged in")
    );
});

module.exports = router;