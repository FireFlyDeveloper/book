import { Context } from "hono";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../services/ordersService";

export default class OrdersController {
  static async create(c: Context) {
    const session = c.get("session");
    const user_id = session.get("id");

    if (!user_id) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const { address_id, status, total, payment_method } = await c.req.json();

    if (!address_id || !status || total == null || !payment_method) {
      return c.json({ message: "Missing required order fields" }, 400);
    }

    const order = await createOrder(
      user_id,
      address_id,
      status,
      total,
      payment_method,
    );

    return c.json({ message: "Order created", order });
  }

  static async getAll(c: Context) {
    const orders = await getAllOrders();
    return c.json(orders);
  }

  static async getById(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ message: "Order ID is required" }, 400);
    }

    const order = await getOrderById(id);
    if (!order) {
      return c.json({ message: "Order not found" }, 404);
    }

    return c.json(order);
  }

  static async update(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ message: "Order ID is required" }, 400);
    }

    const session = c.get("session");
    const user_id = session.get("id");

    const { address_id, status, total, delivery_fee, payment_method } =
      await c.req.json();

    const order = await updateOrder(
      id,
      user_id,
      address_id,
      status,
      total,
      delivery_fee,
      payment_method,
    );

    if (!order) {
      return c.json({ message: "Order not found" }, 404);
    }

    return c.json({ message: "Order updated", order });
  }

  static async delete(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ message: "Order ID is required" }, 400);
    }

    const order = await deleteOrder(id);
    if (!order) {
      return c.json({ message: "Order not found" }, 404);
    }

    return c.json({ message: "Order deleted successfully" });
  }
}
