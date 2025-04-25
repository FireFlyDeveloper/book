import { pool } from "../database/db";

export const createOrder = async (
  user_id: string,
  address_id: string,
  status: string,
  total: number,
  payment_method: string,
) => {
  const query = `
    INSERT INTO orders (user_id, address_id, status, total, payment_method)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [user_id, address_id, status, total, payment_method];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllOrders = async () => {
  const result = await pool.query("SELECT * FROM orders;");
  return result.rows;
};

export const getOrderById = async (order_id: string) => {
  const result = await pool.query("SELECT * FROM orders WHERE id = $1;", [
    order_id,
  ]);
  return result.rows[0];
};

export const updateOrder = async (
  order_id: string,
  user_id: string,
  address_id: string,
  status: string,
  total: number,
  delivery_fee: number,
  payment_method: string,
) => {
  const query = `
    UPDATE orders
    SET user_id = $1, address_id = $2, status = $3, total = $4, delivery_fee = $5, payment_method = $6
    WHERE id = $7
    RETURNING *;
  `;
  const values = [
    user_id,
    address_id,
    status,
    total,
    delivery_fee,
    payment_method,
    order_id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteOrder = async (order_id: string) => {
  const result = await pool.query(
    "DELETE FROM orders WHERE id = $1 RETURNING *;",
    [order_id],
  );
  return result.rows[0];
};
