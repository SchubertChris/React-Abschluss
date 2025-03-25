const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// @desc    Benutzer registrieren
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Prüfen, ob Benutzer bereits existiert
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Benutzer existiert bereits');
  }

  // Neuen Benutzer erstellen
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Ungültige Benutzerdaten');
  }
});

// @desc    Benutzer authentifizieren & Token erhalten
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Benutzer anhand der E-Mail finden
  const user = await User.findOne({ email });

  // Prüfen, ob Benutzer existiert und Passwort korrekt ist
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Ungültige E-Mail oder Passwort');
  }
});

// @desc    Benutzerprofil abrufen
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user wird durch die auth-Middleware gesetzt
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('Benutzer nicht gefunden');
  }
});

module.exports = { registerUser, loginUser, getUserProfile };