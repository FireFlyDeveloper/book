import { pool } from "../database/db";

export async function createBook(bookData: any) {
  const query = `
      INSERT INTO books (
        title, author, price, image, genre, description, 
        pages, publisher, language, featured, stock
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
  const values = [
    bookData.title,
    bookData.author,
    bookData.price,
    bookData.image,
    bookData.genre,
    bookData.description,
    bookData.pages,
    bookData.publisher,
    bookData.language,
    bookData.featured,
    bookData.stock,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getAllBooks() {
  const result = await pool.query("SELECT * FROM books ORDER BY title;");
  return result.rows;
}

export async function getFeaturedBooks() {
  const result = await pool.query("SELECT * FROM books WHERE featured = true;");
  return result.rows;
}

export async function getBookById(id: string) {
  const result = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
  return result.rows[0];
}

export async function updateBook(id: string, updates: any) {
  const fields = [];
  const values = [];
  let paramCount = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);
  const query = `
      UPDATE books
      SET ${fields.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *;
    `;

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function deleteBook(id: string) {
  const result = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING *;",
    [id],
  );
  return result.rows[0];
}

export async function searchBooks(searchTerm: string) {
  const result = await pool.query(
    `SELECT * FROM books 
       WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1`,
    [`%${searchTerm}%`],
  );
  return result.rows;
}

export async function updateStock(id: string, quantityChange: number) {
  const result = await pool.query(
    `UPDATE books 
       SET stock = stock + $1 
       WHERE id = $2 
       RETURNING *;`,
    [quantityChange, id],
  );
  return result.rows[0];
}

export async function getBooksByGenre(genre: string) {
  const result = await pool.query(
    "SELECT * FROM books WHERE genre = $1 ORDER BY title;",
    [genre],
  );
  return result.rows;
}
