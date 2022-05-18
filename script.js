"use strict";

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
  start: function () {
    this.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
    while (this.count == "" || this.count == null || isNaN(this.count)) {
      this.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
    }
  },
  remenberMyFilm: function () {
    for (let i = 0; i < 2; i++) {
      const lastMovie = prompt("Один из последних просмотренных фильмов?", ""),
        rate = prompt("На сколько оцените его?", "");

      if (
        lastMovie != null &&
        rate != null &&
        lastMovie != "" &&
        rate != "" &&
        lastMovie.length < 50
      ) {
        this.movies[lastMovie] = rate;
        console.log("done");
      } else {
        console.log("error");
        i--;
      }
    }
  },
  detectPersonallevel: function () {
    if (this.count < 10) {
      console.log("Просмотрено довольно мало фильмов");
    } else if (this.count >= 10 && this.count < 30) {
      console.log("Вы классический зритель");
    } else if (this.count >= 30) {
      console.log("Вы киноман");
    } else {
      console.log("Произошла ошибка");
    }
  },
  showMyDB: function (hidden) {
    if (!hidden) {
      console.log(this);
    }
  },
  wrightYourGenres: function () {
    for (let i = 0; i < 3; i++) {
      let answer = prompt(`Your favorite genre number ${i + 1}?`);
      if (answer === null || answer === "") {
        answer = prompt(`Your favorite genre number ${i + 1}?`);
        i--;
      } else {
        this.genres[i] = answer;
      }
    }
    this.genres.forEach((element, i) => {
      console.log(`Любимый жанр #${i + 1} - это ${element}`);
    });
  },
  toggleVisibleMyDB: function () {
    this.privat ? (this.privat = false) : (this.privat = true);
  },
};

personalMovieDB.remenberMyFilm();
personalMovieDB.detectPersonallevel();
personalMovieDB.wrightYourGenres();
personalMovieDB.showMyDB(personalMovieDB.privat);
personalMovieDB.toggleVisibleMyDB();

const restorantData = {
  menu: [
    {
      name: "Salad Caesar",
      price: "14$",
    },
    {
      name: "Pizza Diavola",
      price: "9$",
    },
    {
      name: "Beefsteak",
      price: "17$",
    },
    {
      name: "Napoleon",
      price: "7$",
    },
  ],
  waitors: [
    { name: "Alice", age: 22 },
    { name: "John", age: 24 },
  ],
  averageLunchPrice: "20$",
  openNow: true,
};

function isOpen(prop) {
  let answer = "";
  !prop ? (answer = "Закрыто") : (answer = "Открыто");

  return answer;
}

console.log(isOpen(restorantData.openNow));

function isAverageLunchPriceTrue(fDish, sDish, average) {
  if (+fDish.price.slice(0, -1) + +sDish.price < +average.slice(0, -1)) {
    return "Цена ниже средней";
  } else {
    return "Цена выше средней";
  }
}

console.log(
  isAverageLunchPriceTrue(
    restorantData.menu[0],
    restorantData.menu[1],
    restorantData.averageLunchPrice
  )
);

function transferWaitors(data) {
  const copy = JSON.parse(JSON.stringify(data));

  copy.waitors[0] = { name: "Mike", age: 32 };
  return copy;
}

transferWaitors(restorantData);
