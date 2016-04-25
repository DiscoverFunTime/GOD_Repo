require("dotenv").load()
const express = require("express");
const app = express();

// REQUIRE MIDDLEWARE
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const routes = require("./routes/index")
const session = require("cookie-session");
const knex = require("./db/knex")
const flash = require("connect-flash")
const passport = require("passport")

// SET UP MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set("view engine", "jade");
app.set('views', __dirname + '/fakeViews'); // Forces server to load fakeViews; comment out for real views

app.use(session({secret: process.env.SECRET}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',routes.users)
app.use('/photos',routes.photos)
app.use('/auth',routes.auth)
app.use('/clans',routes.clans)




// ROOT ROUTE
app.get('/',function(req,res){
  res.redirect('/users')
})


// ERROR
// app.get('*', function(req, res){
//   res.render('404')
// });


// listen
app.listen(3000, () => {
  console.log("server starting on port 3000")
})

