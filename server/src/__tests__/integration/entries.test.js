import request from 'supertest';
import app from '../../app.js';
import { setupTestDb, cleanupTestDb, closeTestDb } from '../helpers/testDb.js';

describe('Entries API Integration Tests', () => {
  beforeAll(async () => {
    await setupTestDb();
  });

  beforeEach(async () => {
    await cleanupTestDb();
  });

  afterAll(async () => {
    await closeTestDb();
  });

  describe('POST /api/entries', () => {
    it('should create new entry and return 201', async () => {
      const response = await request(app).post('/api/entries').send({
        title: 'Test Entry',
        content: 'Test content',
      });

      expect(response.status).toBe(201);
      expect(response.body.entry).toBeDefined();
      expect(response.body.entry.title).toBe('Test Entry');
      expect(response.body.entry.content).toBe('Test content');
      expect(response.body.entry.id).toBeDefined();
      expect(response.body.entry.created_at).toBeDefined();
    });

    it('should trim whitespace from title and content', async () => {
      const response = await request(app).post('/api/entries').send({
        title: '  Test Entry  ',
        content: '  Test content  ',
      });

      expect(response.status).toBe(201);
      expect(response.body.entry.title).toBe('Test Entry');
      expect(response.body.entry.content).toBe('Test content');
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app).post('/api/entries').send({
        content: 'Test content',
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toContainEqual({
        field: 'title',
        message: 'Title is required',
      });
    });

    it('should return 400 when title is empty string', async () => {
      const response = await request(app).post('/api/entries').send({
        title: '   ',
        content: 'Test content',
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 when content is missing', async () => {
      const response = await request(app).post('/api/entries').send({
        title: 'Test Entry',
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toContainEqual({
        field: 'content',
        message: 'Content is required',
      });
    });

    it('should return 400 when title exceeds 255 characters', async () => {
      const longTitle = 'a'.repeat(256);
      const response = await request(app).post('/api/entries').send({
        title: longTitle,
        content: 'Test content',
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 when content exceeds 50000 characters', async () => {
      const longContent = 'a'.repeat(50001);
      const response = await request(app).post('/api/entries').send({
        title: 'Test',
        content: longContent,
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should handle special characters correctly', async () => {
      const response = await request(app).post('/api/entries').send({
        title: 'Test <script>alert("xss")</script>',
        content: 'Content with & < > " \' characters',
      });

      expect(response.status).toBe(201);
      expect(response.body.entry.title).toContain('<script>');
      expect(response.body.entry.content).toContain('& < > " \'');
    });
  });

  describe('GET /api/entries', () => {
    it('should return empty array when no entries exist', async () => {
      const response = await request(app).get('/api/entries');

      expect(response.status).toBe(200);
      expect(response.body.entries).toEqual([]);
    });

    it('should return all entries ordered by created_at DESC', async () => {
      // Create multiple entries
      await request(app).post('/api/entries').send({
        title: 'First Entry',
        content: 'Content 1',
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      await request(app).post('/api/entries').send({
        title: 'Second Entry',
        content: 'Content 2',
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      await request(app).post('/api/entries').send({
        title: 'Third Entry',
        content: 'Content 3',
      });

      const response = await request(app).get('/api/entries');

      expect(response.status).toBe(200);
      expect(response.body.entries).toHaveLength(3);
      expect(response.body.entries[0].title).toBe('Third Entry'); // Newest first
      expect(response.body.entries[1].title).toBe('Second Entry');
      expect(response.body.entries[2].title).toBe('First Entry');
    });
  });

  describe('GET /api/entries/:id', () => {
    it('should return entry when ID exists', async () => {
      const createResponse = await request(app).post('/api/entries').send({
        title: 'Test Entry',
        content: 'Test content',
      });

      const entryId = createResponse.body.entry.id;

      const response = await request(app).get(`/api/entries/${entryId}`);

      expect(response.status).toBe(200);
      expect(response.body.entry).toBeDefined();
      expect(response.body.entry.id).toBe(entryId);
      expect(response.body.entry.title).toBe('Test Entry');
    });

    it('should return 404 when entry does not exist', async () => {
      const response = await request(app).get(
        '/api/entries/00000000-0000-0000-0000-000000000000'
      );

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('NOT_FOUND');
      expect(response.body.error.message).toBe('Entry not found');
    });
  });

  describe('PUT /api/entries/:id', () => {
    it('should update entry and return updated data', async () => {
      const createResponse = await request(app).post('/api/entries').send({
        title: 'Original Title',
        content: 'Original content',
      });

      const entryId = createResponse.body.entry.id;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app)
        .put(`/api/entries/${entryId}`)
        .send({
          title: 'Updated Title',
          content: 'Updated content',
        });

      expect(response.status).toBe(200);
      expect(response.body.entry.id).toBe(entryId);
      expect(response.body.entry.title).toBe('Updated Title');
      expect(response.body.entry.content).toBe('Updated content');
    });

    it('should return 404 when updating non-existent entry', async () => {
      const response = await request(app)
        .put('/api/entries/00000000-0000-0000-0000-000000000000')
        .send({
          title: 'Updated',
          content: 'Updated',
        });

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('should return 400 when validation fails', async () => {
      const createResponse = await request(app).post('/api/entries').send({
        title: 'Test',
        content: 'Test',
      });

      const entryId = createResponse.body.entry.id;

      const response = await request(app)
        .put(`/api/entries/${entryId}`)
        .send({
          title: '',
          content: 'Updated content',
        });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should preserve created_at when updating', async () => {
      const createResponse = await request(app).post('/api/entries').send({
        title: 'Original',
        content: 'Original',
      });

      const entryId = createResponse.body.entry.id;
      const originalCreatedAt = createResponse.body.entry.created_at;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app)
        .put(`/api/entries/${entryId}`)
        .send({
          title: 'Updated',
          content: 'Updated',
        });

      expect(response.body.entry.created_at).toBe(originalCreatedAt);
      expect(response.body.entry.updated_at).not.toBe(
        createResponse.body.entry.updated_at
      );
    });
  });

  describe('DELETE /api/entries/:id', () => {
    it('should delete entry and return 204', async () => {
      const createResponse = await request(app).post('/api/entries').send({
        title: 'To Delete',
        content: 'Delete me',
      });

      const entryId = createResponse.body.entry.id;

      const response = await request(app).delete(`/api/entries/${entryId}`);

      expect(response.status).toBe(204);

      // Verify entry is deleted
      const getResponse = await request(app).get(`/api/entries/${entryId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 when deleting non-existent entry', async () => {
      const response = await request(app).delete(
        '/api/entries/00000000-0000-0000-0000-000000000000'
      );

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });
  });
});
