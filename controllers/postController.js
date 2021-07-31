const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
module.exports={
   CreatePost:async (req, res) => {
    const postObj = {
        content:req.body.content,
        image:req.file.filename
        }
    postObj.id_author = req.user._id
    console.log(postObj)
    Post
      .create(postObj)
      .then((createdPost) => {
        Post
          .findById(createdPost.id)
          .then((post) => {
            res.status(200).json({
              success: true,
              message: 'Post added successfully.',
              data: post
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Skusaa neshto'
            return res.status(401).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        return res.status(401).json({
          success: false,
          message: message+err
        })
      })
  },
   EditPost:async (req, res) => {
    const postId = req.params.id
    let post = await Post.findById(postId)
    if (req.user._id.toString() === post.id_author.toString()) {
      const postObj = req.body
      
      postObj.id_author = req.user._id
      Post
        .findById(postId)
        .then(existingPost => {
          existingPost.title = postObj.title
          existingPost.content = postObj.content
          existingPost
            .save()
            .then(editedPost => {
              Post
                .findById(editedPost._id)
                .populate('comments')
                .then((post) => {
                  res.status(200).json({
                    success: true,
                    message: 'Post edited successfully.',
                    data: post
                  })
                })
                .catch((err) => {
                  console.log(err)
                  let message = 'Skusa neshto'
                  return res.status(401).json({
                    success: false,
                    message: message
                  })
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
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
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
  GetAllPost: async (req, res) => {
    Post
      .find().populate({
        path : 'comments',
        populate : {
          path : 'id_creator'
        }
      })
      .populate('id_author')
      .then(posts => {
        res.status(200).json(posts)
      })
  },
  DeletePost:async (req, res) => {
    const postId = req.params.id
    let post = await Post.findById(postId)
    if (req.user._id.toString() === post.id_author.toString()) {
      let postComments = post.comments
      for (let id of postComments) {
        await Comment.findById(id)
          .remove()
      }
      Post
        .findById(postId)
        .then((post) => {
          post
            .remove()
            .then(() => {
              return res.status(200).json({
                success: true,
                message: 'Post deleted successfully!'
              })
            })
        })
        .catch(() => {
          return res.status(401).json({
            success: false,
            message: 'Entry does not exist!'
          })
        })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials!'
      })
    }
  }
}