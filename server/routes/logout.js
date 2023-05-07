const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require('path');

router.get('/', async (req, res) => {
    console.log('/logout:', req.session.user);
    req.session.destroy();
    res.clearCookie('AuthCookie');

    return res.status(200).json("logged out.");
});

module.exports = router;