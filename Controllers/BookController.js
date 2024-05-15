import { Book } from "../models/BookSchema.js";

class BookController {
  static getBooks = async (req, res) => {
    try {
      const books = await Book.find();
      return res.status(200).json({ message: "Get All Books", books });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  static addBook = async (req, res) => {
    try {
      const { name, img, category, description, price } = req.body;

      // Check if all required fields are provided
      if (!name || !img || !category || !description || !price) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      const newBook = new Book({
        name,
        img,
        category,
        description,
        price,
      });

      await newBook.save();

      return res
        .status(201)
        .json({ message: "Book added successfully", book: newBook });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  static deleteBook = async (req, res) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res
        .status(200)
        .json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  static updateBook = async (req, res) => {
    try {
      const bookId = req.params.id;
      const updates = req.body;
      const options = { new: true }; // Return the modified document rather than the original

      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        updates,
        options
      );

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  static findBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(200).json({ message: "Book found", book });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}

export default BookController;
