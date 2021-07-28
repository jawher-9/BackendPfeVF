const PostController = require("../controllers/postController");
const router = require("express").Router();
const multer=require('../middelwares/uploads')
const auth = require ('../middelwares/authentification')

router.get("/all", PostController.GetAllPost);
router.post("/save",auth.validateUser,multer.single('file'), PostController.CreatePost);
router.delete("/delete/:id", auth.validateUser, PostController.DeletePost);
router.put("/update/:id",auth.validateUser, PostController.EditPost); 

module.exports = router;
