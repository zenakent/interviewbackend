const express = require('express');
const router = express.Router();
const db = require('../models')
const passport = require('passport')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let users = await db.User.find()
  res.json(users)
});

//login user
router.post('/login', function (req, res, next) {
  console.log(req.body)
  next()
}, passport.authenticate('local'), (req, res) => {
    console.log('logged in')
    let user = { username: req.user.username }
    res.send(user)
})

//logout user
router.post('/logout', function (req, res) {
  req.logout()
})

//create user
router.post('/register', function (req, res) {
  console.log(req.body)
  db.User.register(new db.User({
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      res.redirect('back')
    }
    passport.authenticate("local")(req, res, function () {
      res.json(user)
    })
  })
})


module.exports = router;