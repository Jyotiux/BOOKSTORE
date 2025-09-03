import BookCard from "./BookCard";

export default function BookGrid({ books, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book._id} book={book} onAddToCart={() => onAddToCart(book)} />
      ))}
    </div>
  );
}
