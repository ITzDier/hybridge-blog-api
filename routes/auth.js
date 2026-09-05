const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST - Generar Token JWT de prueba
router.post('/login', async (req, res) => {
  try {
    const payload = { id: 1 };
    const secret = process.env.JWT_SECRET || 'secreto_super_seguro';

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al ingresar' });
  }
});

module.exports = router;