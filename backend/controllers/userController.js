const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const logoutUser = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0), secure: process.env.NODE_ENV === 'production' });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      const token = generateToken(updatedUser._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        token,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');

      user.resetToken = resetToken;
      user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
      await user.save();

      const resetUrl = `http://localhost:5000/passwordreset/${resetToken}`;

      const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

      // Send email (setup nodemailer as per your requirements)
      const transporter = nodemailer.createTransport({
        // setup your transporter
      });

      await transporter.sendMail({
        to: user.email,
        subject: 'Password Reset Token',
        text: message,
      });

      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
      const user = await User.findOne({
        resetToken,
        resetTokenExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid token or token expired' });
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 10);

      // Check if new password has been used before
      const isUsedBefore = user.passwordHistory.some(async (history) => {
        return await bcrypt.compare(newPassword, history.password);
      });

      if (isUsedBefore) {
        return res.status(400).json({ message: 'New password cannot be the same as any of the previous passwords' });
      }

      user.passwordHistory.push({ password: newPasswordHash });
      if (user.passwordHistory.length > 5) {
        user.passwordHistory.shift(); // Keep only last 5 passwords
      }

      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;
      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {
    registerUser,
    authUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
  }
}