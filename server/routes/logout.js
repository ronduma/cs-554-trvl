const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require('path');

router.get('/', async (req, res) => {
    console.log("balls");
    console.log(req.session.user);
    res.clearCookie('AuthCookie');
    req.session.destroy();
    return res.redirect("/home");
});

module.exports = router;