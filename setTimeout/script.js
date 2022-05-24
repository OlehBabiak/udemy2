const btn = document.querySelector(".btn");

// let timerID,
//   i = 0;

function myAnimation() {
  const elem = document.querySelector(".box");
  let pos = 0;

  const id = setInterval(frame, 50);

  function frame() {
    if (pos == 300) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }
}

btn.addEventListener("click", myAnimation);

// clearInterval(timerID);

// function logger(params) {
//   i === 3 && clearInterval(timerID);
//   console.log("text");
//   i++;
// }

// const id = setTimeout(function log(){
//     console.log('Hello');
//     id = setTimeout(log, 500);
// }, 500);

function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;
  
    console.log({
        father: man,
        mother: woman
      }); 
  }
  
  let family = marry({
    name: "John"
  }, {
    name: "Ann"
  });

