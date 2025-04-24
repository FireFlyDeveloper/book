import { Hono } from "hono";
import CartController from "../controllers/CartController";
import { authMiddleware } from "../middlewares/authMiddleware";

const cartRouter = new Hono();

cartRouter.post("/create-cart", authMiddleware, CartController.create);
cartRouter.get("/get-cart/:xata_id", authMiddleware, CartController.getById);
cartRouter.get(
  "/get-carts-by-user/:user_id",
  authMiddleware,
  CartController.getByUser,
);
cartRouter.put("/update-cart/:xata_id", authMiddleware, CartController.update);
cartRouter.delete(
  "/delete-cart/:xata_id",
  authMiddleware,
  CartController.delete,
);
cartRouter.get("/list-carts", authMiddleware, CartController.getAll);

export default cartRouter;
