require("dotenv").load()
const express = require("express");
const app = express();
const uploadcare = require('uploadcare')('public_key', 'private_key'),
      fs = require('fs');

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
const upload = multer({ dest: __dirname + '/public/uploads/'})
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set("view engine", "jade");
app.set('views', __dirname + '/views'); // Forces server to load fakeViews; comment out for real views

app.use(session({secret: process.env.SECRET}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',routes.users)
app.use('/photos',routes.photos)
app.use('/auth',routes.auth)
app.use('/clans',routes.clans)
app.use('/about', routes.about)
app.use('/settings', routes.settings)

// Set 'currentUser' in all routes.
app.use(helpers.currentUser)



// ROOT ROUTE
app.get('/',function(req,res){
  res.render('index')
})


// ERROR
app.get('*', function(req, res){
  res.render('404')
});


// listen
app.listen(3000, () => {
  console.log("server starting on port 3000")
})

