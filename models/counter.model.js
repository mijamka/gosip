// schema for the button clicks tracking
//save the category passed, date, and the information was the user underage or not

import mongoose from 'mongoose'

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

  export default mongoose.model('Counter', CounterSchema)