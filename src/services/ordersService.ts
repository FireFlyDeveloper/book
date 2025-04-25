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
  const result = await pool.query(`
    SELECT 
      orders.xata_id AS order_id,
      orders.xata_createdat,
      orders.xata_updatedat,
      orders.status,
      orders.total,
      orders.delivery_fee,
      orders.payment_method,

      -- User details
      users.xata_id AS user_id,
      users.name AS user_name,
      users.email AS user_email,

      -- Address details
      addresses.xata_id AS address_id,
      addresses.street,
      addresses.city_or_municipality,
      addresses.postal_code,

      -- Order item details
      order_items.book_id,
      order_items.quantity,
      order_items.price,

      -- Book details
      books.title AS book_title,
      books.author AS book_author,
      books.image

    FROM orders
    JOIN users ON orders.user_id = users.xata_id
    JOIN addresses ON orders.address_id = addresses.xata_id
    JOIN order_items ON orders.xata_id = order_items.order_id
    JOIN books ON order_items.book_id = books.xata_id;
  `);

  return result.rows;
};

export const getAllOrdersByUserId = async (userId: string) => {
  const result = await pool.query(
    `
    SELECT 
      orders.xata_id AS order_id,
      orders.xata_createdat,
      orders.xata_updatedat,
      orders.status,
      orders.total,
      orders.delivery_fee,
      orders.payment_method,

      -- User details
      users.xata_id AS user_id,
      users.name AS user_name,
      users.email AS user_email,

      -- Address details
      addresses.xata_id AS address_id,
      addresses.street,
      addresses.city_or_municipality,
      addresses.postal_code,

      -- Order item details
      order_items.book_id,
      order_items.quantity,
      order_items.price,

      -- Book details
      books.title AS book_title,
      books.author AS book_author,
      books.image

    FROM orders
    JOIN users ON orders.user_id = users.xata_id
    JOIN addresses ON orders.address_id = addresses.xata_id
    JOIN order_items ON orders.xata_id = order_items.order_id
    JOIN books ON order_items.book_id = books.xata_id
    WHERE orders.user_id = $1;
  `,
    [userId],
  );

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
