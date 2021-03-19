// Based on the lab 6 code
//Controller for handling fetching user data and deleting users
//user authentication, registration and login is handled by passport package

import User from '../models/user.model.js'

const list = async (req, res) => {
    var q = {};
    try {
        var users = await User.find(q).select('name email')
        return users
        } catch (err) {
        console.log(err)
        }
        }
       
const remove = async (req, res) => {
    try {
        var user = {'name' : req};
        // var user = await User.find({"name" : q})
        // console.log(user);
        var deletedUser = await User.remove(user)
        res.json(deletedUser)
        } catch (err) {
            console.log(err)
        }
}

export default {
    remove,
    list
}