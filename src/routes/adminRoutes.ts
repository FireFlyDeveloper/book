import { Hono } from "hono";
import AdminController from "../controllers/AdminController";
import { authMiddleware } from "../middlewares/authMiddleware";

const adminRouter = new Hono();

adminRouter.post("/create-admin", AdminController.create);
adminRouter.get("/get-admin/:xata_id", AdminController.getById);
adminRouter.put(
  "/update-admin/:xata_id",
  authMiddleware,
  AdminController.update,
);
adminRouter.delete(
  "/delete-admin/:xata_id",
  authMiddleware,
  AdminController.delete,
);
adminRouter.get("/list-admins", authMiddleware, AdminController.getAll);
adminRouter.post("/login-admin", AdminController.authenticate);

export default adminRouter;
