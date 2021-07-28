const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
let venteSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  price: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  phone: {
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
  },  */

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'Comment'
  }]
}, {timestamps:true})
let Vente = mongoose.model('Vente', venteSchema)
module.exports = Vente