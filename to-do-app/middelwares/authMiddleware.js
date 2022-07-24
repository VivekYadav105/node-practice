const verifyUser = (req,res,next)=>{
    if(!req.user){ res.redirect('/login')}
    else{
        next()
    }
}

