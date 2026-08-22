function MovieCardSkeleton() {
  return (
    <div className="card movie-card h-100 shadow-sm">

      <div className="skeleton skeleton-poster"></div>

      <div className="card-body">

        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-rating"></div>

        <div className="skeleton skeleton-date"></div>

        <div className="skeleton skeleton-button"></div>

      </div>

    </div>
  );
}

export default MovieCardSkeleton;