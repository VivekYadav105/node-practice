const express = require("express");
const multer = require("multer");
const fs = require('fs')
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const userId = 10;
    const path = `./public/uploads/${userId}/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    callback(null, path);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "---" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

const {
  imageUpload,
  imageUploadPage,
} = require("../controllers/imageController");

require("dotenv").config();

const imageRouter = express.Router();

imageRouter
  .route("/upload").get(imageUploadPage).post(upload.single("MyImage"), imageUpload);
// imageRouter.route('/edit').post(imageEdit).get(imageEdit)
// imageRouter.route('/delete').post(imageDelete).get(imageDelete)
// imageRouter.route('/view').post(imageView).get(imageView)

module.exports = imageRouter;
