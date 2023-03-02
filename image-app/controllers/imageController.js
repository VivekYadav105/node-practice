const imageModel = require('../models/image')

const imageUpload = async (req, res, next) => {
  try {
    console.log(req.body);
    const { image, title } = await req.body;
    console.log(req.file);
    if (req.file==={}) {
      throw new Error("unable to upload please try later");
    }
    const {filename,originalname,mimetype,destination,size} =req.file
    var {path} = req.file
    path = path.replace(/\\/g,"/")

    const uploadDetails =await imageModel.create({
      title:title,
      filename:filename,
      originalname:originalname,
      type:mimetype,
      path:"/"+path,
      destination:destination,
      size:size})
    res.redirect("/image/upload");
  } catch (err) {
    console.log(err)
    res.send(err);
  }
};

const imageUploadPage = (req, res, next) => {
  res.render("ImgUpload.pug");
};

const home = async(req,res,next)=>{
  const images = await imageModel.find({}).limit(15)
  res.render("home.pug",{images:images})
}

const imageView = async(req,res,next)=>{
  if(!req.params.id){throw new Error("something went wrong please try later")}
  const id = req.params.id
  const image = await imageModel.findById({id})
  if(!image){throw new Error("no image exists with given id")}
  res.render("view.pug",{image:image})
}

const imageEditPage = async(req,res,next)=>{
  if(!req.params.id){throw new Error("something went wrong please try later")}
  const id = req.params.id
  const image = await imageModel.findById(id)
  if(!image){throw new Error("no image exists with given id")}
  res.render("view.pug",{image:image})
}

const imageEdit = async(req,res,next)=>{
  if(!req.params.id){throw new Error("something went wrong please try later")}
  const id = req.params.id
  const details = req.body
  const image = await imageModel.findOneAndUpdate({_id:id},{$set:{details}})
  if(!image){throw new Error("no image exists with given id")}
  res.render("view.pug",{image:image})
}

const imageDelete = async(req,res,next)=>{
  if(!req.params.id){throw new Error("something went wrong please try later")}
  const id = req.params.id
  const image = await imageModel.findOneAndDelete({_id:id})
  //add multer code in the schema methods
  res.redirect('/image/home')
}


module.exports = { imageUpload, imageUploadPage,home,imageView,imageEdit,imageEditPage,imageDelete };
