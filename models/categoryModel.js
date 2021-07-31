const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator'); // bibliotheque api pour rendre les attributs unique 
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
let categorySchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE,
    unique: true,
  },
  

  vente: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'Vente'
  }]  
 
}, {timestamps:true})
let Category = mongoose.model('Category', categorySchema)
module.exports = Category