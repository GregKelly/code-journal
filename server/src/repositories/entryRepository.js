import pool from '../config/database.js';

class EntryRepository {
  async findAll() {
    const query = {
      text: 'SELECT * FROM entries ORDER BY created_at DESC',
    };
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: 'SELECT * FROM entries WHERE id = $1',
      values: [id],
    };
    const result = await pool.query(query);
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
    const result = await pool.query(query);
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
    const result = await pool.query(query);
    return result.rows[0] || null;
  }

  async delete(id) {
    const query = {
      text: 'DELETE FROM entries WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0] || null;
  }
}

export default new EntryRepository();
