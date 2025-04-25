import { pool } from "../database/db";

export const createAddress = async (
  user_id: string,
  street: string,
  barangay: string,
  city_or_municipality: string,
  province: string,
  region: string,
  postal_code: string,
) => {
  const query = `
    INSERT INTO addresses (
      user_id, street, barangay, city_or_municipality, province, region, postal_code
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    user_id,
    street,
    barangay,
    city_or_municipality,
    province,
    region,
    postal_code,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllAddresses = async () => {
  const result = await pool.query("SELECT * FROM addresses;");
  return result.rows;
};

export const getAddressByUserId = async (user_id: string) => {
  const result = await pool.query(
    "SELECT * FROM addresses WHERE user_id = $1;",
    [user_id],
  );
  return result.rows;
};

export const updateAddress = async (
  user_id: string,
  street: string,
  barangay: string,
  city_or_municipality: string,
  province: string,
  region: string,
  postal_code: string,
) => {
  const query = `
    UPDATE addresses
    SET street = $1,
        barangay = $2,
        city_or_municipality = $3,
        province = $4,
        region = $5,
        postal_code = $6
    WHERE user_id = $7
    RETURNING *;
  `;
  const values = [
    street,
    barangay,
    city_or_municipality,
    province,
    region,
    postal_code,
    user_id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteAddress = async (user_id: string) => {
  const result = await pool.query(
    "DELETE FROM addresses WHERE user_id = $1 RETURNING *;",
    [user_id],
  );
  return result.rows[0];
};
