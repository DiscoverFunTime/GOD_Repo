const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const helpers = require("../helpers/authHelpers")

const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


// LOCAL Strategy
passport.use(new LocalStrategy({
  usernameField:'user[username]',
  passwordField:'user[password]',
  passReqToCallback:true
}, function(req,username,password,done){
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


// FACEBOOK Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields:['id','picture','email','location']
  },function(accessToken, refreshToken, profile, done) {
      knex('users').where('facebookId',profile.id).first().then(function(user){
        // FIND
        if(user){
          return done(null,user);
        }
        // OR CREATE
        else{
          knex('users').insert({
              facebookId:profile.id,
              email:profile._json.emails,
              profilePicture:profile._json.picture.data.url,
              display_name:profile.displayName,
            }).then(function(user){
              return done(null, user[0]);
          })
        }
      }).catch(function(err){
        return done(err, null);
      })
  }));



// GOOGLE Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },function(accessToken, refreshToken, profile, done) {
    // eval(require('locus'))
      knex('users').where('googleId',profile.id).first().then(function(user){
        // FIND
        if(user){
          return done(null,user);
        }
        // OR CREATE
        else{
          knex('users').insert({
              googleId:profile.id,
              username:profile.username,
              display_name:profile.displayName,
            }).then(function(user){
              return done(null, user[0]);
          })
        }
      }).catch(function(err){
        console.log(err)
        return done(err, null);
      })
  }));




// Serialize & Deserialize User
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



// Routes
router.get('/',function(req,res){

  res.redirect("/auth/login")
});

router.get('/login', helpers.preventLoginSignup,function(req,res){
  res.render("auth")
});

router.post('/login',
  passport.authenticate('local',{
    successRedirect:'/users',
    failureRedirect:'/auth/login',
    failureFlash:true,
    successFlash:true
  })
);

router.get('/facebook',
  passport.authenticate('facebook', {scope:['email']})
);

router.get('/facebook/callback', passport.authenticate('facebook',{
    successRedirect:'/users',
    failureRedirect:'/auth/login',
    failureFlash:true,
    successFlash:true
  })
);


router.get('/google',
  passport.authenticate('google',{ scope: ['openid','email'] })
);

router.get('/google/callback', passport.authenticate('google',{
    successRedirect:'/users',
    failureRedirect:'/auth/login',
    failureFlash:true,
    successFlash:true
  })
);


router.get('/logout',function(req,res){
  req.logout();
  res.redirect("/auth/login")
});




module.exports = router;







