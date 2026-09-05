const express = require('express');
const router = express.Router();
const db = require('../models');
const requireAuth = require('../middlewares/auth');

// GET - Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const posts = await db.Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
});

// GET - Obtener una publicación por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
});

// POST - Crear una nueva publicación
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !content || !authorId) {
      return res.status(400).json({ error: 'Los campos title, content y authorId son obligatorios' });
    }

    const newPost = await db.Post.create({ title, content, authorId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
});

// PUT - Actualizar una publicación por ID
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, authorId } = req.body;

    const post = await db.Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    await post.update({ title, content, authorId });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la publicación' });
  }
});

// DELETE - Eliminar una publicación por ID
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    await post.destroy();
    res.json({ message: 'Publicación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la publicación' });
  }
});

module.exports = router;