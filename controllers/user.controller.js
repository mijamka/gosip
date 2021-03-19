// Based on the lab 6 code

import User from '../models/user.model.js'

const remove = async (req, res) => {
    try {
        let user = {'name' : req};
        let deletedUser = await User.remove(user)
        } catch (err) {
            console.log(err)
        }
}

export default {
    remove
}