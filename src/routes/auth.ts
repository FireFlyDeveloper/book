import { Hono } from "hono";
import UserController from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.post("/create-user", UserController.create);
router.get("/get-user/:xata_id", authMiddleware, UserController.getById);
router.get("/get-user", authMiddleware, UserController.getByIdSession);
router.put("/update-user/:xata_id", UserController.update);
router.post("/update-user", authMiddleware, UserController.updateBySession);
router.delete("/delete-user/:xata_id", UserController.delete);
router.get("/list-user", UserController.getAll);
router.post("/login", UserController.login);

export default router;
