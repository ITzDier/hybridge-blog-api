// Importar dependencias
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const passport = require('passport');

// Importar rutas modulares
const authRoutes = require('./routes/auth');
const authorRoutes = require('./routes/authors');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// CAPAS DE SEGURIDAD (MIDDLEWARES)
// ==========================================
app.use(helmet());

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true 
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' }));

// ==========================================
// AUTENTICACIÓN PASSPORT
// ==========================================
app.use(passport.initialize());
require('./config/passport')(passport);

// ==========================================
// REGISTRO DE RUTAS
// ==========================================
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Hybridge Blog Posts' });
});

app.use('/api', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});