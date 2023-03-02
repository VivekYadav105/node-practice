const express = require("express");
const {upload} = require('../middlewares/imageMiddleware')

const {
  imageUpload,
  imageUploadPage,
  home,imageEditPage,imageDelete,imageEdit,imageView
} = require("../controllers/imageController");


require("dotenv").config();

const imageRouter = express.Router();

imageRouter.route("/upload").get(imageUploadPage).post(upload.single("MyImage"), imageUpload);
imageRouter.route("/home").get(home)
imageRouter.route('/edit').post(imageEdit).get(imageEditPage)
imageRouter.route('/delete').post(imageDelete)
imageRouter.route('/view/:id').get(imageView)

module.exports = imageRouter;
