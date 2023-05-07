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

router.post('/', async(req, res) => {
    let data = {
        username: xss(req.body.username),
        password : xss(req.body.password)
    }
    try {
        helpers.validateUsername(data.username);
        helpers.validatePassword(data.password);
    }catch(e){
        console.error(e);
        return res.status(400).json({error: e});
    }

    try{
        data.username = data.username.toLowerCase();
        const postRegister = await users.checkUser(data.username, data.password);
        if(postRegister.authenticatedUser){
            req.session.user = data.username;
            console.log(req.session.user);
            return res.redirect('/profile');
        }
        else{
            return res.status(400).json({error: "Invalid username/password"});
        }
    }catch(e){
        return res.status(400).json({error: e})
    }
})


module.exports = router;