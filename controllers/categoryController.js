const Category=require('../models/categoryModel')
module.exports = {
 CreateCategory: function(req,res){
     const newcategory= {
         title:req.body.title,
           }
     Category.create(newcategory, (err,category)=>{
         if(err)
         res.status(500).json
         ({
             message:err,
             statut:500
         })
         else
         res.status(200).json({
             message:'category added',
             statut:200 ,
             date:category
         })
     })
 },
 GetALLCategory: function(req,res){
     Category.find({}).exec((err,listcategory)=>{
         if(err)
         res.status(500).json({
             message:err,
             statut:500
                 })
        else
        res.status(200).json({
            message:'category founded',
            statut:200,
            date:listcategory
        })
         })
   },
   GetCategoryById : function(req,res){
       console.log('id',req.params.id)
       Category.findById({_id:req.params.id}).exec((err,category)=>{
           if(err)
           res.status(500).json({
               message:err,
               statut:500
           })
           else
           res.status(200).json({
               message:'category found by id',
               statut:200,
               date:category
           })
       })
   },
   DeleteCategory: function(req,res){
       Category.deleteOne({_id:req.params.id}).exec((err,category)=>{
           if(err)
           res.status(500).json({
               message:err,
               statut:500
           })
           else
           res.status(200).json({
               message:'category deleted',
               statut:200 ,
               date:category
           })
       })
   },
   UpdateCategory:function(req,res){
       console.log('id', req.params.id)
       Category.updateOne({_id:req.params.id},req.body).exec((err,category)=>{
           if(err)
           res.status(500).json({
               message:err,
               statut:500
           })
           else
           res.status(200).json({
               message:'category updated',
               statut:200,
               date:category
           })
       })
   }
}