"use strict";

// console.log("Data request");

const req = new Promise((res, rej) => {
  setTimeout(() => {
    console.log("Preparing data...");

    const prod = {
      name: "TV",
      price: 2000,
    };

    res(prod);
  }, 2000);
});

req
  .then((prod) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        prod.status = "ordered";
        res(prod);
      }, 2000);
    });
  })
  .then((data) => {
    data.modify = true;
    return data;
  })
  .then((data) => {
    console.log(data);
  })
  .catch(() => {
    console.error("Error");
  })
  .finally(() => {
    console.log("Every think is OK!");
  });

// const test = (time) => {
//   return new Promise((res, rej) => {
//     setTimeout(() => res(), time);
//   });
// };

// test(1000).then(() => {
//   console.log("1000 ms");
// });
// test(2000).then(() => {
//   console.log("2000 ms");
// });

// Promise.all([test(1000), test(2000)]).then(() => {
//   //Promise чекає виконання всіх промісів переданих в масив
//проміси як запити на різні сервера
//   console.log("All");
// });

// Promise.race([test(1000), test(2000)]).then(() => {
//   //Promise чекає виконання першого промісу з переданих в масив
//   console.log("All");
// });

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({ name: "Alex" }),
  headers: {
    "Content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

  