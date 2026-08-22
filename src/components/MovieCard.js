import { Link } from "react-router-dom";

function MovieCard({
  movie,
  favorites = [],
  addFavorite,
  removeFavorite,
}) {
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
    <div className="card h-100 shadow-sm movie-card">
      <Link
        to={`/movie/${movie.id}`}
        className="text-decoration-none"
      >
        <img
          src={posterUrl}
          className="card-img-top movie-poster"
          alt={movie.title}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {movie.title}
        </h5>

        <p className="text-muted mb-2">
          {movie.release_date
            ? movie.release_date.substring(0, 4)
            : "Unknown"}
        </p>

        <p className="mb-3">
          ⭐{" "}
          {movie.vote_average
            ? movie.vote_average.toFixed(1)
            : "N/A"}
        </p>

        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="btn btn-primary btn-sm flex-grow-1"
          >
            Details
          </Link>

          <button
            type="button"
            className={`btn btn-sm ${
              isFavorite
                ? "btn-danger"
                : "btn-outline-danger"
            }`}
            onClick={handleFavorite}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;