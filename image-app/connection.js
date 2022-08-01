const mongoose = require("mongoose");

const connection = (url, callback_function) => {
  mongoose
    .connect(url)
    .then(() => {
      callback_function();
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = connection