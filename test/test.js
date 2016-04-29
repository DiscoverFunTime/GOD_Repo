// SET TEST ENVIRONMENT
// =================================================
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');
const superagent = require('superagent');
const agent = superagent.agent();


// DATA FOR TEST
// =================================================
// - create before each test
// - clean after each test

beforeEach(() => {
  return Promise.all([
    // 2 users:
    knex('users').insert({
      id: 1, 
      username: 'larry',
      display_name:'Larry King', 
      email: 'larry@test.com',
      password:'larry',
      profilePicture: 'http://pic1.jpg',
    }),

    knex('users').insert({
      id: 2, 
      username: 'ellen',
      display_name:'Ellen DeGeneres', 
      email: 'ellen@test.com',
      password:'ellen',
      profilePicture: 'http://pic2.jpg',
    }),

    // 1 clan
    knex('clans').insert({
      id:1,
      clan_name:'global',
      user_id:1,
      intro: 'where all global post goes'
    }),

    // 2 posts, one for each user
    knex('posts').insert({
      id:1,
      url:'http://post1.jpg',
      user_id:1,
      description:"this is from larry",
      location:'New York',
      clan:'global'
    }),

    knex('posts').insert({
      id:2,
      url:'http://post2.jpg',
      user_id:2,
      description:"this is from larry",
      location:'New York',
      clan:'global'
    }),

    // 1 tag of 2 post
    knex('post_tag').insert({
      id:1,
      post_id:1,
      tag:'sea'
    }),

    knex('post_tag').insert({
      id:2,
      post_id:2,
      tag:'sea'
    }),

    // user_clan
    knex('user_clan').insert({
      id:1,
      user_id:1,
      clan_id:1,
    }),

    knex('user_clan').insert({
      id:2,
      user_id:2,
      clan_id:1,
    }),
  ])
  .then((done) => {
    done()
  // TEST LOGIN
   // var user = { username: 'larry', password: 'larry' }
   //  request(app)
   //    .post('http://localhost:3000/auth/login')
   //    .send(user)
   //    .end(function(err, res) {
   //      if(err) {console.log(err)}
   //      agent.saveCookies(res)
   //      return done(agent)
   //     // user1 will manage its own cookies
   //     // res.redirects contains an Array of redirects
   //   });
   //  done();
  });
});

afterEach(function(){
  return Promise.all([
    knex('users').del(),
    knex('posts').del(),
    knex('clans').del(),
    knex('user_clan').del(),
    knex('post_tag').del(),
  ]).then((done) => done());
})



// Route Testing
// =================================================
// USERS ROUTE
describe('GET /users', function(){
  
  it('responds with html', done => {
          request(app)
              .get('/users')
              .expect('Content-Type', /html/)
              .expect(200, done);
      });
  it('render the user index page', done=>{
    done();
  })
});

xdescribe('GET /users/:id', function() {

});

xdescribe('POST /users', function() {
});

xdescribe('PUT /users/:id', function() {
});

xdescribe('DELETE /users/:id', function() {
});


// CLANS ROUTE
xdescribe('GET /clans', function(){
});

xdescribe('GET /clans/:id', function() {
});

xdescribe('POST /clans', function() {
});

xdescribe('PUT /clans/:id', function() {
});

xdescribe('DELETE /clans/:id', function() {
});



// POSTS ROUTE
xdescribe('GET /posts', function(){
});

xdescribe('GET /posts/:id', function() {
});

xdescribe('POST /posts', function() {
});

xdescribe('PUT /posts/:id', function() {
});

xdescribe('DELETE /posts/:id', function() {
});






