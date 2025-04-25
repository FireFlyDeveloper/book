import { Hono } from "hono";
import AddressController from "../controllers/addressesController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.post("/create-address", authMiddleware, AddressController.create);
router.get("/get-address", authMiddleware, AddressController.getByUserId);
router.get("/list-address", authMiddleware, AddressController.getAll);
router.put("/update-address", authMiddleware, AddressController.update);
router.delete("/delete-address", authMiddleware, AddressController.delete);

export default router;
