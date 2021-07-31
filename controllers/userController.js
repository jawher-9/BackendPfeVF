const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const randtoken= require('rand-token')
const nodemailer = require("nodemailer");
const  _ =  require ('lodash') ; 
const { size } = require('lodash');
var RefreshTokens=[]
module.exports= {
    CreateUser: function (req, res){
        const newuser={
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: "images/facebookprofilepic.jpg"
        }
        User.create(newuser, (err, user) =>{
            if(err)
            res.status(500).json
            ({
                message: err,
                statut: 500
            })
            else
            res.status(200).json({
                message: 'user added',
                statut: 200,
                data: user
            })
        })
    },
    GetALLUser:function(req,res){
        var size=4//size howa nbre user par page me3neha kol page feha 4
        var page=Math.max(0,parseInt(req.params.page))
        User.find({}).select('name phone').sort({name:'1'}).skip(size * page).limit(size).exec((err, listusers)=>{//1 ou bien -1 décroissant
            if(err)
            res.status(500).json
            ({
                message: err,
                statut: 500
            })
            else
            res.status(200).json({
                message: 'user founded',
                statut: 200,
                data: listusers
        })
    })
    },
    GetALLUser1:function(req,res){
        User.find({}).exec((err, listusers)=>{//1 ou bien -1 décroissant
            if(err)
            res.status(500).json
            ({
                message: err,
                statut: 500
            })
            else
            res.status(200).json({
                message: 'user founded',
                statut: 200,
                data: listusers
        })
    })
    },
    GetUserById: function (req, res){
        User.findById({_id:req.params.id}).exec((err, user)=>{
            if(err)
            res.status(500).json
            ({
                message: err,
                statut: 500
            })
            else
            res.status(200).json({
                message: 'user found by id',
                statut: 200,
                data: user
        })
    })
    },
    DeleteUser: function (req, res){
        User.deleteOne({_id: req.params.id }).exec((err, user)=> {
            if(err)
            res.status(500).json
            ({
                message: err,
                statut: 500
            })
            else
            res.status(200).json({
                message: 'user deleted',
                statut: 200,
                data: user
        })
    })
},
    UserUpdate:  function (req, res){
      User.updateOne({_id: req.params.id},req.body).exec((err,userupdated) =>{
            if(err)
            res.status(500).json
            ({
                message: err,
                statut: 500
             })
             else
             res.status(200).json({
                message: 'user update',
                 statut: 200,
                 data: userupdated
         })
    })
     },
     AuthenticateUser: function (req, res, next) {
        User.findOne({ email: req.body.email }, 
            function (err, userInfo) {
            if (err|| !userInfo) {
                res.json({ 
                    status: "error",
                    message: "Invalid email/password!!!",
                    data: err });
            }
            else  {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({    //sign pour creation de token
                        id: userInfo._id,
                        user:userInfo
                    },
                        req.app.get('secretKey'),
                        { expiresIn: '6h' }); 
                        var refreshToken=randtoken.uid(256)
                        RefreshTokens[refreshToken]=userInfo._id
                    res.json({ 
                    status: "success", 
                    message: "user found!!!", 
                    data: { 
                    user: userInfo, 
                    token: token, 
                    refreshtoken:refreshToken} });
                } else {
                    res.json({ 
                     status: "error",
                     message: "Invalid email/password!!!",
                     data: null });
                }
            }
        });
    },
    RefreshToken:function(req,res){
        var id=req.body._id
        var RefreshToken = req.body.RefreshToken
        console.log('refresh',(RefreshToken in RefreshTokens))
        if((RefreshToken in RefreshTokens) && (RefreshTokens[RefreshToken]==id)){
            var user = {'id':id}
            var token = jwt.sign(user,req.app.get('secretKey'),{
                expiresIn: "1m"
            })
            res.json({
                accesstoken:token
            })
        }
            else{
                res.sendStatus(401)
            }
    },
    LogoutUser:function(req, res, next) {
        var refreshToken = req.body.refreshToken
        console.log("refreshTokens : ", RefreshTokens)
        jwt.verify(req.headers['x-access-token'],
         req.app.get('secretKey'),(err,decoded)=>{
            if (refreshToken in RefreshTokens) {
                delete RefreshTokens[refreshToken]
                res.json({
                    status: "success",
                    message: "Logout",
                    data: refreshToken
                });
            }
            else
            {
                res.json({
                    status: "error",
                    message: "No Logout",
                    data: null
                });
            }
        })
    },
    SendMailUser:function(req,res){
        var data = {
            from: "essidnissaf@gmail.com",
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        };
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "essidnissaf@gmail.com",
                pass: "papoutimamati"
            }
        });
        transporter.sendMail(data, function (error, info) {
            if (error) {
                console.log(error)
                return res.json({ err: "error in email"+error})
            } else {
                return res.json({
                    message: "email has been send"
                });
            }
        });
    },
    Forgotpassword : function (req, res) {
        const Email= req.body.email;
        User.findOne({email: req.body.email}, (err, user) => {
              console.log(req.body.email)
            if (err || !user) {
                return res.status(400).json({
                    error: "email does not exist"+err
                });
            }
            const token = jwt.sign({_id: user._id}, req.app.get('secretKey'), {  expiresIn: '2h'});
            console.log(token)
            var data = {
                from: "votreemail@gmail.com",
                to: Email,
                subject: "Forget Password",
                text: `<p>http://localhost:4200/reset/${token}</p>`
            };
            return User.findOneAndUpdate({email:Email},{resetLink:token},(err,info)=>{
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'votreemail@gmail.com',
                        pass: 'votreemail'
                    }
                });
                transporter.sendMail(data, function (error, info) {
                    if (error) {
                        console.log(error)
                        return res.json({ err: "error in email"})
                    } else {
                        return res.json({
                            message: "email has been send"
                        });
                    }
                });
             })      
        })
    },
    resetpassword : function (req, res) {
         resetLink=req.params.resetLink;
         newPass = req.body.newPass;
         console.log(req.body.newPass)
        if (resetLink) {
        jwt.verify(resetLink, req.app.get('secretKey'), function (err, decodeData) {  
            if (err) {
                    return res.json({
                        error: "incorrect token or it is exprired"
                    })
                }
                User.findOne({resetLink:resetLink}, (err, user) => {   
                    if (err || !user) {
                        return res.json({
                            error: "user with this token does not exist"
                        });
                    }
                    const obj = {
                        password: req.body.newPass
                    }
                    user = _.extend(user, obj);      
                    user.save((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: "reset password error"+err
                            });
                        }
                         else
                         {
                            return res.status(200).json({
                                message: "password has been changed"
                            });
                        }
                    })
                })
            })
        } 
        else
        {
            return res.status(401).json({
                error: "authentification erreur"
            });
        }
    },
    get_Profile_User :function (req, res) {
        let user_id = req.user._id;
        User.findById(user_id)
            .populate()
            .exec()
            .then((user) => {
                let response = {
                    state: "success",
                    message: "user found",
                    data: user
                };
                res.status(200).json(response);
            }).
            catch((err) => {
            console.log(err);
            res.status(500).json({message: "server error", error: err, data: null})
        })
    },
}