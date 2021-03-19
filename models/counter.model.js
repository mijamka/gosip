// schema for the button clicks tracking
//save the category passed, date, and the information was the user underage or not

//import mongoose package
import mongoose from 'mongoose'


//information to store: category of the article/group of articles, 
//is the user adult (boolean), time the record was created
const CounterSchema = new mongoose.Schema({
    category : {
      type: String,
      required: 'Category is required'
    },
    is_adult : {
      type: Boolean,
    }},
    {timestamps: { currentTime: () => Math.floor(Date.now()) }},
  )

  //export the model
  export default mongoose.model('Counter', CounterSchema)