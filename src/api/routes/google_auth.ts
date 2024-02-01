export {}
const express = require('express')

const { signUserIn } = require('../controllers/google_auth')

const router = express.Router();


router.get('/google', signUserIn)



module.exports = router