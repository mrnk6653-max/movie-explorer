function About() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>🎬 About Movie Explorer</h1>

        <p className="lead mt-4">
          Movie Explorer is a React-based movie discovery
          application powered by the TMDB API.
        </p>
      </div>

      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3>🔎 Search</h3>
              <p>
                Search for movies and discover information
                about your favorite films.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3>❤️ Favorites</h3>
              <p>
                Save movies that you want to remember and
                access them from your favorites page.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3>⚛️ React</h3>
              <p>
                Built using React, React Router, Bootstrap,
                and the TMDB API.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">
          Built as a React learning project.
        </p>
      </div>
    </div>
  );
}

export default About;