const router = require('express').Router()
// const addUser = require('../Controllers/addUser')
// const login = require('../Controllers/login')
const {login , signup} = require('../Controllers/user')
const loggedinOnly = require('../Middlewares/auth');

router.post('/signup',signup)
router.post('/login',login)
router.get('/check', loggedinOnly, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});
module.exports = router;