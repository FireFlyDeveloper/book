import { Context } from "hono";
import {
  createCart,
  getAllCarts,
  getCartById,
  getCartsByUserId,
  updateCart,
  deleteCart,
} from "../services/cartService";

export default class CartController {
  static async create(c: Context) {
    const { user_id } = await c.req.json();
    if (!user_id) {
      return c.json({ message: "User ID is required" }, 400);
    }
    const cart = await createCart(user_id);
    return c.json({ message: "Cart created", cart });
  }

  static async getAll(c: Context) {
    const carts = await getAllCarts();
    return c.json(carts);
  }

  static async getById(c: Context) {
    const { xata_id } = c.req.param();
    const cart = await getCartById(xata_id);
    if (!cart) {
      return c.json({ message: "Cart not found" }, 404);
    }
    return c.json(cart);
  }

  static async getByUser(c: Context) {
    const { user_id } = c.req.param();
    const carts = await getCartsByUserId(user_id);
    return c.json(carts);
  }

  static async update(c: Context) {
    const { xata_id } = c.req.param();
    const { user_id } = await c.req.json();
    const cart = await updateCart(xata_id, user_id);
    return c.json(cart);
  }

  static async delete(c: Context) {
    const { xata_id } = c.req.param();
    const deleted = await deleteCart(xata_id);
    return c.json({ message: "Cart deleted", deleted });
  }
}
