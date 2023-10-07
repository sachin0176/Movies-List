import React from "react";
import styles from "./MoviesList.module.css";
import Movie from "./Movie/Movie";

const MoviesList = (props) => {
  return (
    <ul className={styles['movies-list']}>
      {props.dummyMovies.map((movie) => (
        <Movie
            key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
