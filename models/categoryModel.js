const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
let categorySchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  

  vente: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'Vente'
  }]  
 
}, {timestamps:true})
let Category = mongoose.model('Category', categorySchema)
module.exports = Category