const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator'); // bibliotheque api pour rendre les attributs unique 
const bcrypt = require('bcrypt');//pour avoir mot de passe chiffré 
const saltRounds = 10;

const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        default: '',
        unique: true,
        validate:
        {
            validator: function ValidateEmail(v) {
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v))
                //w{2,3} lazemha tkoun fila5er .org .com .tn ya3ni . w ba3édha 7aja tetkawén par 2 ou 3 caractéresZZZ
            },
            message: 'email is invalid'
        }
    },
    password: {
        type: String,
        required: true,
        default: '',
        // validate: {
        //     validator: function password1(p) {
        //         var phoneno = /^[A-Za-z]\w{7,14}$/;//yebda bel majuscule w fih 14 caractéres
        //         return (phoneno.test(p))
        //     },
        //     message: 'you must provid a valide password'
        // }
    },
    phone: {
        type: Number,
        required: true,
        default: '',
    },
    image: {
        type: String
    },
    resetLink: {
        type: String,
        default: ''
    }
}, { timestamps: true })//pour ajouter createdat et updatedat des modeles
schemaUser.plugin(uniqueValidator)//affectih l schemauser bech ywali unique
schemaUser.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds)//pour avoir mdp chiffré 
    next();
})
module.exports = mongoose.model('User', schemaUser)