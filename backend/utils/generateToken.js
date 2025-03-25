const jwt = require('jsonwebtoken');

// Generiert einen JWT-Token mit der Benutzer-ID als Payload
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token ist 30 Tage gültig
  });
};

module.exports = generateToken;