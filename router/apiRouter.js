var router = require('express').Router()

const MainRouter = require('./Main')
const loginRouter = require('./loginRouter')
const studentRouter = require('./studentRouter')
const tutorRouter = require('./tutorRouter')

router.use('/', MainRouter)
router.use('/login', loginRouter)
router.use('/student', studentRouter)
router.use('/tutor', tutorRouter)

module.exports = router;