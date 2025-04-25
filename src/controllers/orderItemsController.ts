import { Context } from "hono";
import {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} from "../services/orderItemsService";

export default class OrderItemsController {
  static async create(c: Context) {
    const { order_id, book_id, quantity, price } = await c.req.json();

    if (!order_id || !book_id || quantity == null || price == null) {
      return c.json(
        { message: "order_id, book_id, quantity, and price are required" },
        400,
      );
    }

    const orderItem = await createOrderItem(order_id, book_id, quantity, price);
    return c.json({ message: "Order item created", data: orderItem });
  }

  static async getAll(c: Context) {
    const orderItems = await getAllOrderItems();
    return c.json(orderItems);
  }

  static async getById(c: Context) {
    const { order_id, book_id } = c.req.param();

    if (!order_id || !book_id) {
      return c.json({ message: "order_id and book_id are required" }, 400);
    }

    const orderItem = await getOrderItemById(order_id, book_id);
    if (!orderItem) {
      return c.json({ message: "Order item not found" }, 404);
    }

    return c.json(orderItem);
  }

  static async update(c: Context) {
    const { order_id, book_id } = c.req.param();
    const { quantity, price } = await c.req.json();

    if (!order_id || !book_id || quantity == null || price == null) {
      return c.json(
        { message: "order_id, book_id, quantity, and price are required" },
        400,
      );
    }

    const updatedItem = await updateOrderItem(
      order_id,
      book_id,
      quantity,
      price,
    );
    if (!updatedItem) {
      return c.json({ message: "Order item not found" }, 404);
    }

    return c.json(updatedItem);
  }

  static async delete(c: Context) {
    const { order_id, book_id } = c.req.param();

    if (!order_id || !book_id) {
      return c.json({ message: "order_id and book_id are required" }, 400);
    }

    const deletedItem = await deleteOrderItem(order_id, book_id);
    if (!deletedItem) {
      return c.json({ message: "Order item not found" }, 404);
    }

    return c.json({ message: "Order item deleted successfully" });
  }
}
