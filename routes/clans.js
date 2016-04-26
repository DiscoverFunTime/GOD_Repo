const express = require("express");
const router = express.Router();
const knex = require("../db/knex")
const helpers = require("../helpers/authHelpers")

router.use(helpers.ensureAuthenticated)

// GET /clans INDEX: show all exsiting clans
router.get('/',function(req,res){
  res.render("./clans/index")
})

// GET /clans/:id SHOW clan page - name, description, users, score?
router.get('/:id',function(req,res){
  res.render("./clan/show")
})

// GET /clans/new NEW form to create new clan - description, name or other setting
router.get('/new', function(req,res){
 res.render("./clan/new")
}) 

// POST /clans CREATE a clan - redirect to clan profile page
router.post('/clans', function(req,res){
  knex('clans').insert(req.body.clan).first().then(function(clan){
    res.redirect(`/clans/${clan.id}`)
  })
})

// GET /clans/:id/edit EDIT form to change context
router.get('/:id/edit', function(req,res){
  res.render('./clans/edit')
})

// PUT /clans/:id UPDATE clan information - redirect back to clan profile page
router.put('/:id', function(req,res){
  // find in db and update
  knex('clans').where('id',req.params.id).update(req.body.clan).then(function(clan){
    res.redirect(`/clans/${clan.id}`)
  })
})


// DELETE /clans/:id DELETE clan - do we want user(creater) to delete clan? - redircet back to all clan page
router.delete('/:id', function(req,res){
  kenx('clans').where('id',req.params.id).del().then(function(){
    res.redirect('./clans/index')
  })
})



module.exports = router;







