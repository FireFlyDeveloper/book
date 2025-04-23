import { pool } from "../database/db";

export const addCartItem = async (
  cart_id: string,
  book_id: string,
  quantity: number,
) => {
  const query = `
    INSERT INTO cart_items (cart_id, book_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [cart_id, book_id, quantity];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllCartItems = async () => {
  const result = await pool.query("SELECT * FROM cart_items;");
  return result.rows;
};

export const getCartItemById = async (xata_id: string) => {
  const result = await pool.query(
    "SELECT * FROM cart_items WHERE xata_id = $1;",
    [xata_id],
  );
  return result.rows[0];
};

export const getItemsByCartId = async (cart_id: string) => {
  const result = await pool.query(
    "SELECT * FROM cart_items WHERE cart_id = $1;",
    [cart_id],
  );
  return result.rows;
};

export const updateCartItem = async (
  xata_id: string,
  cart_id: string,
  book_id: string,
  quantity: number,
) => {
  const query = `
    UPDATE cart_items
    SET cart_id = $1, book_id = $2, quantity = $3
    WHERE xata_id = $4
    RETURNING *;
  `;
  const values = [cart_id, book_id, quantity, xata_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteCartItem = async (xata_id: string) => {
  const result = await pool.query(
    "DELETE FROM cart_items WHERE xata_id = $1 RETURNING *;",
    [xata_id],
  );
  return result.rows[0];
};
