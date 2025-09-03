import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { logoutUser } = useFirebase();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    coverImage: "",
  });

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    coverImage: "",
  });
  const [addingBook, setAddingBook] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching books:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/signin");
  };

  // Edit
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      category: book.category || "",
      coverImage: book.coverImage || "",
    });
  };

  const submitEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/books/${editingBook._id}`,
        formData
      );
      setBooks(books.map((b) => (b._id === res.data._id ? res.data : b)));
      setEditingBook(null);
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">Loading books...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setAddingBook(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            Add New Book ➕
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow transition"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Books</h2>

        {books.length === 0 ? (
          <p className="text-center text-gray-600">No books available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col"
              >
                <img
                  src={book.coverImage || "https://via.placeholder.com/300x180?text=No+Image"}
                  alt={book.title}
                  className="w-full h-44 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-2">By {book.author}</p>
                  <p className="text-green-700 font-bold text-lg mb-4">₹{book.price}</p>
                  <div className="mt-auto flex gap-3">
                    <button
                      onClick={() => handleEdit(book)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded shadow transition"
                    >
                      Edit ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded shadow transition"
                    >
                      Delete ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {editingBook && (
        <Modal
          title="Edit Book"
          onClose={() => setEditingBook(null)}
          onSubmit={submitEdit}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Add New Book Modal */}
      {addingBook && (
        <Modal
          title="Add New Book"
          onClose={() => setAddingBook(false)}
          onSubmit={async () => {
            try {
              const res = await axios.post("http://localhost:5000/api/books", newBook);
              setBooks([...books, res.data]);
              setAddingBook(false);
              setNewBook({ title: "", author: "", price: "", category: "", coverImage: "" });
            } catch (err) {
              console.error("Error adding book:", err);
            }
          }}
          formData={newBook}
          setFormData={setNewBook}
        />
      )}
    </div>
  );
}

// Modal component for Add/Edit book
function Modal({ title, onClose, onSubmit, formData, setFormData }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-2xl font-bold mb-5">{title}</h2>
        <input
          className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <input
          type="number"
          min="0"
          className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <input
          className="border p-3 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Cover Image URL"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
