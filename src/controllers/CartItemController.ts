import { Context } from "hono";
import {
  addCartItem,
  getAllCartItems,
  getCartItemById,
  getItemsByCartId,
  updateCartItem,
  deleteCartItem,
} from "../services/cartItemService";
import { createCart, getCartsByUserId } from "../services/cartService";

export default class CartItemController {
  static async create(c: Context) {
    const { book_id, quantity } = await c.req.json();
    if (!book_id || typeof quantity !== "number") {
      return c.json(
        { message: "cart_id, book_id, and quantity are required" },
        400,
      );
    }
    const session = c.get("session");
    const user_id = session.get("id");
    const cart_id = await getCartsByUserId(user_id);
    const item = await addCartItem(cart_id[0]?.xata_id, book_id, quantity);
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

  static async getByIdSession(c: Context) {
    const session = c.get("session");
    const user_id = session.get("id");
    const cart = await getCartsByUserId(user_id);
    let cart_id = cart[0]?.xata_id;
    if (!cart_id) {
      const response = await createCart(user_id);
      cart_id = response.xata_id;
    }
    const items = await getItemsByCartId(cart_id);
    const data = items.map((item) => {
      item.id = item.xata_id;
      return item;
    });
    return c.json(data);
  }

  static async update(c: Context) {
    const session = c.get("session");
    const user_id = session.get("id");
    const cart = await getCartsByUserId(user_id);
    let cart_id = cart[0]?.xata_id;
    const { quantity, book_id } = await c.req.json();
    const updated = await updateCartItem(cart_id, book_id, quantity);
    return c.json({ message: "Cart item updated", updated });
  }

  static async delete(c: Context) {
    const { xata_id } = c.req.param();
    const deleted = await deleteCartItem(xata_id);
    return c.json({ message: "Cart item deleted", deleted });
  }
}
