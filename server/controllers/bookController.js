import Book from "../models/Book.js";
// import Cart from "../models/Cart.js";
// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new book
export const addBook = async (req, res) => {
  try {
    const { title, author, category, price, coverImage } = req.body;
    const newBook = new Book({ title, author, category, price, coverImage });
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update book
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// // Delete book
// export const deleteBook = async (req, res) => {
//   try {
//     const bookId = req.params.id;

//     const deleted = await Book.findByIdAndDelete(bookId);
//     if (!deleted) return res.status(404).json({ message: "Book not found" });

//     // 🧹 Remove the deleted book from all carts
//     await Cart.updateMany(
//       {},
//       { $pull: { items: { bookId: bookId } } }
//     );

//     res.json({ message: "Book deleted and removed from all carts" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };