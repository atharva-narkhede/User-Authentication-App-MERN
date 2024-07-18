const { check, validationResult } = require('express-validator');

const validateRegister = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

module.exports = { validateRegister, validateLogin };
