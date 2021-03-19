//User schema
// Based on the  lab 6 solution
//using passport package to add hash and salt

//import packages
import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

//get user name-> unique identifier, email and password
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

//use the passport plugin to handle the password encryption 
UserSchema.plugin(passportLocalMongoose, {usernameField : 'name'});

//export the schema
export default mongoose.model('User', UserSchema);