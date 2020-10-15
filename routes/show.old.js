var express = require('express');
var router = express.Router();
var data = require('../models/movie')
var path = require('path');

/* GET home page. */
router.get('/',function (req, res) {
    res.render('movie')
})

router.get('/films', function (req, res, next) {
    data.find()
        .then(data => {
            res.json(data);
    })
        .catch(err => {res.json(err)})
});

router.get('/films/:id', function (req, res, next) {
    data.find({_id:req.params.id})
        .then(data => {
            res.render('movieid',{data:data[0]})
    })
        .catch(err => {res.json(err)})
});

module.exports = router;
