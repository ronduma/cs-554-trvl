const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

const upload = multer({ storage: storage })

router.get('/', async(req,res) => {
    let userObj = await users.getUserByUsername(req.session.user);
    // console.log(userObj)
    return res.status(200).json(userObj);
});

router.post('/pfp', upload.single('image'), async(req,res) => {
    const file = req.file;
    if (file){
      console.log("saving file to /uploads")
      await users.saveImgToDB(req.session.user, file.path);
      let userObj = await users.getUserByUsername(req.session.user);
      await users.modifyImage(req.session.user, userObj.profilePic.buffer);
    }
    return res.redirect('/profile');
});

router.post('/collections', async(req,res) => {
  try{
    console.log(req.body);
    const collection = req.body;
    console.log(collection);
    let result;
    if(collection){
      console.log("uploading collection");
      result = await users.saveCollectionsToDB(req.session.user, collection);
      return res.status(200).json(result);
    } 
  }catch(e){
    return res.status(404).json(e);
  }
});

module.exports = router;