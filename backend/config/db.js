const mongoose = require('mongoose');

// Funktion zur Herstellung der Verbindung mit MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB verbunden: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Fehler bei der Datenbankverbindung: ${error.message}`);
    process.exit(1); // Beendet den Prozess bei einem Fehler
  }
};

module.exports = connectDB;