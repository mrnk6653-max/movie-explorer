import MovieCard from "../components/MovieCard";

function Favorites({
  favorites = [],
  addFavorite,
  removeFavorite,
}) {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1>❤️ My Favorites</h1>

        <p className="text-muted">
          Movies you have saved to your favorites
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-info">
            You haven't added any movies to your favorites yet.
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {favorites.map((movie) => (
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

export default Favorites;