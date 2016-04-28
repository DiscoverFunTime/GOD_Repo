const express = require("express");
const router = express.Router();
const knex = require("../db/knex")
const helpers = require("../helpers/authHelpers")

router.use(helpers.ensureAuthenticated)

// GET /clans INDEX: show top 10 exsiting clans - order by "points"
router.get('/',function(req,res){
  knex('clans').orderBy('points').limit(10).then(function(clans){
    res.render("./clans/index",{clans})
  })
})

// GET /clans/new NEW form to create new clan - description, name or other setting
router.get('/new', function(req,res){
 res.render("./clans/new")
}) 

// GET /clans/:id SHOW clan page - name, description, users, score?
router.get('/:id',function(req,res){
  var clan_id = req.params.id;
  
  // Set res.locals.clanInfo to store clan info
  knex('clans').where('id',clan_id).first().then(function(clanInfo){
    res.locals.clanInfo = clanInfo
  })

  // Join two tables to get posts of the clan
  knex('clans as c').select('c.id as c_id','uc.user_id as u_id','p.id as p_id','u.dispaly_name','p.url','p.description','p.location','p.lat','p.long','p.created_at')
  .join('user_clan as uc','c.id','uc.clan_id')
  .join('posts as p','p.user_id','uc.user_id')
  .join('users as u','u.id','p.user_id')
  .where('c.id',clan_id).then(function(clanPosts){
    res.render("./clans/show",{clanPosts});
  })
})


// POST /clans CREATE a clan - redirect to clan profile page
router.post('/', function(req,res){
  // eval(require('locus'))
  knex('clans').insert({
    clan_name:req.body.clan.clan_name,
    intro:req.body.clan.intro,
    user_id:req.user.id
  }).returning('*').then(function(clan){
    // res.redirect(`/clans/${clan.id}`)
    res.redirect(`/clans`)

  })
})

// GET /clans/:id/edit EDIT form to change context
router.get('/:id/edit', function(req,res){
  knex('clans').where('id',clan_id).first().then(function(clan){
    res.render('./clans/edit',{clan})
  })
})

// PUT /clans/:id UPDATE clan information - redirect back to clan profile page
router.put('/:id', function(req,res){
  // find in db and update
  var clan_id = req.params.id;
  knex('clans').where('id',clan_id).update(req.body.updateClan).then(function(clan){
    res.redirect(`/clans/${clan_id}`)
  })
})

// POST /clans/:id/clan UPDATE join clan - add clan, then redirect to clan page
router.post('/:id/user', function(req,res){
  knex('user_clan').insert({
    user_id:req.user.id,
    clan_id:req.params.id
  }).returning('*').then(function(clan){
    res.redirect(`/clans/${clan[0].clan_id}`)
  })
})


// DELETE /clans/:id DELETE clan - do we want user(creater) to delete clan? - redircet back to all clan page
router.delete('/:id', function(req,res){
  var clan_id = req.params.id;
  kenx('clans').where('id',clan_id).del().then(function(){
    res.redirect('./clans')
  })
})


module.exports = router;







