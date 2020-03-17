
const mongoose = require('mongoose')
const User = require('./user')

const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },
  message: String,
})

//remove messageID from the users messages array
MessageSchema.pre('remove', async function (next) {
  try {
    let user = await User.findById(this.user)
    user.messages.remove(this.id)
    await user.save()
    return next();
  } catch (err) {
    return next(err);
  }
})

module.exports = mongoose.model('Message', MessageSchema)