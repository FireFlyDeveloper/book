import { pool } from "../database/db";

export const createAdmin = async (
  name: string,
  email: string,
  password: string,
) => {
  const query = `
    INSERT INTO admins (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllAdmins = async () => {
  const result = await pool.query("SELECT * FROM admins;");
  return result.rows;
};

export const getAdminById = async (xata_id: string) => {
  const result = await pool.query("SELECT * FROM admins WHERE xata_id = $1;", [
    xata_id,
  ]);
  return result.rows[0];
};

export const updateAdmin = async (
  xata_id: string,
  name: string,
  email: string,
  password: string,
) => {
  const query = `
    UPDATE admins
    SET name = $1, email = $2, password = $3
    WHERE xata_id = $4
    RETURNING *;
  `;
  const values = [name, email, password, xata_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteAdmin = async (xata_id: string) => {
  const result = await pool.query(
    "DELETE FROM admins WHERE xata_id = $1 RETURNING *;",
    [xata_id],
  );
  return result.rows[0];
};

export const authenticateAdmin = async (email: string) => {
  const result = await pool.query("SELECT * FROM admins WHERE email = $1;", [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  return result.rows[0];
};
