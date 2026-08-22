import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/MovieApi";

function MovieDetails({
  favorites = [],
  addFavorite,
  removeFavorite,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError("");

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Movie not found.
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  function handleFavorite() {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>

      <div className="row g-4">
        {/* Poster */}
        <div className="col-md-4 text-center">
          <img
            src={posterUrl}
            alt={movie.title}
            className="img-fluid rounded shadow movie-details-poster"
          />
        </div>

        {/* Details */}
        <div className="col-md-8">
          <h1>{movie.title}</h1>

          {movie.tagline && (
            <p className="lead text-muted">
              "{movie.tagline}"
            </p>
          )}

          <div className="mb-3">
            <span className="badge bg-warning text-dark me-2">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </span>

            {movie.release_date && (
              <span className="badge bg-secondary me-2">
                📅 {movie.release_date}
              </span>
            )}

            {movie.runtime && (
              <span className="badge bg-secondary">
                ⏱️ {movie.runtime} min
              </span>
            )}
          </div>

          <h4>Overview</h4>

          <p>
            {movie.overview || "No overview available."}
          </p>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-3">
              <strong>Genres: </strong>

              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="badge bg-primary me-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Extra Information */}
          <div className="mb-4">
            {movie.original_language && (
              <p>
                <strong>Language:</strong>{" "}
                {movie.original_language.toUpperCase()}
              </p>
            )}

            {movie.budget > 0 && (
              <p>
                <strong>Budget:</strong> $
                {movie.budget.toLocaleString()}
              </p>
            )}

            {movie.revenue > 0 && (
              <p>
                <strong>Revenue:</strong> $
                {movie.revenue.toLocaleString()}
              </p>
            )}
          </div>

          {/* Favorite */}
          <button
            type="button"
            className={`btn ${
              isFavorite
                ? "btn-danger"
                : "btn-outline-danger"
            }`}
            onClick={handleFavorite}
          >
            {isFavorite
              ? "❤️ Remove from Favorites"
              : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;