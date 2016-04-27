const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const fs = require('fs');
const request = require('request');


router.get('/',function(req,res){
  res.render("./posts/index")
})

router.post('/', function(req, res) {
  console.log(req.body)
  var pattern = /preview/i;
  var imgPath = req.body.uuid
  request(imgPath.replace(pattern, 'json'), function (error, response, body){
    var geo = JSON.parse(body).original.geo_location;
    console.log(geo);
    knex('posts').insert({user_id: 1, url: req.body.uuid, description: req.body.name, lat: geo.latitude, long: geo.longitude, location: "gU HQ"}).then(function (){
    res.send('upload ok: ' + 'lat: ' + geo.latitude +' long: ' + geo.longitude);
    });
  });
});

router.get('/new',function(req,res){
  res.render("./posts/new")
})




module.exports = router;
