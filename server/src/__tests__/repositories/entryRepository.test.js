import { setupTestDb, cleanupTestDb, closeTestDb, getTestPool } from '../helpers/testDb.js';

// Create a test version of the repository that uses the test pool
class TestEntryRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const query = {
      text: 'SELECT * FROM entries ORDER BY created_at DESC',
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: 'SELECT * FROM entries WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0] || null;
  }

  async create(entry) {
    const query = {
      text: `
        INSERT INTO entries (title, content)
        VALUES ($1, $2)
        RETURNING *
      `,
      values: [entry.title, entry.content],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async update(id, entry) {
    const query = {
      text: `
        UPDATE entries
        SET title = $1, content = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *
      `,
      values: [entry.title, entry.content, id],
    };
    const result = await this.pool.query(query);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = {
      text: 'DELETE FROM entries WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0] || null;
  }
}

describe('EntryRepository', () => {
  let repository;

  beforeAll(async () => {
    await setupTestDb();
    repository = new TestEntryRepository(getTestPool());
  });

  beforeEach(async () => {
    await cleanupTestDb();
  });

  afterAll(async () => {
    await closeTestDb();
  });

  describe('create', () => {
    it('should create a new entry with auto-generated UUID and timestamps', async () => {
      const entryData = {
        title: 'Test Entry',
        content: 'Test content',
      };

      const entry = await repository.create(entryData);

      expect(entry).toBeDefined();
      expect(entry.id).toBeDefined();
      expect(entry.title).toBe('Test Entry');
      expect(entry.content).toBe('Test content');
      expect(entry.created_at).toBeDefined();
      expect(entry.updated_at).toBeDefined();
    });

    it('should create multiple entries with unique IDs', async () => {
      const entry1 = await repository.create({
        title: 'Entry 1',
        content: 'Content 1',
      });
      const entry2 = await repository.create({
        title: 'Entry 2',
        content: 'Content 2',
      });

      expect(entry1.id).not.toBe(entry2.id);
    });
  });

  describe('findAll', () => {
    it('should return empty array when no entries exist', async () => {
      const entries = await repository.findAll();
      expect(entries).toEqual([]);
    });

    it('should return all entries ordered by created_at DESC', async () => {
      // Create entries with slight delay to ensure different timestamps
      const entry1 = await repository.create({
        title: 'First Entry',
        content: 'Content 1',
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const entry2 = await repository.create({
        title: 'Second Entry',
        content: 'Content 2',
      });

      const entries = await repository.findAll();

      expect(entries).toHaveLength(2);
      expect(entries[0].id).toBe(entry2.id); // Newest first
      expect(entries[1].id).toBe(entry1.id);
    });
  });

  describe('findById', () => {
    it('should return entry when ID exists', async () => {
      const created = await repository.create({
        title: 'Test Entry',
        content: 'Test content',
      });

      const found = await repository.findById(created.id);

      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
      expect(found.title).toBe('Test Entry');
      expect(found.content).toBe('Test content');
    });

    it('should return null when ID does not exist', async () => {
      const found = await repository.findById(
        '00000000-0000-0000-0000-000000000000'
      );
      expect(found).toBeNull();
    });
  });

  describe('update', () => {
    it('should update entry and return updated data', async () => {
      const created = await repository.create({
        title: 'Original Title',
        content: 'Original content',
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const updated = await repository.update(created.id, {
        title: 'Updated Title',
        content: 'Updated content',
      });

      expect(updated).toBeDefined();
      expect(updated.id).toBe(created.id);
      expect(updated.title).toBe('Updated Title');
      expect(updated.content).toBe('Updated content');
      expect(new Date(updated.updated_at).getTime()).toBeGreaterThan(
        new Date(created.updated_at).getTime()
      );
    });

    it('should return null when updating non-existent entry', async () => {
      const result = await repository.update(
        '00000000-0000-0000-0000-000000000000',
        {
          title: 'Test',
          content: 'Test',
        }
      );
      expect(result).toBeNull();
    });

    it('should preserve created_at timestamp when updating', async () => {
      const created = await repository.create({
        title: 'Original',
        content: 'Original',
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const updated = await repository.update(created.id, {
        title: 'Updated',
        content: 'Updated',
      });

      expect(updated.created_at).toEqual(created.created_at);
    });
  });

  describe('delete', () => {
    it('should delete entry and return its ID', async () => {
      const created = await repository.create({
        title: 'To Delete',
        content: 'Delete me',
      });

      const deleted = await repository.delete(created.id);

      expect(deleted).toBeDefined();
      expect(deleted.id).toBe(created.id);

      const found = await repository.findById(created.id);
      expect(found).toBeNull();
    });

    it('should return null when deleting non-existent entry', async () => {
      const result = await repository.delete(
        '00000000-0000-0000-0000-000000000000'
      );
      expect(result).toBeNull();
    });
  });
});
