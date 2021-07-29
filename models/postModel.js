const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
let postSchema = new mongoose.Schema({

  content: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },

  image: {
    type:String
  },
  

  id_author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  /* id_category: {
    type: mongoose.Schema.Types.ObjectId,
    required: REQUIRED_VALIDATION_MESSAGE,
    ref: 'Category'
  }, 
 */
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'Comment'
  }]
}, {timestamps:true})
let Post = mongoose.model('Post', postSchema)
module.exports = Post