const express = require("express");
const router = express.Router();
const knex = require("../db/knex")

const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// FACEBOOK Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  
});


passport.deserializeUser(function(id, done) {

});



// Routes
router.get('/',function(req,res){
  res.render("index")
})

router.get('/',function(req,res){
  res.render("index")
})




module.exports = router;