var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
  var token = req.session.token;
  var result;
  if (token == undefined && req.session.passport == undefined) { return res.json('KHONG HOP LE') };
  if (token == undefined) { result = req.session.passport.user } else { result = jwt.verify(token, 'mk') }
  User.findOne({ _id: result })
    .then(data => { res.json(data) })
    .catch (err => res.json(err))
})

router.post('/', function (req, res) {
  let cart = req.body.cart;
  var token = req.session.token;
  try {
    if (token == undefined) { result = req.session.passport.user } else { result = jwt.verify(token, 'mk') }
      User.updateOne({ _id: result },{cart:cart})
        .then(data => { res.json(data) });       
  } catch (error) {
    res.json(error)
  }
 
})


module.exports = router;