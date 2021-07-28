const VenteController = require("../controllers/venteController");
const router = require("express").Router();
const multer=require('../middelwares/uploads')
const auth = require ('../middelwares/authentification')

router.get("/all", VenteController.GetAllVente);
router.post("/save",auth.validateUser,multer.single('file'), VenteController.CreateVente);
router.delete("/delete/:id", auth.validateUser, VenteController.DeleteVente);
router.put("/update/:id",auth.validateUser, VenteController.EditVente); 

module.exports = router;
