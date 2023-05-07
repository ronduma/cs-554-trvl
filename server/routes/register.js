const express = require('express');
const router = express.Router();
const users = require('../data/users');
const helpers = require('../helpers');
const xss = require('xss');

router.get('/', async(req,res) => {
  console.log(req.session.user)
  return res.status(200).json(req.session.user);
});

router.route('/').post(async (req, res) => {
  // get data from frontend, check for xss attacks
  let data = {
    username : xss(req.body.username), 
    password : xss(req.body.password), 
    confirmPassword : xss(req.body.confirmPassword)
  };
  // input validation
  try {
    helpers.validateUsername(data.username);
    helpers.validatePassword(data.password);
    if (data.password !== data.confirmPassword) throw 'Error: Passwords do not match. Please try again.';
  } catch (e){
    console.error(e)
    return res.status(400).json({error : e});
  }
  // create user
  try {
    data.username = data.username.toLowerCase();
    let user = await users.createUser(data.username, data.password);

    if (user.insertedUser === false){
      return res.status(500).json('Error: Internal Server Error.');
    }
    return res.status(200).json('Success');
  } catch(e){
    console.error(e)
    return res.status(400).json({error : e});
  }
});

module.exports = router;
