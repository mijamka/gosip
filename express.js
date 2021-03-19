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

const __dirname = path.resolve();
const app = express();
// parse body params and attache them to req.body
var LocalStrategy = passportLocal.Strategy;

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUnitialized: true,
  cookie: { sameSite: true,
    maxAge: 24*60*60*1000 },
}))
// Sets "Content-Security-Policy: script-src 'self'"

app.use(flash());
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash(('success_msg'));
  res.locals.error_msg = req.flash(('error_msg'));
  res.locals.error = req.flash(('error'));
  next();
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
app.use(helmet.contentSecurityPolicy());
// enable CORS - Cross Origin Resource Sharing
app.use(cors())
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField : 'name'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cookieParser())

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      "object-src": ["'self'"],
    },
  })
);


app.use('/', userRoutes)
app.use('/', counterRoutes)

app.set('views', path.join(__dirname, 'views/pages/'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');


app.get('/signin', function(req, res){
    res.render('sign_in');
    }); 
    
    app.post('/signin', 
    passport.authenticate('local',
    {
        successRedirect : '/auth/dashboard',
        failureRedirect : '/signin',
        failureFlash : 'Incorrect username or password'
    }));
});

export default app