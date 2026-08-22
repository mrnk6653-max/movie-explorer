import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/MovieApi";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import SearchBar from "../components/SearchBar";

function Home({
  favorites = [],
  addFavorite,
  removeFavorite,
}) {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("Avengers");

  const [loading, setLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(true);

  const [error, setError] = useState("");
  const [popularError, setPopularError] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  async function handleSearch(event) {
    if (event) {
      event.preventDefault();
    }

    if (!searchQuery.trim()) {
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(searchQuery);

      setMovies(data);
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while searching. Please try again."
      );

      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadPopularMovies() {
    setPopularLoading(true);
    setPopularError("");

    try {
      const data = await getPopularMovies();

      setPopularMovies(data);
    } catch (error) {
      console.error(error);

      setPopularError("Unable to load popular movies.");
    } finally {
      setPopularLoading(false);
    }
  }

  return (
    <div className="container mt-4">

      {/* Page Heading */}
      <div className="text-center mb-4">
        <h1>🎬 Movie Explorer</h1>

        <p className="text-muted">
          Search and discover your favorite movies
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Search Results Heading */}
      {hasSearched && !loading && !error && (
        <h3 className="mb-4">
          Search results for: "{searchQuery}"
        </h3>
      )}

      {/* Search Loading */}
      {loading && (
        <div className="row g-4 mb-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="col-6 col-md-4 col-lg-3"
              key={index}
            >
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {/* Search Error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* No Search Results */}
      {hasSearched &&
        !loading &&
        !error &&
        movies.length === 0 && (
          <div className="alert alert-warning">
            ⚠️ No movies found for "{searchQuery}".
          </div>
        )}

      {/* Search Results */}
      {!loading &&
        !error &&
        movies.length > 0 && (
          <div className="row g-4 mb-5">
            {movies.map((movie) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={movie.id}
              >
                <MovieCard
                  movie={movie}
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              </div>
            ))}
          </div>
        )}

      {/* Popular Movies */}
      <hr className="my-5" />

      <h2 className="mb-4">
        🔥 Popular Movies
      </h2>

      {/* Popular Loading */}
      {popularLoading && (
        <div className="row g-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="col-6 col-md-4 col-lg-3"
              key={index}
            >
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {/* Popular Error */}
      {popularError && (
        <div className="alert alert-danger">
          {popularError}
        </div>
      )}

      {/* Popular Movies */}
      {!popularLoading &&
        !popularError &&
        popularMovies.length > 0 && (
          <div className="row g-4">
            {popularMovies.map((movie) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={movie.id}
              >
                <MovieCard
                  movie={movie}
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              </div>
            ))}
          </div>
        )}

    </div>
  );
}

export default Home;