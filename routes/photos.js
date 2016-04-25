const express = require("express");
const router = express.Router();
const knex = require("../db/knex")



router.get('/',function(req,res){
  res.render("index")
})

router.get('/new',function(req,res){
  res.render("./posts/new")
})




module.exports = router;