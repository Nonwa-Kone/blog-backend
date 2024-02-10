const express = require('express');
const authentification = require('../middlewares/Auth');
const { createUser, loginUser, profilUser, logoutUser } = require('../controllers/User');

const router = express.Router()

// Route register
router.post('/register', createUser);
// Route Login
router.post("/login", loginUser);
// Route profil user
router.get("/me", authentification, profilUser)
// Route Logout
router.post("/logout", authentification, logoutUser)

module.exports = router