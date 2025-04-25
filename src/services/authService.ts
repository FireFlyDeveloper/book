import { pool } from "../database/db";

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users;");
  return result.rows;
};

export const getUserById = async (xata_id: string) => {
  const result = await pool.query("SELECT * FROM users WHERE xata_id = $1;", [
    xata_id,
  ]);
  return result.rows[0];
};

export const updateUser = async (
  xata_id: string,
  name: string,
  email: string,
) => {
  const query = `
    UPDATE users
    SET name = $1, email = $2
    WHERE xata_id = $3  
    RETURNING *;
  `;
  const values = [name, email, xata_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateUserWithouthPassword = async (
  xata_id: string,
  name: string,
  email: string,
  phone: string,
) => {
  const query = `
    UPDATE users
    SET name = $1, email = $2, phone = $3
    WHERE xata_id = $4
    RETURNING *;
  `;
  const values = [name, email, phone, xata_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteUser = async (xata_id: string) => {
  const result = await pool.query(
    "DELETE FROM users WHERE xata_id = $1 RETURNING *;",
    [xata_id],
  );
  return result.rows[0];
};

export const authenticateUser = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1;", [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  return result.rows[0];
};
