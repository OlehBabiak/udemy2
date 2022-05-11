"use strict";

let numberOfFilms = +prompt("How many movies you allready watched", 0);
let lastMovie = prompt("One of the last movies you saw?");
let rate = prompt("How much would you rate it?");
let lastMovie2 = prompt("One of the last movies you saw?");
let rate2 = prompt("How much would you rate it?");

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
};

personalMovieDB.movies[lastMovie] = rate;
personalMovieDB.movies[lastMovie2] = rate2;

console.log(personalMovieDB);
