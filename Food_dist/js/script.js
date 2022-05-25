window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function sowTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  sowTabContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          sowTabContent(i);
        }
      });
    }
  });

  //timer
  const deadline = "2022-05-23";

  function getLastTime(endtime) {
    const finishActionDay = new Date(endtime);
    const now = new Date();
    const t = finishActionDay - now, //ms
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    if (finishActionDay < now) {
      return {
        total: t,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    } else {
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = document.getElementById("days"),
      hours = document.getElementById("hours"),
      minutes = document.getElementById("minutes"),
      seconds = document.getElementById("seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const timeObj = getLastTime(endtime);
      days.textContent = getZero(timeObj.days);
      hours.textContent = getZero(timeObj.hours);
      minutes.textContent = getZero(timeObj.minutes);
      seconds.textContent = getZero(timeObj.seconds);

      if (timeObj.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  const modalButtons = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalShowClose("hidden");
    });
  });

  modalCloseBtn.addEventListener("click", () => {
    modalShowClose("");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modalShowClose("");
    }
  });

  function modalShowClose(overflow) {
    modal.classList.toggle("show");
    document.body.style.overflow = overflow;
  }

  document.addEventListener("keydown", (e) => {
    if ((e.code = "Escape" && modal.classList.contains("show"))) {
      modalShowClose("");
    }
  });
});
