const express = require("express");
const router = express.Router();
const knex = require("../db/knex")
const helpers = require("../helpers/authHelpers")

router.use(helpers.ensureAuthenticated)

// ROUTE
router.get('/',function(req,res){
  var results ={};
  res.render("./search",{results})
})

// POST /search SEND search request - send back data
router.post('/', function(req,res){
  var keyword = req.body.tag.toLowerCase();

  knex('post_tag as pt').select('pt.tag','p.id as p_id','p.url')
  .join('posts as p', 'p.id','pt.post_id')
  .where('pt.tag',keyword).then(function(results){
  // eval(require('locus'))

    res.render('./search',{results, tag:"search result for "+req.body.tag});
  })
})

module.exports = router;