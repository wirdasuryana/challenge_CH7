const router = require('express').Router()
const auth = require('./controllers/authController')
const passport = require('./lib/passport')
const restrict = require('./middlewares/restrict')


// router.get("/auth", (req, res) => { //tambahan jwat
//   res.send("masuk")
// })

// router.post("api/v1/auth/login", auth.login) //tambahan jwat

router.get('/', restrict, (req, res) => {
  res.render('index')
})

router.get('/register', auth.registerForm)
router.post('/register', auth.register)

router.get('/login', auth.loginForm)
router.post('/login', auth.login)

router.get('/whoami', restrict ,auth.whoami)
module.exports = router