const fs = require("fs");
const imageModel = require('../models/image')

const imageUpload = async (req, res, next) => {
  try {
    console.log(req.body);
    const { image, title } = await req.body;
    console.log(req.file);
    if (req.file==={}) {
      throw new Error("unable to upload please try later");
    }
    const {filename,originalname,mimetype,destination,size,path} =req.file
    
    const uploadDetails =await imageModel.create({
      title:title,
      filename:filename,
      originalname:originalname,
      type:mimetype,
      path:path,
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

module.exports = { imageUpload, imageUploadPage };
