import { Context } from "hono";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getFeaturedBooks,
  getBooksByGenre,
  searchBooks,
  updateStock,
} from "../services/booksService";

export default class BooksController {
  static async create(c: Context) {
    const {
      title,
      author,
      genre,
      price,
      image,
      description,
      pages,
      publisher,
      language,
      featured,
      stock,
    } = await c.req.json();

    if (
      !title ||
      !author ||
      !genre ||
      !price ||
      !image ||
      !description ||
      !pages ||
      !publisher ||
      !language ||
      featured === undefined ||
      stock === undefined
    ) {
      return c.json({ message: "All fields are required" }, 400);
    }

    const book = await createBook({
      title,
      author,
      genre,
      price,
      image,
      description,
      pages,
      publisher,
      language,
      featured,
      stock,
    });
    return c.json(book);
  }

  static async getAll(c: Context) {
    const books = await getAllBooks();
    return c.json(books);
  }

  static async getById(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ message: "Book ID is required" }, 400);
    }
    const book = await getBookById(id);
    if (!book) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json(book);
  }

  static async update(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ message: "Book ID is required" }, 400);
    }
    const updates = await c.req.json();
    const book = await updateBook(id, updates);
    if (!book) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json(book);
  }

  static async delete(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ message: "Book ID is required" }, 400);
    }
    const book = await deleteBook(id);
    if (!book) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json({ message: "Book deleted successfully" });
  }

  static async getFeatured(c: Context) {
    const books = await getFeaturedBooks();
    return c.json(books);
  }

  static async getByGenre(c: Context) {
    const { genre } = c.req.param();
    if (!genre) {
      return c.json({ message: "Genre is required" }, 400);
    }
    const books = await getBooksByGenre(genre);
    return c.json(books);
  }

  static async search(c: Context) {
    const { searchTerm } = c.req.param();
    if (!searchTerm) {
      return c.json({ message: "Search term is required" }, 400);
    }
    const books = await searchBooks(searchTerm);
    return c.json(books);
  }

  static async updateStock(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ message: "Book ID is required" }, 400);
    }
    const { stock } = await c.req.json();
    if (stock === undefined) {
      return c.json({ message: "Stock is required" }, 400);
    }
    const book = await updateStock(id, stock);
    if (!book) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json(book);
  }
}
