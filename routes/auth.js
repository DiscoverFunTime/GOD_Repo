const express = require("express");
const router = express.Router();
const knex = require("../db/knex")



router.get('/',function(req,res){
  res.render("auth")
})

router.get('/',function(req,res){
  res.render("auth")
})




module.exports = router;