const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator'); // bibliotheque api pour rendre les attributs unique 

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
let abonnesSchema = mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true
    },

    abonnes: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'User'
      }]


}, { timestamps: true })
abonnesSchema.plugin(uniqueValidator)//affectih l schemauser bech ywali unique

let Abonnes = mongoose.model('Abonnes', abonnesSchema)
module.exports = Abonnes