
const express=require('express');
const isEmpty = require('lodash/isEmpty');
const validator = require('validator');

const bcrypt = require('bcrypt');

let router = express.Router();

let resData;

router.use(function (req, res, next) {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});


router.get('/useradmin', (req, res, next) => {
 
    res.json('resData');

});

module.exports = router;