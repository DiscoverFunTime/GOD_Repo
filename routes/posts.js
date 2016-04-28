const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const request = require('request');




router.get('/',function(req,res){
  knex.select('posts.id as pid','users.id as uid', 'posts.url as url', 'users.display_name as name', 'posts.location as loc').from('posts').leftJoin('users', 'posts.user_id', 'users.id').orderBy('posts.id', 'desc').then(function (userPost){
    console.log(userPost);
    res.render('./posts/index', {posts: userPost});
  });
})

router.post('/', function(req, res) {
  console.log(req.body)
  var pattern = /preview/i;
  var imgPath = req.body.post.url;
  var tags = req.body.tag;
  var tagList = tags.split(',').map(function(tag) {
    return tag.trim();
  });
  console.log(tagList);
  request(imgPath.replace(pattern, 'json'), function (error, response, body){ // Sends GET request to UploadCare CDN to retrieve EXIF data
    var geo = JSON.parse(body).original.geo_location; // Retrieve geolocation data from the JSON received from the CDN
    newPost = req.body.post;
    newPost.lat = geo.latitude;
    newPost.long = geo.longitude;
    newPost.user_id = 1;
    console.log(geo);
    knex('posts').insert(newPost)
    .then(function (){
      knex('posts').select('id').orderBy('id', 'desc').first().then(function(latestPost){
        console.log(latestPost)
        tagList.forEach(function(tag){
          console.log("ForEachin: " + tag);
          knex('post_tag').insert({post_id: latestPost.id, tag: tag}).then();    
        });    
      });
      res.redirect('/posts');
    });
  });
});

router.put('/', function(req, res) {
console.log(req.body);    
  knex('posts').where('id', +req.body.id).update(req.body.post).returning('*').then(function (post){
    res.send('update ok: ' + 'loc: ' + req.body.desc +' desc: ' + req.body.desc);
  });
});

router.get('/new',function(req,res){
  res.render("./posts/new")
})


router.get('/:id', function (req,res){
  knex.select('*').from('posts').leftJoin('users', 'posts.user_id', 'users.id').where('posts.id', req.params.id).returning('*').first().then(function (userPost){
    var objPostParts = {url: userPost.url,
                        uid: userPost.user_id,
                        user: userPost.username,
                        loc: userPost.location,
                        desc: userPost.description,
                        lat: userPost.lat,
                        long: userPost.long};
    console.log(objPostParts);
    res.render('./posts/show', {post: objPostParts});
  });
});

router.get('/:id/edit', function (req,res){
  knex.select('*').from('posts').leftJoin('users', 'posts.user_id', 'users.id').where('posts.id', req.params.id).returning('*').first().then(function (userPost){
    var objPostParts = {url: userPost.url,
                        uid: userPost.user_id,
                        user: userPost.username,
                        loc: userPost.location,
                        desc: userPost.description,
                        lat: userPost.lat,
                        long: userPost.long,
                        id: req.params.id};
    res.render('./posts/edit', {post: objPostParts});
  });
});



module.exports = router;