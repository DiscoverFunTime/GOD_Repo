const express = require("express");
const router = express.Router();
const knex = require("../db/knex")
const helpers = require("../helpers/authHelpers")

router.use(helpers.ensureAuthenticated)


router.get('/',function(req,res){
  res.render("./search/index")
})

module.exports = router;