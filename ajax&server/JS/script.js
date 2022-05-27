"use strict";

const inputUah = document.querySelector("#UAH"),
  inputUsd = document.querySelector("#USD");

inputUah.addEventListener("input", () => {
  const request = new XMLHttpRequest();
  request.open("GET", "js/current.json");
  request.setRequestHeader("Content-type", "application/json; charset=utf-8"); // Самий перший спосіб для роботи з асинхронним кодом
  request.send();

  // request.addEventListener("readystatechange", () => {
  //   if (request.readyState === 4 && request.status === 200) {
  //     console.log(request.response);
  //     const data = JSON.parse(request.response);
  //     inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
  //   } else {
  //     inputUsd.value = "Шось блять не так!";
  //   }
  // });

  request.addEventListener("load", () => {
    //подія виконується коли відповідь повертається
    if (request.status === 200) {
      console.log(request.response);
      const data = JSON.parse(request.response);
      inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
    } else {
      inputUsd.value = "Шось блять не так!";
    }
  });

  //status
  // statusText
  // response
  // readyState
});
