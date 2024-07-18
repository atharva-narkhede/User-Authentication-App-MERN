const express = require('express');
const { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validators');  // Ensure these validators exist

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, authUser);
router.post('/logout', protect, logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, validateRegister, updateUserProfile);

module.exports = router;
