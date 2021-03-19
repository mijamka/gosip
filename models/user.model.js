//User schema
// Based on the  lab 6 solution
//using passport package to add hash and salt

import mongoose from 'mongoose'
import crypto from 'crypto'
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select : false
  }
});

UserSchema.plugin(passportLocalMongoose, {usernameField : 'name'});
export default mongoose.model('User', UserSchema);