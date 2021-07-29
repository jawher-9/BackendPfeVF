const Category = require('../models/categoryModel')
const Comment = require('../models/commentModel')
module.exports={
   CreateCategory:async (req, res) => {
    const CategoryObj = {
        title:req.body.title
        }
  //  postObj.id_author = req.user._id
    console.log(CategoryObj)
    Category
      .create(CategoryObj)
      .then((createdCategory) => {
        Category
          .findById(createdCategory.id)
          .then((category) => {
            res.status(200).json({
              success: true,
              message: 'category added successfully.',
              data: category
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
  
   EditCategory:async (req, res) => {
    const categoryId = req.params.id
    let Category = await categoryId.findById(categoryId)
    //if (req.user._id.toString() === post.id_author.toString()) {
      const categoryObj = req.body
      
      //postObj.id_author = req.user._id
      Category
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
  /*   } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials!'
      })
    } */
  },
  
  getALLCategory: async (req, res) => {
    Category
      .find()
      /*.populate({
        path : 'comments',
        populate : {
          path : 'id_creator'
        }
      })
      .populate('id_author')
      */
      .then(categories => {
        res.status(200).json(categorys)
      })
  },
  
  DeleteCategory:async (req, res) => {
    const categoryId = req.params.id
    
    Category
        .findById(categoryId)
        .then((category) => {
          category
            .remove()
            .then(() => {
              return res.status(200).json({
                success: true,
                message: 'Category deleted successfully!'
              })
            })
        })
        .catch(() => {
          return res.status(401).json({
            success: false,
            message: 'Entry does not exist!'
          })
        })
   
    }
}