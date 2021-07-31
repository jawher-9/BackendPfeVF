const categorycontroller= require('../controllers/categoryController')
const route=require('express').Router()
const auth=require('../middelwares/authentification')

route.post('/save',auth.validateUser,categorycontroller.CreateCategory)
route.get('/all',categorycontroller.GetALLCategory)
route.get('/getone/:id',auth.validateUser,categorycontroller.GetCategoryById)
route.delete('/delete/:id',auth.validateUser,categorycontroller.DeleteCategory)
route.put('/update/:id',auth.validateUser,categorycontroller.UpdateCategory)

module.exports=route