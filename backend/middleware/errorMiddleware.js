// Middleware für nicht gefundene Routen
const notFound = (req, res, next) => {
  const error = new Error(`Nicht gefunden - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware für die zentrale Fehlerbehandlung
const errorHandler = (err, req, res, next) => {
  // Wenn der Statuscode bereits 200 ist, setzen wir ihn auf 500 (Server-Fehler)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    // Stack-Trace nur in der Entwicklungsumgebung anzeigen
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };