import { Context } from "hono";
import {
  addCartItem,
  getAllCartItems,
  getCartItemById,
  getItemsByCartId,
  updateCartItem,
  deleteCartItem,
} from "../services/cartItemService";

export default class CartItemController {
  static async create(c: Context) {
    const { cart_id, book_id, quantity } = await c.req.json();
    if (!cart_id || !book_id || typeof quantity !== "number") {
      return c.json(
        { message: "cart_id, book_id, and quantity are required" },
        400,
      );
    }
    const item = await addCartItem(cart_id, book_id, quantity);
    return c.json({ message: "Cart item added", item });
  }

  static async getAll(c: Context) {
    const items = await getAllCartItems();
    return c.json(items);
  }

  static async getById(c: Context) {
    const { xata_id } = c.req.param();
    const item = await getCartItemById(xata_id);
    if (!item) {
      return c.json({ message: "Cart item not found" }, 404);
    }
    return c.json(item);
  }

  static async getByCart(c: Context) {
    const { cart_id } = c.req.param();
    const items = await getItemsByCartId(cart_id);
    return c.json(items);
  }

  static async update(c: Context) {
    const { xata_id } = c.req.param();
    const { cart_id, book_id, quantity } = await c.req.json();
    const updated = await updateCartItem(xata_id, cart_id, book_id, quantity);
    return c.json({ message: "Cart item updated", updated });
  }

  static async delete(c: Context) {
    const { xata_id } = c.req.param();
    const deleted = await deleteCartItem(xata_id);
    return c.json({ message: "Cart item deleted", deleted });
  }
}
