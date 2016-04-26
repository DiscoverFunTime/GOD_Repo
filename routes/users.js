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


// GET /users/:id SHOW User Profile page
router.get('/:id',helpers.ensureAuthenticated,function(req,res){
  // get user data from db: profile, posts, liked post
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
    }).then(function(){
      res.redirect('/users')
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
  // Find in db & update new info
  // Refirect back to profile page

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