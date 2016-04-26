const express = require("express");
const router = express.Router();
const knex = require("../db/knex")



router.get('/',function(req,res){
  res.render("photos")
})

router.get('/',function(req,res){
  res.render("photos")
})




module.exports = router;