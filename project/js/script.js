/*
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  const ad = document.querySelectorAll(".promo__adv img");
  const promoGenre = document.querySelector(".promo__genre");
  const poster = document.querySelector(".promo__bg");
  const movieList = document.querySelector(".promo__interactive-list");
  const form = document.querySelector("form.add");
  const addInput = form.querySelector(".adding__input");
  const checkbox = form.querySelector("[type='checkbox']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let newMovie = addInput.value;
    let favorite = checkbox.checked;

    if (newMovie) {
      if (newMovie.length > 21) {
        newMovie = `${newFilm.substring(0, 22)}...`;
      }

      if (favorite) {
        console.log("Добавляем любимый фильм");
      }

      movieDB.movies.push(newMovie);
      sortArr(movieDB.movies);

      createmovielist(movieDB.movies, movieList);
    }

    e.target.reset();
  });

  const deleteAdv = (arr) => {
    arr.forEach((el) => el.remove());
  };

  const makeChanges = () => {
    promoGenre.innerHTML = "драма";
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArr = (arr) => {
    arr.sort();
  };

  function createmovielist(films, parent) {
    parent.innerHTML = "";
    sortArr(movieDB.movies);

    films.forEach((el, i) => {
      parent.innerHTML += `
    <li class="promo__interactive-item">
                  ${i + 1} ${el}
                  <div class="delete"></div>
    `;
    });

    document.querySelectorAll(".delete").forEach((item, i) => {
      item.addEventListener("click", () => {
        item.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createmovielist(films, parent);
      });
    });
  }
  deleteAdv(ad);
  makeChanges();

  createmovielist(movieDB.movies, movieList);
});
