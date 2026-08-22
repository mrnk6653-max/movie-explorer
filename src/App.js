import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    try {
      return savedFavorites
        ? JSON.parse(savedFavorites)
        : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function addFavorite(movie) {
    setFavorites((currentFavorites) => {
      const alreadyExists = currentFavorites.some(
        (favorite) => favorite.id === movie.id
      );

      if (alreadyExists) {
        return currentFavorites;
      }

      return [...currentFavorites, movie];
    });
  }

  function removeFavorite(movieId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (movie) => movie.id !== movieId
      )
    );
  }

  return (
    <BrowserRouter>
      <Navbar favorites={favorites} />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Movie Details */}
        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          }
        />

        {/* Favorites */}
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container text-center mt-5">
              <h1>404</h1>
              <p>Page not found.</p>

              <a
                href="/"
                className="btn btn-primary"
              >
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;