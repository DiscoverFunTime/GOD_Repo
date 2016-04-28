
const express = require("express");
const app = express();

if (app.get('env') === 'development') {
    require('dotenv').load();
}

// REQUIRE MIDDLEWARE
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const routes = require("./routes/index")
const session = require("cookie-session");
const knex = require("./db/knex")
const flash = require("connect-flash")
const passport = require("passport")
const helpers = require("./helpers/authHelpers")


// SET UP MIDDLEWARE
// const upload = multer({ dest: __dirname + '/public/uploads/'})
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set("view engine", "jade");
app.set('views', __dirname + '/views'); // Forces server to load fakeViews; comment out for real views


app.use(session({secret: process.env.SESSION_SECRET}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Set 'currentUser' in all routes. *ORDERS MATTER*
app.use(helpers.currentUser)

app.use('/users',routes.users)
app.use('/posts',routes.posts)
app.use('/auth',routes.auth)
app.use('/clans',routes.clans)
app.use('/about', routes.about)
app.use('/settings', routes.settings)
app.use('/search', routes.search)


// ROOT ROUTE
app.get('/',function(req,res){
  res.render('index')
})

app.get('/search',function(req,res){
  res.render('search')
})

// route to web intro page
app.get('/web', function(req, res){
  res.render('webPage')
})

// ERROR
// app.get('*', function(req, res){
//   res.render('404')
// });


// listen
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
})

