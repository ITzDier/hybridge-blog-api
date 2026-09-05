const express = require('express');
const router = express.Router();
const db = require('../models');
const requireAuth = require('../middlewares/auth');

// POST - Crear un nuevo autor
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'El campo name es obligatorio' });
    }
    const author = await db.Author.create({ name });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el autor' });
  }
});

// GET - Obtener todos los autores
router.get('/', async (req, res) => {
  try {
    const authors = await db.Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
});

// GET - Obtener un autor por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const author = await db.Author.findByPk(id);
    
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el autor' });
  }
});

// PATCH - Actualizar un autor por ID
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const author = await db.Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    await author.update({ name });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el autor' });
  }
});

// DELETE - Eliminar un autor por ID
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const author = await db.Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    await author.destroy();
    res.json({ message: 'Autor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el autor' });
  }
});

module.exports = router;