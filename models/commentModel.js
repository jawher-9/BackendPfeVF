const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
let commentSchema = mongoose.Schema({
    id_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    text: {
        type: mongoose.Schema.Types.String,
        required: REQUIRED_VALIDATION_MESSAGE
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: REQUIRED_VALIDATION_MESSAGE,
        ref: 'Post'
    }
}, { timestamps: true })
let Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment