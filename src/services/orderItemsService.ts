import { pool } from "../database/db";

export const createOrderItem = async (
  order_id: string,
  book_id: string,
  quantity: number,
  price: number,
) => {
  const query = `
    INSERT INTO order_items (order_id, book_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [order_id, book_id, quantity, price];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllOrderItems = async () => {
  const result = await pool.query("SELECT * FROM order_items;");
  return result.rows;
};

export const getOrderItemById = async (order_id: string, book_id: string) => {
  const result = await pool.query(
    "SELECT * FROM order_items WHERE order_id = $1 AND book_id = $2;",
    [order_id, book_id],
  );
  return result.rows[0];
};

export const updateOrderItem = async (
  order_id: string,
  book_id: string,
  quantity: number,
  price: number,
) => {
  const query = `
    UPDATE order_items
    SET quantity = $3, price = $4
    WHERE order_id = $1 AND book_id = $2
    RETURNING *;
  `;
  const values = [order_id, book_id, quantity, price];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteOrderItem = async (order_id: string, book_id: string) => {
  const result = await pool.query(
    "DELETE FROM order_items WHERE order_id = $1 AND book_id = $2 RETURNING *;",
    [order_id, book_id],
  );
  return result.rows[0];
};
