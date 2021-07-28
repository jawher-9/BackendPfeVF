const express=require('express')
const cors=require('cors')
const app=express()
const bodyparser = require('body-parser')
const db=require('./config/database')
const routerUser = require('./routes/UserRoutes')
const routerPost = require('./routes/postRoutes')
const routerVente = require('./routes/venteRoute')
const routerComment = require('./routes/commentRoutes')
const routerCategory = require('./routes/categoryRoute')

app.use(cors())
app.use(bodyparser.json())


app.set('secretKey',"apibackend")//clé privé de chiffrement
app.get('/getfile/:image',function(req,res){//pour faire affichage image sur postman
    res.sendFile(__dirname+'/images/'+req.params.image)
})

app.use('/user',routerUser) 
app.use('/post',routerPost)
app.use('/vente',routerVente)
app.use('/comment',routerComment)
app.use('/category',routerCategory)



app.listen(3200,(err)=>{
    if(err)
    console.log('erreur de connexion',err)
    else
    console.log('server is running 3200')
})