//Router for user restricted pages and the login page
//Authentication used as the access to data should be restricted

//Import packages
import express from 'express'
import User from '../models/user.model.js'
import userCtrl from '../controllers/user.controller.js'
import passport from 'passport'
import LocalStrategy from 'passport-local'

//set routes
const router = express.Router()


//authentication function ussing passport
function isAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please login to access this page')
  res.redirect('/signin')
}

//router for rendering register page
router.get('/auth/signup', isAuthenticatedUser, function (req, res) {
  res.render('signup');
});

//router for posting the user registration form
//the registration is done using the passport package
router.post('/auth/signup', (req, res) => {
  let { name, email, password } = req.body;
  let userData = {
    name: name,
    email: email,
  };
  User.register(userData, password, (err, user) => {
    if (err) {
      req.flash('error_msg', 'ERROR: ' + err);
      res.redirect('/auth/signup');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success_msg', 'Account has been created');
      res.redirect('/auth/listusers');
    })
  });
});



//router to get the list of user from the database
// router.get('/auth/listusers', isAuthenticatedUser, (req, res) => {
router.get('/auth/listusers',  (req, res) => {
  var q = {};
        var users = User.find(q).select('name email')
        .then(users => {
      res.render('user_list', { users: users })});
    });


  
  //functionality to sign out handled by the passport package
  //check that the user is logged in in the first place
  router.get('/auth/signout', isAuthenticatedUser, (req, res) => {
    req.logOut;
    req.flash('success_msg', 'User signed out');
    res.redirect('/signin');
  });

  //router to deleting the user specified in the form
  router.get('/auth/delete/:name', isAuthenticatedUser, (req, res) =>{
    var searchQ = req.params.name;
    userCtrl.remove(searchQ)
    .then(users => {
      req.flash('error_msg', 'The user has been deleted')
      res.redirect('/auth/listusers');
    });
  });

  //export the router
  export default router
