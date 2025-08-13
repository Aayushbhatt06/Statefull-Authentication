const router = require('express').Router()
const addUser = require('../Controllers/addUser')
const login = require('../Controllers/login')

router.post('/signup',addUser)
router.post('/login',login)

module.exports = router;