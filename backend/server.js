const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Umgebungsvariablen laden
dotenv.config();

// Verbindung zur Datenbank herstellen
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Ermöglicht das Parsen von JSON-Anfragen

// CORS-Middleware für Entwicklungszwecke - sehr permissiv
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Standard CORS als Fallback
app.use(cors());

// Basis-Route
app.get('/', (req, res) => {
  res.send('API läuft...');
});

// CORS-Testroute
app.get('/api/test-cors', (req, res) => {
  res.json({ message: 'CORS ist erfolgreich konfiguriert!' });
});

// API-Routen
app.use('/api/auth', require('./routes/authRoutes'));

// Fehlerbehandlung
app.use(notFound);
app.use(errorHandler);

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft im ${process.env.NODE_ENV} Modus auf Port ${PORT}`);
  console.log(`CORS ist konfiguriert und erlaubt Anfragen von allen Ursprüngen (für Entwicklungszwecke)`);
});