const multer = require("multer");
const fs = require("fs");

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

module.exports = {upload}