const Category = require("../models/categoryModel");
const Post = require("../models/postModel");
const express = require("express");
module.exports = {
  CreateCategory: async (req, res) => {
    const categoryObj = req.body;
    console.log(categoryObj);
    Category.create(categoryObj)
      .then(() => {
        //traitement aal title
        res.status(200).json({
          success: true,
          message: "category created successfully",
          data: createdCategory,
        });
      })
      .catch((err) => {
        console.log(err);
        const message = "Something went wrong :(";
        return res.status(401).json({
          success: false,
          message: message,
        });
      })
  },


/*   getALLCategory: async (req, res) => {
    Category.find({})
      .populate("post")
      .then((categorys) => {
        res.status(200).json(categorys);
      });
  },
  EditComment: async (req, res) => {
    const commentId = req.params.id;
    let existingComment = await Comment.findById(commentId).catch((err) => {
      console.log(err);
      const message = "Something went wrong :( Check the form for errors.";
      return res.status(401).json({
        success: false,
        message: message,
      });
    });
    if (req.user._id.toString() === existingComment.id_creator.toString()) {
      const commentObj = req.body;
      existingComment.text = commentObj.text;
      existingComment
        .save()
        .then((editedComment) => {
          res.status(200).json({
            success: true,
            message: "Comment Edited Successfully.",
            data: editedComment,
          });
        })
        .catch((err) => {
          console.log(err);
          let message = "Something went wrong :( Check the form for errors.";
          return res.status(401).json({
            success: false,
            message: message,
          });
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
  },
  DeleteComment: async (req, res) => {
    const commentId = req.params.id;
    let comment = await Comment.findById(commentId).catch((err) => {
      console.log(err);
      const message = "Entry does not exist!";
      return res.status(401).json({
        success: false,
        message: message,
      });
    });
    if (req.user._id.toString() === comment.id_creator.toString()) {
      let post = await Post.findById(comment.postId);
      console.log(post.comments);
      let postComments = post.comments.filter(
        (c) => c.toString() !== commentId
      );
      post.comments = postComments;
      await post.save();
      comment
        .remove()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Comment deleted successfully!",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(401).json({
            success: false,
            message: "Something went wrong :(",
          });
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  },  */
};