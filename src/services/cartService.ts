import { pool } from "../database/db";

export const createCart = async (user_id: string) => {
  const query = `
    INSERT INTO carts (user_id)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllCarts = async () => {
  const result = await pool.query("SELECT * FROM carts;");
  return result.rows;
};

export const getCartById = async (xata_id: string) => {
  const result = await pool.query("SELECT * FROM carts WHERE xata_id = $1;", [
    xata_id,
  ]);
  return result.rows[0];
};

export const getCartsByUserId = async (user_id: string) => {
  const result = await pool.query("SELECT * FROM carts WHERE user_id = $1;", [
    user_id,
  ]);
  return result.rows;
};

export const updateCart = async (xata_id: string, user_id: string) => {
  const query = `
    UPDATE carts
    SET user_id = $1
    WHERE xata_id = $2
    RETURNING *;
  `;
  const values = [user_id, xata_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteCart = async (xata_id: string) => {
  const result = await pool.query(
    "DELETE FROM carts WHERE xata_id = $1 RETURNING *;",
    [xata_id],
  );
  return result.rows[0];
};
