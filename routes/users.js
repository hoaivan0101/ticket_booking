var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var jwt = require('jsonwebtoken');
var session = require('express-session');
const bcrypt = require('bcrypt');
var checkAuth = require('../controllers/checkAuth');

router.get('/', function (req, res) {
  res.render('auth', { user: req.user })
})

router.get('/login', function (req, res, next) {
  res.render('login', { user: req.user });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ 
        username: username,
        // password: password,
    })
      .then(data => {
        if (!data) { return done(null, false)}
        bcrypt.compare(password, data.password, (err, same) => {
          if (same) { return done(null,data)} else {return done(null, false)}
        })
      })
      .catch(err => {
        return done(err)
      });
  }
));

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { console.log(err); return res.json('Fail') }
    if (!user) { return res.json('Fail') }
    var token = jwt.sign(user.id, 'mk');
    req.user = user.username;
    req.session.token = token;
    return res.json(token)
  })(req, res, next);
});

// PASSPORT GOOGLE

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
      {
        clientID:
      '425336740930-h9n8jfr30vfjl3oknf1a5nb7pvdhj8n8.apps.googleusercontent.com',
        clientSecret: 'gUedMMxR9o2osHsQD8HuW6cp',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({
          googleid: profile.id,
        })
          .then((data) => {
              if (data) {
                cb(null, data);
              } else {
                User.create({
                  email: profile._json.email,
                  googleid: profile.id,
                  avatar: profile._json.picture
                }).then((data) => {
                  cb(null, data);
                });
              }
            })
            .catch((err) => {
              cb(err);
            });
      },
  ),
);

router.get(
  '/google',
  passport.authenticate('google', {scope: ['profile', 'email']}),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  },
);
// 
router.get('/userinfo', checkAuth, function (req, res) {
  res.json(req.user);
})
// Log Out
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/auth')
})

// SIGNUP
router.get('/register', function (req, res) {
  res.render('signup')
})

router.post('/register', function (req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let CheckAccount = true;
  User.find()
      .then(data => {
          for (i of data) { 
              if (username === i.username||email==i.email) { CheckAccount = false; break;}
          }
          if (!CheckAccount) {res.json(CheckAccount);} else {
          User.create(req.body)
          .then(data => {
              res.json(CheckAccount);
          })
          .catch(err => {
          res.json(err)
      })}
    }) 
})

module.exports = router;
