import express from 'express';
import entryController from '../controllers/entryController.js';

const router = express.Router();

// GET /api/entries - List all entries
router.get('/', (req, res) => entryController.getAll(req, res));

// GET /api/entries/:id - Get single entry
router.get('/:id', (req, res) => entryController.getById(req, res));

// POST /api/entries - Create new entry
router.post('/', (req, res) => entryController.create(req, res));

// PUT /api/entries/:id - Update entry
router.put('/:id', (req, res) => entryController.update(req, res));

// DELETE /api/entries/:id - Delete entry
router.delete('/:id', (req, res) => entryController.delete(req, res));

export default router;
