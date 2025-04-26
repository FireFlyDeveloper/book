import { Context } from "hono";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  authenticateAdmin,
} from "../services/adminService";

export default class AdminController {
  static async create(c: Context) {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ message: "Name, email, and password are required" }, 400);
    }

    const existingAdmin = await authenticateAdmin(email).catch(() => null);
    if (existingAdmin) {
      return c.json({ message: "Email already in use" }, 409);
    }

    const admin = await createAdmin(name, email, password);
    return c.json({ message: "Admin created successfully", admin });
  }

  static async getAll(c: Context) {
    const admins = await getAllAdmins();
    return c.json(admins);
  }

  static async getById(c: Context) {
    const { xata_id } = c.req.param();
    const admin = await getAdminById(xata_id);
    if (!admin) {
      return c.json({ message: "Admin not found" }, 404);
    }
    return c.json(admin);
  }

  static async update(c: Context) {
    const { xata_id } = c.req.param();
    const { name, email, password } = await c.req.json();
    const updated = await updateAdmin(xata_id, name, email, password);
    return c.json(updated);
  }

  static async delete(c: Context) {
    const { xata_id } = c.req.param();
    const deleted = await deleteAdmin(xata_id);
    return c.json({ message: "Admin deleted", deleted });
  }

  static async authenticate(c: Context) {
    const { email } = await c.req.json();
    const admin = await authenticateAdmin(email);
    if (!admin) {
      return c.json({ message: "Admin not found" }, 404);
    }
    return c.json(admin);
  }
}
