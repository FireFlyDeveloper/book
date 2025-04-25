import { Context } from "hono";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipmentStatus,
  updateTrackingNumber,
  deleteShipment,
  getShipmentsByOrderId,
} from "../services/shipmentService";

export default class ShipmentController {
  // Create a new shipment
  static async create(c: Context) {
    const { order_id, admin_id, shipped_at, tracking_number, status } =
      await c.req.json();

    if (!order_id || !admin_id || !shipped_at || !tracking_number || !status) {
      return c.json(
        {
          message:
            "Order ID, admin ID, shipped date, tracking number, and status are required",
        },
        400,
      );
    }

    const shipment = await createShipment(
      order_id,
      admin_id,
      new Date(shipped_at),
      tracking_number,
      status,
    );
    return c.json({ message: "Shipment created successfully", shipment });
  }

  // Get all shipments
  static async getAll(c: Context) {
    const shipments = await getAllShipments();
    return c.json(shipments);
  }

  // Get shipment by ID
  static async getById(c: Context) {
    const { shipment_id } = c.req.param();
    if (!shipment_id) {
      return c.json({ message: "Shipment ID is required" }, 400);
    }

    const shipment = await getShipmentById(shipment_id);
    if (!shipment) {
      return c.json({ message: "Shipment not found" }, 404);
    }

    return c.json(shipment);
  }

  // Get shipments by order ID
  static async getByOrderId(c: Context) {
    const { order_id } = c.req.param();
    if (!order_id) {
      return c.json({ message: "Order ID is required" }, 400);
    }

    const shipments = await getShipmentsByOrderId(order_id);
    if (shipments.length === 0) {
      return c.json({ message: "No shipments found for this order" }, 404);
    }

    return c.json(shipments);
  }

  // Update shipment status
  static async updateStatus(c: Context) {
    const { shipment_id } = c.req.param();
    if (!shipment_id) {
      return c.json({ message: "Shipment ID is required" }, 400);
    }

    const { status } = await c.req.json();
    if (!status) {
      return c.json({ message: "Status is required" }, 400);
    }

    const updatedShipment = await updateShipmentStatus(shipment_id, status);
    if (!updatedShipment) {
      return c.json({ message: "Shipment not found" }, 404);
    }

    return c.json(updatedShipment);
  }

  // Update tracking number
  static async updateTrackingNumber(c: Context) {
    const { shipment_id } = c.req.param();
    if (!shipment_id) {
      return c.json({ message: "Shipment ID is required" }, 400);
    }

    const { tracking_number } = await c.req.json();
    if (!tracking_number) {
      return c.json({ message: "Tracking number is required" }, 400);
    }

    const updatedShipment = await updateTrackingNumber(
      shipment_id,
      tracking_number,
    );
    if (!updatedShipment) {
      return c.json({ message: "Shipment not found" }, 404);
    }

    return c.json(updatedShipment);
  }

  // Delete shipment
  static async delete(c: Context) {
    const { shipment_id } = c.req.param();
    if (!shipment_id) {
      return c.json({ message: "Shipment ID is required" }, 400);
    }

    const shipment = await deleteShipment(shipment_id);
    if (!shipment) {
      return c.json({ message: "Shipment not found" }, 404);
    }

    return c.json({ message: "Shipment deleted successfully" });
  }
}
