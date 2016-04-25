const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// LOCAL Strategy
passport.use(new LocalStrategy({
  usernameField:'user[username]',
  passwordField:'user[password]',
  passReqToCallback:true
}, function(req,username,password,done){
  // eval(require('locus'))
  // find username in db
  knex('users').where('username',username).first().then(function(user){
    // cannot find user in db
    if(!user){
      return done(null, false, {message:"Invalid username or password"})
    } 
    // find username in db, compare password.
    bcrypt.compare(password,user.password,function(err, isMatch){
      if(!isMatch){
        return done(null, false, {message:"Invalid username or password"})
      } 
      else{
        return done(null, user, {message:"Welcome back!"})
      }
    })
  }).catch(function(err){
    return done(err, false)
  })
}))

passport.serializeUser(function(user, done) {
  // set req.session.passport.user = user.id
  done(null, user.id)
});


passport.deserializeUser(function(id, done) {
  // get user id from serializeUser, look up in db and set 'currentUser'
  knex('users').where('id',id).first().then(function(user){
    done(null,user);
  }).catch(function(err){
    console.log("Failed to deserialize user", err)
    done(err, false)
  })
});




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




// GOOGLE Strategy



// Routes
router.get('/',function(req,res){
  res.redirect("/auth/login")
});

router.get('/login',function(req,res){
  res.render("auth")
});

router.post('/login',
  // eval(require('locus'))
  passport.authenticate('local',{
    successRedirect:'/users',
    failureRedirect:'auth/login',
    failureFlash:true,
    successFlash:true
  })
);

router.get('/logout',function(req,res){
  req.logout();
  res.redirect("/auth/login")
});




module.exports = router;






