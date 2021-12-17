import React, { useState, useEffect } from "react";
import { getTrandingMovies } from "./requests";
import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Main from "./components/Main/Main";
import Movie from "./components/Movie/Movie";
import Cast from "./components/Cast/Cast";
import Reviews from "./components/Reviews/Reviews";

function App() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    getTrandingMovies().then(setMovies);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Main movies={movies} />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="movie/:id/cast" element={<Cast />} />
        <Route path="movie/:id/reviews" element={<Reviews />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
