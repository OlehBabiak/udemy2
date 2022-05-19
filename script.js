// "use strict";

// const personalMovieDB = {
//   count: 0,
//   movies: {},
//   actors: {},
//   genres: [],
//   privat: false,
//   start: function () {
//     this.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
//     while (this.count == "" || this.count == null || isNaN(this.count)) {
//       this.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
//     }
//   },
//   remenberMyFilm: function () {
//     for (let i = 0; i < 2; i++) {
//       const lastMovie = prompt("Один из последних просмотренных фильмов?", ""),
//         rate = prompt("На сколько оцените его?", "");

//       if (
//         lastMovie != null &&
//         rate != null &&
//         lastMovie != "" &&
//         rate != "" &&
//         lastMovie.length < 50
//       ) {
//         this.movies[lastMovie] = rate;
//         console.log("done");
//       } else {
//         console.log("error");
//         i--;
//       }
//     }
//   },
//   detectPersonallevel: function () {
//     if (this.count < 10) {
//       console.log("Просмотрено довольно мало фильмов");
//     } else if (this.count >= 10 && this.count < 30) {
//       console.log("Вы классический зритель");
//     } else if (this.count >= 30) {
//       console.log("Вы киноман");
//     } else {
//       console.log("Произошла ошибка");
//     }
//   },
//   showMyDB: function (hidden) {
//     if (!hidden) {
//       console.log(this);
//     }
//   },
//   wrightYourGenres: function () {
//     for (let i = 0; i < 3; i++) {
//       let answer = prompt(`Your favorite genre number ${i + 1}?`);
//       if (answer === null || answer === "") {
//         answer = prompt(`Your favorite genre number ${i + 1}?`);
//         i--;
//       } else {
//         this.genres[i] = answer;
//       }
//     }
//     this.genres.forEach((element, i) => {
//       console.log(`Любимый жанр #${i + 1} - это ${element}`);
//     });
//   },
//   toggleVisibleMyDB: function () {
//     this.privat ? (this.privat = false) : (this.privat = true);
//   },
// };

// personalMovieDB.remenberMyFilm();
// personalMovieDB.detectPersonallevel();
// personalMovieDB.wrightYourGenres();
// personalMovieDB.showMyDB(personalMovieDB.privat);
// personalMovieDB.toggleVisibleMyDB();

// function pow(x, n) {
//   if (n === 1) {
//     return x;
//   } else {
//     const pp = pow(x, n - 1);
//     return x * pp;
//   }
// }

// pow(2, 4);

let students = {
  js: [
    {
      name: "John",
      progress: 100,
    },
    {
      name: "Ivan",
      progress: 60,
    },
  ],
  html: {
    basic: [
      {
        name: "Peter",
        progress: 20,
      },
      {
        name: "Ann",
        progress: 18,
      },
    ],
    pro: [
      {
        name: "Sam",
        progress: 10,
      },
    ],
  },
};

function getTotalProgressByIteration(data) {
  let total = 0;
  let students = 0;

  //    course: js or html
  for (const course of Object.values(data)) {
    if (Array.isArray(course)) {
      // якщо курс масив
      students += course.length; //  к-сть студентів = кість обєктів в масиві

      for (let i = 0; i < course.length; i++) {
        total += course[i].progress; //  з кожного обєкту витягує и прогрес і плюсуємо
      }
    } else {
      // якщо курс обєкт
      // group: basic, pro
      for (const group of Object.values(course)) {
        //отримуєм значення ключів обєкту
        if (Array.isArray(group)) {
          // якщо group масив
          students += group.length;

          for (let j = 0; j < group.length; j++) {
            total += group[j].progress;
          }
        } // сюди новий else
      }
    }
  }

  return total / students;
}

function getTotalProgressByRecursion(params) {}

console.log(getTotalProgressByIteration(students));
