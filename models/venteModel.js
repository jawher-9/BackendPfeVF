const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
const Post = require('../models/postModel')

let venteSchema = new mongoose.Schema({
  title: {
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

  
  id_category: {
    type: mongoose.Schema.Types.ObjectId,
   //required: REQUIRED_VALIDATION_MESSAGE,
   ref: 'Category'
  },  


}
)
let Vente = Post.discriminator('Vente', venteSchema)
module.exports = Vente