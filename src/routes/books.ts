import { Hono } from "hono";
import BooksController from "../controllers/bookController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = new Hono();

router.get("/books", authMiddleware, BooksController.getAll);
router.get("/books/featured", authMiddleware, BooksController.getFeatured);
router.get("/books/genre/:genre", authMiddleware, BooksController.getByGenre);
router.get("/books/search/:searchTerm", authMiddleware, BooksController.search);
router.get("/books/:id", authMiddleware, BooksController.getById);
router.post("/books", authMiddleware, BooksController.create);
router.put("/books/:id", authMiddleware, BooksController.update);
router.delete("/books/:id", authMiddleware, BooksController.delete);
router.patch("/books/stock/:id", authMiddleware, BooksController.updateStock);

export default router;
