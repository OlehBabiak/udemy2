const buttons = document.querySelectorAll("button"),
  btnBlock = document.querySelector(".btn-block");
// console.log(buttons[0].classList.length);
// console.log(buttons[0].classList.item(1));
// console.log(buttons[1].classList.add("red"));
// console.log(buttons[0].classList.remove("blue"));
// console.log(buttons[0].classList.toggle("blue"));

// if (buttons[1].classList.contains("red")) {
//   console.log("red");
// }

buttons[0].addEventListener("click", () => {
  //   !buttons[1].classList.contains("red")
  //     ? buttons[1].classList.add("red")
  //     : buttons[1].classList.remove("red");
  buttons[1].classList.toggle("red");
});

// buttons.forEach((btn, i) =>
//   btn.addEventListener("click", () => {
//     console.log(`button ${i + 1} clicked!`);
//   })
// );

btnBlock.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "BUTTON") {
    console.log(`button ${e.target.tagName} clicked!`);
  }
});
