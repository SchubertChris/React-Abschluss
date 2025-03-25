const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Benutzer-Schema definieren
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Bitte geben Sie Ihren Vornamen ein'],
      minLength: [2, 'Vorname muss mindestens 2 Zeichen lang sein'],
      maxLength: [25, 'Vorname darf nicht länger als 25 Zeichen sein'],
    },
    lastName: {
      type: String,
      required: [true, 'Bitte geben Sie Ihren Nachnamen ein'],
      minLength: [2, 'Nachname muss mindestens 2 Zeichen lang sein'],
      maxLength: [25, 'Nachname darf nicht länger als 25 Zeichen sein'],
    },
    email: {
      type: String,
      required: [true, 'Bitte geben Sie Ihre E-Mail-Adresse ein'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein'],
    },
    password: {
      type: String,
      required: [true, 'Bitte geben Sie ein Passwort ein'],
      minLength: [6, 'Passwort muss mindestens 6 Zeichen lang sein'],
    },
  },
  {
    timestamps: true, // Erstellt automatisch createdAt und updatedAt Felder
  }
);

// Middleware zum Hashen des Passworts vor dem Speichern
userSchema.pre('save', async function (next) {
  // Nur ausführen, wenn das Passwort geändert wurde
  if (!this.isModified('password')) {
    next();
  }

  // Passwort hashen
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Methode zum Vergleichen des eingegebenen Passworts mit dem gespeicherten Hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;