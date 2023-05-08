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
    // console.log("file", req.file)
    const file = req.file;
    if (file){
      console.log("saving file to /uploads")
      await users.saveImgToDB(req.session.user, file.path);
      let userObj = await users.getUserByUsername(req.session.user);
      // let stdout = await users.modifyImage(userObj.profilePic.buffer)
      // res.setHeader('Content-Type', 'image/png');
      // res.send(stdout);
    }
    return res.redirect('/profile');
});

module.exports = router;