"use strict";

const box = document.getElementById("box");
const btns = document.getElementsByTagName("button");
const crcls = document.getElementsByClassName("circle");
const hearts = document.querySelectorAll(".heart");
const oneHeart = document.querySelector(".heart");
const wrapper = document.querySelector(".wrapper");

box.style.backgroundColor = "blue";
box.style.width = "500px";

btns[1].style.borderRadius = "100%";
crcls[0].style.backgroundColor = "red";

const div = document.createElement("div");
div.classList.add("black");
wrapper.append(div);
// wrapper.appendChild(div);
// wrapper.prepend(div);

// hearts[0].after(div);
// crcls[0].remove();
// hearts[0].replaceWith(crcls[0]);

div.innerHTML = "<p>Hello world</p>";
div.insertAdjacentHTML("afterbegin", "<h2>Hello</h2>");
