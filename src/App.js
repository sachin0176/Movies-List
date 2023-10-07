import "./App.css";
import Card from "./components/UI/Card/Card";
import Button from "./components/UI/Button/Button";
import MoviesList from "./components/MoviesList/MoviesList";
import { useCallback, useEffect, useState } from "react";
import AddMovie from "./components/AddMovie/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const  fetchMoviesHandler =useCallback ( async ()=> {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://react-http-e231c-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      const loadedMovies=[];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }

      setMovies(loadedMovies);
      
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);


  const addMovieHandler = async (movie) =>{

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://react-http-e231c-default-rtdb.firebaseio.com/movies.json",
      {
        method:'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error("Something went wrong!");

      fetchMoviesHandler();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
   
  }
  useEffect(() =>{fetchMoviesHandler()},[fetchMoviesHandler]);
  let content = <p>Found no movies</p>;

  if (movies.length > 0) content = <MoviesList dummyMovies={movies} />;

  if (error) content = <p>{error}</p>;

  if (isLoading) content = <p>Loading...</p>;

  return (
    <>
    <AddMovie onAddMovie={addMovieHandler}/>
      <Card>
        <Button onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </Card>

      <Card>{content}</Card>
    </>
  );
}

export default App;
