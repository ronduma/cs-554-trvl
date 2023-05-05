const express = require('express');
const router = express.Router();

router
.route('/register')
.post(async (req, res) => {
  try {
    console.log(req.body.username, req.body.password, req.body.confirmPassword)
  } catch (e){
    res.status(404).json({error : 'registration failed'});
  }
});

module.exports = router;
