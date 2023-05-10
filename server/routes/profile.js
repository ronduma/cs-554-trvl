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

// router.post('/pfp', upload.single('image'), async(req,res) => {
//     const file = req.file;
//     if (file){
//       console.log("saving file to /uploads")
//       await users.saveImgToDB(req.session.user, file.path);
//       let userObj = await users.getUserByUsername(req.session.user);
//       await users.modifyImage(req.session.user, userObj.profilePic.buffer);
//     }
//     return res.redirect('/profile');
// });
router.post('/pfp', upload.single('image'), async(req,res) => {
  const file = req.file;
  if (!file) {
      return res.status(400).json({ error: "No image file uploaded" });
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return res.status(400).json({ error: "Please upload a valid image file (jpg or png)" });
  }
  console.log("saving file to /uploads")
  await users.saveImgToDB(req.session.user, file.path);
  let userObj = await users.getUserByUsername(req.session.user);
  await users.modifyImage(req.session.user, userObj.profilePic.buffer);
  return res.redirect('/profile');
});

module.exports = router;