const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }],
  contactList: [{
    contacts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }]
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema)