const express = require('express')
const {registerUser, authUser, submitApplication, checkStatus}= require('../controllers/userControllers')

const router = express.Router()

router.post('/register',registerUser)

router.post('/login',authUser)
router.get("/checkStatus/:email", checkStatus);
router.post("/submitApplication", submitApplication);


module.exports = router

