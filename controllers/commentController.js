
const Comment = require('../models/commentModel')
const Post = require('../models/postModel')
const express=require('express')
module.exports={
  
    CreateComment:async (req, res) => {
    const commentObj = req.body 
    commentObj.id_creator = req.user._id
    Comment
      .create(commentObj)
      .then((createdComment) => {
        Post
          .findById(createdComment.postId)
          .then(post => {
            let postComments = post.comments
            postComments.push(createdComment._id)
            post.comments = postComments
            post
              .save()
              .then(() => {
                res.status(200).json({
                  success: true,
                  message: 'Comment created successfully',
                  data: createdComment
                })
                
              })
              .catch((err) => {
                console.log(err)
                const message = 'Something went wrong :('
                return res.status(401).json({
                  success: false,
                  message: message
                })
              })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :('
        return res.status(401).json({
          success: false,
          message: message
        })
      })
  },
  getALLComments:async (req,res)=>{
    Comment.find({}).
    populate('id_creator')
    .then(comments => {
      res.status(200).json(comments)
    })
  },
  EditComment: async (req, res) => {
    const commentId = req.params.id
    let existingComment = await Comment.findById(commentId)
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(401).json({
          success: false,
          message: message
        })
      })
    if (req.user._id.toString() === existingComment.id_creator.toString()) {
      const commentObj = req.body      
      existingComment.text = commentObj.text
      existingComment
        .save()
        .then(editedComment => {
          res.status(200).json({
            success: true,
            message: 'Comment Edited Successfully.',
            data: editedComment
          })
        })
        .catch((err) => {
          console.log(err)
          let message = 'Something went wrong :( Check the form for errors.'
          return res.status(401).json({
            success: false,
            message: message
          })
        })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials!'
      })
    }
  },
  DeleteComment:async (req, res) => {
    const commentId = req.params.id
    let comment = await Comment.findById(commentId)
      .catch((err) => {
        console.log(err)
        const message = 'Entry does not exist!'
        return res.status(401).json({
          success: false,
          message: message
        })
      })
    if (req.user._id.toString() === comment.id_creator.toString()) {
      let post = await Post.findById(comment.postId)
      console.log(post.comments)
      let postComments = post.comments.filter(c => c.toString() !== commentId)
      post.comments = postComments
      await post.save()
      comment
        .remove()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Comment deleted successfully!'
          })
        })
        .catch((err) => {
          console.log(err)
          return res.status(401).json({
            success: false,
            message: 'Something went wrong :('
          })
        })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }
  }
}