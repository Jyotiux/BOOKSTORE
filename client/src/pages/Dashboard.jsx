import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import BookGrid from "../components/BookGrid";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  const { addToCart } = useCart();
  // const userId = "demoUser123";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setBooks(res.data.books || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  // const handleAddToCart = async (book) => {
  //   addToCart(book);
  //   try {
  //     await axios.post("http://localhost:5000/api/cart", { userId, bookId: book._id });
  //   } catch (err) {
  //     console.error("Backend cart update failed:", err);
  //   }
  // };
  const handleAddToCart = async (book) => {
  try {
    await addToCart(book); // just this — rely on context
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};


  // Filtered books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? book.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const categories = [...new Set(books.map((b) => b.category).filter(Boolean))];

  if (loading) return <p className="p-6">Loading books...</p>;

  return (
    <div className="flex flex-col min-h-screen my-10 p-4">
      <Navbar />
      <main className="flex-grow p-6">
        

        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
          setCurrentPage={setCurrentPage}
        />

        <BookGrid books={currentBooks} onAddToCart={handleAddToCart} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
