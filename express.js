//Miriam Wojcik
//go_sip AB testing website
//v 2
//18/3/2020

import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import crypto from 'crypto'
import userRoutes from './routes/user.routes.js'
import counterRoutes from './routes/counter.routes.js'
import User from './models/user.model.js'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'
import passportLocal from 'passport-local';
import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

//set up the path
const __dirname = path.resolve();

//set up the server
const app = express();

//set up the local strategy for thr passport authentication
var LocalStrategy = passportLocal.Strategy;

//set up the session to be able to access cookies and to use the passport package
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUnitialized: true,
  cookie: { sameSite: true,
    maxAge: 24*60*60*1000 },
}))

//use the flash to display error msgs
app.use(flash());
//set up the flash msges
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash(('success_msg'));
  res.locals.error_msg = req.flash(('error_msg'));
  res.locals.error = req.flash(('error'));
  next();
})

//use the extended body parser and json parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//use the cookie parser to acces data from the cookies
app.use(cookieParser())

app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet())
app.use(helmet.contentSecurityPolicy());

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

//passport authentication set up
//use the username (name) as a unique identifier
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField : 'name'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set up the content security policy to self
//use helments security policy to prevent errors
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      "object-src": ["'self'"],
    },
  })
);

//use public folder with the static files
app.use(express.static("public"));

//set up the routers
app.use('/', userRoutes)
app.use('/', counterRoutes)
app.use('/auth/dashboard', counterRoutes)

//use EJS as a view engine
app.set('views', path.join(__dirname, 'views/pages/'));
app.set('view engine', 'ejs');

//getters for the pages
//index page
app.get('/', function(req, res){
    res.render('index');
});

//about page with basic info about the portal
app.get('/about', function(req, res){
  res.render('about');
});

//main page contains past the age verification
//content filtered based on the age
//defult kid if entered from url not from the main page
//in the future use cookies to check the age
app.get('/main', function(req, res){
  res.render('main', {
    article: 'kid',
  });
  });

//get the parameters from url to access data about users age
//return the approriate version of the main page
app.get('/main/:age', function(req, res){
  try{
  var version = 'kid';
  var age = req.params.age;
  if(age == '18+'){
    version = 'x';
  } else{
    version = 'kid';
  }
}
catch{
  var version = 'kid';
}
  res.render('main', {
    article: version,
  });
});

//returns the page with the articles within the category specified (eg lifestyle, events)
//deny the access to the age sensitive content if the user declared to be underage based on the 
//session data
app.get('/articles/:cat', function(req, res){
  var cat;
  var deny;
  if ( req.params.cat== 'Special' && req.session.age != true){
    cat = req.params.cat;
     deny = true;
    res.render('articles_list', {
      category: cat, deny: deny,
    });
  }
  else{
  if (req.params.cat== 'Social-Media'){
    cat = 'Social Media';
  } else {
    cat = req.params.cat;
  }
  res.render('articles_list', {
    category: cat, deny: false,
  });
}
});

//render the login page
app.get('/signin', function(req, res){
  res.render('sign_in');
}); 

//post the login form
//login functionality handled by the passport package
//if login successful, redirect to the dashboard
//if login unsuccessful, display an error msg
app.post('/signin', 
  passport.authenticate('local',
  {
    successRedirect : '/auth/dashboard',
    failureRedirect : '/signin',
    failureFlash : 'Incorrect username or password'
  }));

  //if not existing url entered, redirect to the index page
app.get('*',function (req, res) {
    res.redirect('/');
})

//export the app
export default app