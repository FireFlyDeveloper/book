import { Hono } from "hono";
import ShipmentController from "../controllers/shipmentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.post("/create-shipment", authMiddleware, ShipmentController.create);
router.get("/list-shipments", authMiddleware, ShipmentController.getAll);
router.get(
  "/get-shipment/:shipment_id",
  authMiddleware,
  ShipmentController.getById,
);
router.get(
  "/get-shipments-by-order/:order_id",
  authMiddleware,
  ShipmentController.getByOrderId,
);
router.put(
  "/update-shipment-status/:shipment_id",
  authMiddleware,
  ShipmentController.updateStatus,
);
router.put(
  "/update-shipment-tracking/:shipment_id",
  authMiddleware,
  ShipmentController.updateTrackingNumber,
);
router.delete(
  "/delete-shipment/:shipment_id",
  authMiddleware,
  ShipmentController.delete,
);

export default router;
