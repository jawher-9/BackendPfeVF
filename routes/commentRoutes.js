const CommentController=require('../controllers/commentController');
const router= require('express').Router() 
const auth=require('../middelwares/authentification')

    router.post("/save",auth.validateUser ,CommentController.CreateComment);
    router.get("/all", CommentController.getALLComments);
    router.delete("/delete/:id",auth.validateUser,  CommentController.DeleteComment);
    router.put("/update/:id",auth.validateUser,CommentController.EditComment);

module.exports=router