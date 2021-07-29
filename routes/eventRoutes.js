const EventController = require("../controllers/eventController");
const router = require("express").Router();
const multer=require('../middelwares/uploads')
const auth = require ('../middelwares/authentification')

router.get("/all", EventController.GetAllEvent);
router.post("/save",auth.validateUser,multer.single('file'), EventController.CreateEvent);
router.delete("/delete/:id", auth.validateUser, EventController.DeleteEvent);
router.put("/update/:id",auth.validateUser, EventController.EditEvent); 

module.exports = router;
