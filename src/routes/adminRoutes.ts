import { Hono } from "hono";
import AdminController from "../controllers/AdminController";

const adminRouter = new Hono();

adminRouter.post("/create-admin", AdminController.create);
adminRouter.get("/get-admin/:xata_id", AdminController.getById);
adminRouter.put("/update-admin/:xata_id", AdminController.update);
adminRouter.delete("/delete-admin/:xata_id", AdminController.delete);
adminRouter.get("/list-admins", AdminController.getAll);

export default adminRouter;
