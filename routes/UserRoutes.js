const usercontroller=require('../controllers/userController')
const route=require('express').Router()
const multer=require('../middelwares/uploads')
const auth=require('../middelwares/authentification')


route.post('/save',multer.single('file'),usercontroller.CreateUser)
route.get('/all',usercontroller.GetALLUser1)
route.post('/login',usercontroller.AuthenticateUser)



module.exports=route