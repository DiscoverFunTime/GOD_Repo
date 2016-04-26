const express = require("express");
const router = express.Router();
const knex = require("../db/knex")



router.get('/',function(req,res){
  res.render("settings")
})

router.get('/',function(req,res){
  res.render("settings")
})




module.exports = router;