import entryService from '../services/entryService.js';

class EntryController {
  async getAll(req, res) {
    try {
      const entries = await entryService.getAllEntries();
      res.json({ entries });
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({
        error: {
          message: 'Failed to retrieve entries',
          code: 'DATABASE_ERROR',
        },
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const entry = await entryService.getEntryById(id);
      res.json({ entry });
    } catch (error) {
      if (error.message === 'Entry not found') {
        res.status(404).json({
          error: {
            message: 'Entry not found',
            code: 'NOT_FOUND',
          },
        });
      } else {
        console.error('Error fetching entry:', error);
        res.status(500).json({
          error: {
            message: 'Failed to retrieve entry',
            code: 'DATABASE_ERROR',
          },
        });
      }
    }
  }

  async create(req, res) {
    try {
      const entry = await entryService.createEntry(req.body);
      res.status(201).json({ entry });
    } catch (error) {
      if (error.code === 'VALIDATION_ERROR') {
        res.status(400).json({
          error: {
            message: error.message,
            code: error.code,
            details: error.details,
          },
        });
      } else {
        console.error('Error creating entry:', error);
        res.status(500).json({
          error: {
            message: 'Failed to create entry',
            code: 'DATABASE_ERROR',
          },
        });
      }
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const entry = await entryService.updateEntry(id, req.body);
      res.json({ entry });
    } catch (error) {
      if (error.message === 'Entry not found') {
        res.status(404).json({
          error: {
            message: 'Entry not found',
            code: 'NOT_FOUND',
          },
        });
      } else if (error.code === 'VALIDATION_ERROR') {
        res.status(400).json({
          error: {
            message: error.message,
            code: error.code,
            details: error.details,
          },
        });
      } else {
        console.error('Error updating entry:', error);
        res.status(500).json({
          error: {
            message: 'Failed to update entry',
            code: 'DATABASE_ERROR',
          },
        });
      }
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await entryService.deleteEntry(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Entry not found') {
        res.status(404).json({
          error: {
            message: 'Entry not found',
            code: 'NOT_FOUND',
          },
        });
      } else {
        console.error('Error deleting entry:', error);
        res.status(500).json({
          error: {
            message: 'Failed to delete entry',
            code: 'DATABASE_ERROR',
          },
        });
      }
    }
  }
}

export default new EntryController();
