const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const request = require('request');




router.get('/',function(req,res){
  knex.select('posts.id as pid','users.id as uid', 'posts.url as url', 'users.display_name as name', 'posts.location as loc').from('posts').leftJoin('users', 'posts.user_id', 'users.id').orderBy('posts.id', 'desc').then(function (userPost){
    res.render('./posts/index', {posts: userPost});
  });
})

router.post('/', function(req, res) {
  var pattern = /preview/i;
  var imgPath = req.body.post.url;
  var tags = req.body.tag;
  var tagList = tags.split(',').map(function(tag) {
    return tag.trim();
  });
  request(imgPath.replace(pattern, 'json'), function (error, response, body){ // Sends GET request to UploadCare CDN to retrieve EXIF data
    var geo = JSON.parse(body).original.geo_location; // Retrieve geolocation data from the JSON received from the CDN
    newPost = req.body.post;

    newPost.lat = geo.latitude || 37.78758641666666
    newPost.long = geo.longitude || -122.39646169444445
    newPost.user_id = 1;
    console.log(geo);


    knex('posts').insert(newPost)
    .then(function (){
      knex('posts').select('id').orderBy('id', 'desc').first().then(function(latestPost){
        tagList.forEach(function(tag){
          knex('post_tag').insert({post_id: latestPost.id, tag: tag}).then();    
        });    
      });
      res.redirect('/posts');
    });
  });
});
  
router.put('/', function(req, res) {    
  var tags = req.body.tag;
  var tagList = tags.split(',').map(function(tag) {
    return tag.trim();
  });  
  knex('posts').where('id', +req.body.id).update(req.body.post).returning('*').then(function (post){
    knex('posts').select('id').where('id', +req.body.id).first().then(function(idPost){
        knex('post_tag').del('post_id', +req.body.id).then();    
        tagList.forEach(function(tag){
          knex('post_tag').insert({post_id: idPost.id, tag: tag}).then();    
        });
      });
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
    knex.select('*').from('post_tag').where('post_id', req.params.id).then(function(postTags) {
      postTags = postTags.map(function(tag){
        return tag.tag;
      });
      tagsJoined = postTags.join(', ');
      objPostParts.tags = tagsJoined;
      res.render('./posts/show', {post: objPostParts});
    });
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
    knex.select('*').from('post_tag').where('post_id', req.params.id).then(function(postTags) {
      postTags = postTags.map(function(tag){
        return tag.tag;
      });
      tagsJoined = postTags.join(', ');
      objPostParts.tags = tagsJoined;
      res.render('./posts/edit', {post: objPostParts});
    });
  });
});



module.exports = router;