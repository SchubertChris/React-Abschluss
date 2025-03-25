const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Route für die Benutzerregistrierung
router.post('/register', registerUser);

// Route für den Login
router.post('/login', loginUser);

// Route für das Benutzerprofil (geschützt durch JWT)
router.get('/profile', protect, getUserProfile);

module.exports = router;