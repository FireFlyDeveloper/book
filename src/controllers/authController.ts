import { Context } from "hono";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
  updateUserWithouthPassword,
} from "../services/authService";
import { generateToken } from "../utils/helpers";

export default class AuthController {
  static async create(c: Context) {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ message: "Name, email, and password are required" }, 400);
    }

    const user = await authenticateUser(email);

    if (user) {
      return c.json({ message: "Email already on use" }, 409);
    }

    await createUser(name, email, password);
    return c.json({ message: "User created successfully", success: true });
  }

  static async getAll(c: Context) {
    const users = await getAllUsers();
    return c.json(users);
  }

  static async getById(c: Context) {
    const { xata_id } = c.req.param();
    if (!xata_id) {
      return c.json({ message: "User ID is required" }, 400);
    }
    const session = c.get("session");
    const sessionId = session.get("id");
    const user = await getUserById(sessionId);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user);
  }

  static async getByIdSession(c: Context) {
    const session = c.get("session");
    const sessionId = session.get("id");
    const user = await getUserById(sessionId);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    delete user.password;
    return c.json(user);
  }

  static async update(c: Context) {
    const { xata_id } = c.req.param();
    if (!xata_id) {
      return c.json({ message: "User ID is required" }, 400);
    }
    const { name, email, password } = await c.req.json();
    const user = await updateUser(xata_id, name, email, password);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user);
  }

  static async updateBySession(c: Context) {
    const session = c.get("session");
    const userId = session.get("id");
    const { name, email, phone } = await c.req.json();
    const user = await updateUserWithouthPassword(userId, name, email, phone);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user);
  }

  static async delete(c: Context) {
    const { xata_id } = c.req.param();
    if (!xata_id) {
      return c.json({ message: "User ID is required" }, 400);
    }
    const user = await deleteUser(xata_id);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json({ message: "User deleted successfully" });
  }

  static async login(c: Context) {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ message: "Email and password are required" }, 400);
    }
    const user = await authenticateUser(email);

    if (!user || user.password !== password) {
      return c.json({ message: "Invalid email or password" }, 401);
    }

    const token = generateToken(user);

    const session = c.get("session");

    session.set("id", user.xata_id);
    session.set("jwt", token);

    return c.json({
      message: "Login successful",
      success: true,
    });
  }
}
