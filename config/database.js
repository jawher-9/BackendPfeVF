const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/dbpfe',
{useNewUrlParser:true ,useCreateIndex: true,
useUnifiedTopology:true,useFindAndModify:false},(err)=>{
    if(err)
    console.log('connection failed'+err)
    else
    console.log('db is connected')
})

module.exports=mongoose