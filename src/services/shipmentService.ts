import { pool } from "../database/db";

// Create a new shipment
export const createShipment = async (
  order_id: string,
  admin_id: string,
  shipped_at: Date,
  tracking_number: string,
  status: string,
) => {
  const query = `
    INSERT INTO shipments (order_id, admin_id, shipped_at, tracking_number, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [order_id, admin_id, shipped_at, tracking_number, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all shipments
export const getAllShipments = async () => {
  const result = await pool.query("SELECT * FROM shipments;");
  return result.rows;
};

// Get shipment by ID
export const getShipmentById = async (shipment_id: string) => {
  const result = await pool.query(
    "SELECT * FROM shipments WHERE shipment_id = $1;",
    [shipment_id],
  );
  return result.rows[0];
};

// Update shipment status
export const updateShipmentStatus = async (
  shipment_id: string,
  status: string,
) => {
  const query = `
    UPDATE shipments
    SET status = $1
    WHERE shipment_id = $2
    RETURNING *;
  `;
  const values = [status, shipment_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update tracking number for a shipment
export const updateTrackingNumber = async (
  shipment_id: string,
  tracking_number: string,
) => {
  const query = `
    UPDATE shipments
    SET tracking_number = $1
    WHERE shipment_id = $2
    RETURNING *;
  `;
  const values = [tracking_number, shipment_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete shipment
export const deleteShipment = async (shipment_id: string) => {
  const result = await pool.query(
    "DELETE FROM shipments WHERE shipment_id = $1 RETURNING *;",
    [shipment_id],
  );
  return result.rows[0];
};

// Get shipments by order ID
export const getShipmentsByOrderId = async (order_id: string) => {
  const result = await pool.query(
    "SELECT * FROM shipments WHERE order_id = $1;",
    [order_id],
  );
  return result.rows;
};
