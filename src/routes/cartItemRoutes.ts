import { Hono } from "hono";
import CartItemController from "../controllers/CartItemController";
import { authMiddleware } from "../middlewares/authMiddleware";

const cartItemRouter = new Hono();

cartItemRouter.post(
  "/add-cart-item",
  authMiddleware,
  CartItemController.create,
);
cartItemRouter.get(
  "/get-cart-item/:xata_id",
  authMiddleware,
  CartItemController.getById,
);
cartItemRouter.get(
  "/get-cart-items-by-cart/:cart_id",
  CartItemController.getByCart,
);
cartItemRouter.put(
  "/update-cart-item/:xata_id",
  authMiddleware,
  CartItemController.update,
);
cartItemRouter.delete(
  "/delete-cart-item/:xata_id",
  authMiddleware,
  CartItemController.delete,
);
cartItemRouter.get(
  "/list-cart-items",
  authMiddleware,
  CartItemController.getAll,
);

export default cartItemRouter;
