import { Hono } from "hono";
import UserController from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.post("/create-user", UserController.create);
router.get("/get-user/:id", UserController.getById);
router.put("/update-user/:id", authMiddleware, UserController.update);
router.delete("/delete-user/:id", authMiddleware, UserController.delete);
router.get("/list-user", authMiddleware, UserController.getAll);
router.post("/login", authMiddleware, UserController.login);

export default router;
