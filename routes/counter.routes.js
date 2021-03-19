// Router for the clicks counting and accessing the click data
//Includes data for the dashboard, hence the authentication is being checked

//import packages and modules
import express from 'express'
import counterCtrl from '../controllers/counter.controller.js'


//authentication function to check that the user is logged in
function isAuthenticatedUser(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Please login to access this page')
    res.redirect('/signin')
  }

const router = express.Router()

//router for saving the information about the click event on the index page to database
router.route('/').
post(counterCtrl.create)

//router for saving the information about the article category selected by the user to database
router.route('/articles').
post(counterCtrl.create)

//router to hanfle rendering of the dashboard
router.get('/auth/dashboard', isAuthenticatedUser, (req, res) => {
    let searchQ = '';
    counterCtrl.list(searchQ)
    .then(clicks => {
        res.render('dashboard',  {clicks : clicks});
    })
    .catch(err =>
        console.log(err));
})


export default router