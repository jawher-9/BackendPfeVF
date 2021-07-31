const abonnescontroller= require('../controllers/AbonnesController')
const route=require('express').Router()
const auth=require('../middelwares/authentification')

route.post('/save',auth.validateUser,abonnescontroller.CreateAbonne)
route.get('/all',auth.validateUser,abonnescontroller.GetALLAbonne)
route.get('/getone/:id',auth.validateUser,abonnescontroller.GetAbonneByUser)
route.delete('/delete/:id',auth.validateUser,abonnescontroller.DeleteAbonne)
route.put('/pushabonne',auth.validateUser,abonnescontroller.pushAbonnee)
route.put('/pullabonne',auth.validateUser,abonnescontroller.pullAbonnee)

module.exports=route