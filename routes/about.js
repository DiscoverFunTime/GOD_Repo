const express = require("express");
const router = express.Router();
const knex = require("../db/knex")



router.get('/',function(req,res){
  res.render("about")
})




module.exports = router;