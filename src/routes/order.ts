import { Hono } from "hono";
import OrdersController from "../controllers/OrdersController";
import { authMiddleware } from "../middlewares/authMiddleware";

const orderRouter = new Hono();

orderRouter.post("/create-order", authMiddleware, OrdersController.create);
orderRouter.get("/get-order/:id", authMiddleware, OrdersController.getById);
orderRouter.put("/update-order/:id", authMiddleware, OrdersController.update);
orderRouter.delete(
  "/delete-order/:id",
  authMiddleware,
  OrdersController.delete,
);
orderRouter.get("/list-orders", authMiddleware, OrdersController.getAll);

export default orderRouter;
