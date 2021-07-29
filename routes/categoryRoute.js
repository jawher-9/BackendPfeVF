const CategoryController = require("../controllers/categoryController");
const router = require("express").Router();
const auth = require("../middelwares/authentification");

  router.get("/all", CategoryController.getALLCategory);
  router.post("/save", auth.validateUser, CategoryController.CreateCategory );
  router.delete("/delete/:id",auth.validateUser, CategoryController.DeleteCategory);
  router.put("/update/:id",auth.validateUser,CategoryController.EditCategory);
 
module.exports = router;
    