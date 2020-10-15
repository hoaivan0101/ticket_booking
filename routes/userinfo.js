var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
  var token = req.session.token;
  if (token == undefined&&req.session.passport==undefined) {return res.json('KHONG HOP LE') };
  try {
    if (token==undefined) { result = req.session.passport.user} else {
      let result = jwt.verify(token, 'mk')
      User.findOne({ _id: result })
        .then(data => { res.json(data) });       
    };
  } catch (error) {
      res.json(error)
    }
})

router.post('/', function (req, res) {
  let cart = req.body.cart;
  
})


module.exports = router;