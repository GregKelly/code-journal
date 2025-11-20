import entryRepository from '../repositories/entryRepository.js';

class EntryService {
  validateEntry(entry) {
    const errors = [];

    if (!entry.title || entry.title.trim().length === 0) {
      errors.push({
        field: 'title',
        message: 'Title is required',
      });
    } else if (entry.title.trim().length > 255) {
      errors.push({
        field: 'title',
        message: 'Title must be 255 characters or less',
      });
    }

    if (!entry.content || entry.content.trim().length === 0) {
      errors.push({
        field: 'content',
        message: 'Content is required',
      });
    } else if (entry.content.trim().length > 50000) {
      errors.push({
        field: 'content',
        message: 'Content must be 50,000 characters or less',
      });
    }

    return errors;
  }

  async getAllEntries() {
    return await entryRepository.findAll();
  }

  async getEntryById(id) {
    const entry = await entryRepository.findById(id);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return entry;
  }

  async createEntry(entryData) {
    // Trim input
    const entry = {
      title: entryData.title?.trim(),
      content: entryData.content?.trim(),
    };

    // Validate
    const errors = this.validateEntry(entry);
    if (errors.length > 0) {
      const error = new Error('Validation failed');
      error.code = 'VALIDATION_ERROR';
      error.details = errors;
      throw error;
    }

    return await entryRepository.create(entry);
  }

  async updateEntry(id, entryData) {
    // Check if entry exists
    const existingEntry = await entryRepository.findById(id);
    if (!existingEntry) {
      throw new Error('Entry not found');
    }

    // Trim input
    const entry = {
      title: entryData.title?.trim(),
      content: entryData.content?.trim(),
    };

    // Validate
    const errors = this.validateEntry(entry);
    if (errors.length > 0) {
      const error = new Error('Validation failed');
      error.code = 'VALIDATION_ERROR';
      error.details = errors;
      throw error;
    }

    return await entryRepository.update(id, entry);
  }

  async deleteEntry(id) {
    const result = await entryRepository.delete(id);
    if (!result) {
      throw new Error('Entry not found');
    }
    return result;
  }
}

export default new EntryService();
