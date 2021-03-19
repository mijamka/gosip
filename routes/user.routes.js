//Router for user restricted pages and the login page

import express from 'express'
import User from '../models/user.model.js'
import passport from 'passport'
import userCtrl from '../controllers/user.controller.js'
import LocalStrategy from 'passport-local'

const router = express.Router()

router.get('/auth/signup',  function (req, res) {
    res.render('signup');
  });
router.post('/auth/signup', (req, res) => {
    let { name, email, password } = req.body;
    let userData = {
      name: name,
      email: email,
    };
    User.register(userData, password, (err, user) => {
      if (err) {
        req.flash('error_msg', 'ERROR: ' + err);
        // res.redirect('/auth/signup');
      }
      passport.authenticate('local')(req, res, () => {
        req.flash('success_msg', 'Account has been created');
        //  res.redirect('/auth/listusers');
      })
    });
  });

  router.get('/auth/signout',  (req, res) => {
    req.logOut;
    req.flash('success_msg', 'User signed out');
    res.redirect('/signin');
  });

  export default router
