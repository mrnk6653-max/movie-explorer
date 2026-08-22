function SearchBar({
  searchQuery,
  setSearchQuery,
  onSearch,
  loading,
}) {
  return (
    <form onSubmit={onSearch} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Search movies"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
        />

        <button
          type="submit"
          className="btn btn-dark"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;