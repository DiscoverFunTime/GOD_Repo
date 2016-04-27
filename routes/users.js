const express = require("express");
const router = express.Router();
const knex = require("../db/knex")

const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcrypt");
const helpers = require("../helpers/authHelpers")


// GET /users Index: ensureLogin
router.get('/',helpers.ensureAuthenticated,function(req,res){
  res.render("./users/index", {message:req.flash('success')})
})


// GET /users/:id SHOW User profile page
router.get('/:id',helpers.ensureAuthenticated,function(req,res){
  var u_id=req.user.id;

  // Set res.locals.clanInfo to store clan info
  knex('clans as c').select('c.clan_name')
  .join('user_clan as uc','uc.clan_id','c.id')
  .where('uc.user_id',u_id).then(function(clanInfo){
    res.locals.clanInfo = clanInfo
  })

  // get user data from db: profile, posts, liked post
  knex('users as u').join('posts as p','u.id', 'p.user_id').where('u.id',u_id).then(function(collection){
    res.render('./users/show',{collection})
  })
})

// GET /users/new  New User Route: "render" or "redirect"!??? 
// because we let login & sign up on the same page
router.get('/new',helpers.preventLoginSignup,function(req,res){
  res.render('auth')
})


// POST /users CREATE Account
router.post('/',function(req,res){
  // hash password
  bcrypt.hash(req.body.user.password, SALT_WORK_FACTOR, function(err,hash){
    // store hash password & create new user in db
    knex('users').insert({
      username:req.body.user.username,
      email:req.body.user.email,
      password:hash
    }).returning('*').first().then(function(user){
      // eval(require('locus'))
      req.login(user,function(err){
        if(!err){
          res.redirect('/users')
        }
      })
    }).catch(function(err){
      console.log(err)
      res.redirect("/auth/login")
    })
  });
})

// GET /users/:id/edit
router.get('/:id/edit',helpers.ensureAuthenticated,function(req,res){
  // show editing setting page (ios UI maybe)
  res.render("./users/edit")
})


// PUT /users/:id UPDATE User Setting
router.put('/:id',function(req,res){
  // Find in db & update new info => updateUser
  // Refirect back to profile page
  var u_id = req.params.id;

  // If user change password, hash and update.
  if(req.body.updateUser.password){
    bcrypt.hash(req.body.updateUser.password, SALT_WORK_FACTOR, function(err,hash){
      knex('users').where('id',u_id).update({
        password:hash
      }).then(function(){ 
        next()
      })
    })
  }

  // UPDATE user info
  knex('users').where('id',u_id).update({
    profilePicture:req.body.updateUser.profilePicture,
    display_name:req.body.updateUser.display_name,
    email:req.body.updateUser.email,
  }).then(function(){
    res.redirect(`/users/${u_id}`)
  })
})


// DELETE /users/:id DELETE Account
router.delete('/:id',function(req,res){
  // Find in db & delete
  // Refirect back to welcome page
  knex('users').where('id',u_id).del().then(function(){
    res.redirect('/')
  })
})


module.exports = router;