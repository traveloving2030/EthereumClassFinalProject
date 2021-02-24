var router = require('express').Router()

const MainRouter = require('./Main')
const loginRouter = require('./loginRouter')
const userRouter = require('./userRouter')


router.use('/', MainRouter)
router.use('/login', loginRouter)
router.use('/user', userRouter)

module.exports = router;