import './App.css';
import api from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/home/Home';
import Reviews from './Components/reviews/Reviews';
import Trailer from './Components/trailer/Trailer';
import Header from './Components/header/Header';

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {

    try {

      const response = await api.get("http://localhost:8080/api/v1/movies");

      setMovies(response.data);

    }
    catch (err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {

    try {
      const response = await api.get(`http://localhost:8080/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);
    }
    catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    // <BrowserRouter>
    <div className="App">
    <Header/>
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies} />} ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
          {/* <Route path="*" element = {<NotFound/>}></Route> */}
        </Route>
    </Routes>

  </div>
    // </BrowserRouter>
    
  );
}

export default App;