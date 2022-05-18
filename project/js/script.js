/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

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
const movies = document.querySelectorAll(".promo__interactive-item");
const movieList = document.querySelector(".promo__interactive-list");

console.log(movies);
ad.forEach((el) => el.remove());
promoGenre.innerHTML = "драма";
poster.style.backgroundImage = 'url("img/bg.jpg")';

movieList.innerHTML = "";

movieDB.movies.sort().forEach((el, i) => {
  movieList.innerHTML += `
  <li class="promo__interactive-item">
                ${i + 1} ${el}
                <div class="delete"></div>
  `;
});
