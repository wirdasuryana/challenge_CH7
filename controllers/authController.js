const { User } = require("../models")
const passport = require("../lib/passport")
const user = require("../models/user")

// tambahan jwt
// function format(user){
//   const {id,username} = user

//   return {
//     id,
//     username,
//     accessToken: user.generateToken()
//   }
// }
//sampai dengan disini
module.exports = {
  registerForm: (req, res) => {
    res.render ('register')
  },
  register: (req, res, next) => {
    User.register(req.body)
      .then(() => {
        res.redirect('/login')
      }).catch(err => next(err))
  },
  loginForm: (req, res) => {
    res.render('login')
  },
  login: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),

  whoami: (req, res) => {
    res.render('profile', { user : req.user.dataValues})
  }
  
  //tambahan jwt
  // login: (req, res) => {
  //   User.authenticate(req.body).then(user => {
  //     res.json(
  //       format(user)
  //     )
  //   })
  // }
}