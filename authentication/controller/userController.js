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


module.exports = {loginPage,registerPage,homePage,newSecretPage,secretsPage}

