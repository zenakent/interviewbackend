const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/chatApp", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})


mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Message = require('./message');