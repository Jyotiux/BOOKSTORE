export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  categories,
  setCurrentPage,
}) {
  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-2 rounded flex-grow"
      />
      <select
        value={filterCategory}
        onChange={(e) => {
          setFilterCategory(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
