const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
const Post = require('../models/postModel')

let eventSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },

  phone: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },

  id_author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },  

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'Comment'
  }]
}, 
)
let Event = Post.discriminator('Event', eventSchema)
module.exports = Event