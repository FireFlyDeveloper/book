import { Hono } from "hono";
import OrderItemsController from "../controllers/orderItemsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.post("/create-order-item", authMiddleware, OrderItemsController.create);
router.get("/order-items", authMiddleware, OrderItemsController.getAll);
router.get(
  "/order-item/:order_id/:book_id",
  authMiddleware,
  OrderItemsController.getById,
);
router.put(
  "/update-order-item/:order_id/:book_id",
  authMiddleware,
  OrderItemsController.update,
);
router.delete(
  "/delete-order-item/:order_id/:book_id",
  authMiddleware,
  OrderItemsController.delete,
);

export default router;
