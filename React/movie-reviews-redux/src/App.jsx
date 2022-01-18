import React from "react";
import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import RoutesWrapper from "./components/RoutesWrapper/RoutesWrapper";
import FullMovieInfo from "./components/FullMovieInfo/FullMovieInfo";
import Cast from "./components/Cast/Cast";
import Reviews from "./components/Reviews/Reviews";
import Movies from "./components/Movies/Movies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="movie/:id" element={<RoutesWrapper />}>
          <Route index element={<FullMovieInfo />} />
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
