const express = require('express');
const router = express.Router();
const db = require('../models')


//get messages
router.get('/', async function (req, res) {
  let foundMessages = await db.Message.find()
  return res.json(foundMessages)
})

//create messages
router.post('/:userid/create', async function (req, res, next) {
  try {
    //get find user and get user's message body
    let message = await db.Message.create(req.body)
    let user = await db.User.findById(req.params.id)

    user.messages.push(message)
    user.save()
    message.save()
    return res.json(user)
  } catch (err) {
    console.log(err)
    return next(err)
  }
})

//delete messages
router.post('/:userid/delete/:messageid', async(req, res, next) => {
  try {
    let message = await db.Message.findById(req.params.messageid);
    message.remove();
    return res.json(message);
  } catch (err) {
    console.log(err)
    return next(err)
  }
})


module.exports = router;