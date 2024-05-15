import express from "express";
import BookController from "../Controllers/BookController.js";
const router = express.Router();

router.get("/get", BookController.getBooks);
router.get("/get/:id", BookController.findBookById);
router.post("/addbook", BookController.addBook);
router.put("/update/:id", BookController.updateBook);
router.delete("/delete/:id", BookController.deleteBook);

export default router;
