// Based on the lab 6 code
//Controller for handling fetching user data and deleting users
//user authentication, registration and login is handled by passport package

//import user schema
import User from '../models/user.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import { json } from 'body-parser';

//function to handle fetching the list of users from the database
//for safety retrive only usernames and emails
const list = async (req, res) => {
    var q = {};
    try {
        var users = await User.find(q).select('name email')
        return users
        } catch (err) {
            return err
        }
        }
  
//function to remove the user from the database
const remove = async (req, res) => {
    try {
        var user = {'name' : req};
        var deletedUser = await User.remove(user)
        res.json(deletedUser)
        } catch (err) {
            return err
        }
}

export default {
    remove,
    list
}