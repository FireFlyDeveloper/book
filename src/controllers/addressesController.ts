import { Context } from "hono";
import {
  createAddress,
  getAllAddresses,
  getAddressByUserId,
  updateAddress,
  deleteAddress,
} from "../services/addressService";

export default class AddressController {
  static async create(c: Context) {
    const {
      street,
      barangay,
      city_or_municipality,
      province,
      region,
      postal_code,
    } = await c.req.json();

    const session = c.get("session");
    const user_id = session.get("id");

    if (
      !user_id ||
      !street ||
      !barangay ||
      !city_or_municipality ||
      !province ||
      !region ||
      !postal_code
    ) {
      return c.json({ message: "All address fields are required" }, 400);
    }

    const address = await createAddress(
      user_id,
      street,
      barangay,
      city_or_municipality,
      province,
      region,
      postal_code,
    );

    return c.json({ message: "Address created successfully", address });
  }

  static async getAll(c: Context) {
    const addresses = await getAllAddresses();
    return c.json(addresses);
  }

  static async getByUserId(c: Context) {
    const session = c.get("session");
    const user_id = session.get("id");

    if (!user_id) {
      return c.json({ message: "User ID is required" }, 400);
    }

    const addresses = await getAddressByUserId(user_id);

    if (!addresses || addresses.length === 0) {
      return c.json({ message: "No address found for user" }, 404);
    }

    return c.json(addresses);
  }

  static async update(c: Context) {
    const {
      street,
      barangay,
      city_or_municipality,
      province,
      region,
      postal_code,
    } = await c.req.json();

    const session = c.get("session");
    const user_id = session.get("id");

    if (
      !user_id ||
      !street ||
      !barangay ||
      !city_or_municipality ||
      !province ||
      !region ||
      !postal_code
    ) {
      return c.json({ message: "All address fields are required" }, 400);
    }

    const address = await updateAddress(
      user_id,
      street,
      barangay,
      city_or_municipality,
      province,
      region,
      postal_code,
    );

    if (!address) {
      return c.json({ message: "Address not found" }, 404);
    }

    return c.json({ message: "Address updated successfully", address });
  }

  static async delete(c: Context) {
    const session = c.get("session");
    const user_id = session.get("id");

    if (!user_id) {
      return c.json({ message: "User ID is required" }, 400);
    }

    const address = await deleteAddress(user_id);

    if (!address) {
      return c.json({ message: "Address not found" }, 404);
    }

    return c.json({ message: "Address deleted successfully" });
  }
}
