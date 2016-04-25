const express = require("express");
const router = express.Router();
const knex = require("../db/knex")
const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcrypt");


// GET /users Index
router.get('/',function(req,res){
  res.render("./users/index", {message:req.flash('success')})
})

// GET /users/new  New User Route: "render" or "redirect"!??? 
// because we let login & sign up on the same page
router.get('/new',function(req,res){
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
      res.redirect("/users/new")
    })
  });
})


module.exports = router;