const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require('path');
const helpers = require('../helpers');
const xss = require('xss');


router.get('/', async(req,res) => {
    return res.status(200).render('login', {
        title: "Trvl Login",
        message: "Welcome to Trvl",
        session: req.session.user
    });
});

router.post('/', async(req, res) => {
    let data = {
        username: xss(req.body.username),
        password : xss(req.body.password)
    }
    try {
        // console.log(data.username);
        helpers.validateUsername(data.username);
        helpers.validatePassword(data.password);
    }catch(e){
        console.error(e);
        return res.status(400).json({error: e});
    }

    try{
        data.username = data.username.toLowerCase();
        console.log(data.username);
        console.log(data.password);
        const postRegister = await users.checkUser(data.username, data.password);
        console.log(postRegister.authenticatedUser);
        if(postRegister.authenticatedUser){
            req.session = data.username;
            console.log(req.session);
            return res.redirect('/profile');
        }
        else{
            return res.status(400).render({error: "Invalid username/password"});
        }
    }catch(e){
        return res.status(400).json({error: e})
    }
})


module.exports = router;