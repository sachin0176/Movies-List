import React, { useState } from "react";
import styles from "./AddMovie.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const AddMovie = (props) => {
  const movieInit = { title: "", openingText: "", releaseDate: "" };

  const [addMovie, setAddMovie] = useState(movieInit);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setAddMovie((prevMovieInput) => ({
      ...prevMovieInput,
      [name]: value,
    }));
  };
  const submitHandler = (event) => {
    event.preventDefault();

    props.onAddMovie(addMovie);

    setAddMovie(movieInit);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className={styles["form-control"]}>
          <label htmlFor="title" id="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={addMovie.title}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="openingText" id="openingText">
            Opening Text
          </label>
          <textarea
            id="openingText"
            name="openingText"
            value={addMovie.openingText}
            type="text"
            onChange={inputChangeHandler}
          />
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="releaseDate" id="releaseDate">
            Release Date
          </label>
          <input
            id="releaseDate"
            name="releaseDate"
            value={addMovie.releaseDate}
            type="text"
            onChange={inputChangeHandler}
          />
        </div>

        <Button type="submit" className={styles.action}>
          Add Movie
        </Button>
      </form>
    </Card>
  );
};

export default AddMovie;
