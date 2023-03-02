const userModel = require('../models/user')

const loginPage = (req,res,next)=>{
    res.render('login.ejs')
}

const registerPage = (req,res,next)=>{
    res.render('register.ejs')
}
const homePage = (req,res,next)=>{
    res.render('home.ejs')
}
const newSecretPage = (req,res,next)=>{
    res.render('submit.ejs')
}
const secretsPage = (req,res,next)=>{
    res.render('secrets.ejs')
}

const registerUser = async (req,res,next)=>{
    if(!req.body){throw new Error("something went wrong")}
    console.log(req.body)
    const {username,password} =await req.body
    console.log(username,password)
    if((await userModel.find({username:username})).length){throw new Error("user already exists in database")}
    const user = await userModel.create({username:username,password:password},{new:true})
    res.redirect('/login')
}

const loginUser = async (req,res,next)=>{
    if(!req.body){throw new Error("something went wrong")}
    console.log(req.body)
    const {username,password} =await req.body
    console.log(username,password)
    const user =await userModel.findOne({username:username})
    if(user){
        if(user.password === password){res.redirect("/")}
        else{
            res.redirect("/login")
        }
    }
    else{
        throw new Error("user does not exists in database")
    }
    // const user = await userModel.create({username:username,password:password},{new:true})
    res.redirect('/login')
}

module.exports = {loginPage,registerPage,homePage,newSecretPage,secretsPage,registerUser,loginUser}

