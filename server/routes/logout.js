const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require('path');

router.get('/', async (req, res) => {
    console.log(req.session);
    req.session.destroy();
    console.log("req.session: "+ req.session);
    return res.redirect("/home")
});

module.exports = router;