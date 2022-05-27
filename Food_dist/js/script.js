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

  function modalShowClose(overflow) {
    modal.classList.toggle("show");
    document.body.style.overflow = overflow;
    clearInterval(modalTimerId);
  }

  modalCloseBtn.addEventListener("click", () => {
    modalShowClose("");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modalShowClose("");
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.code = "Escape" && modal.classList.contains("show"))) {
      modalShowClose("");
    }
  });

  const modalTimerId = setTimeout(() => {
    modalShowClose("hidden");
  }, 5000);

  function showMogalByScroll(params) {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalShowClose("hidden");
      window.removeEventListener("scroll", showMogalByScroll);
    }
  }

  window.addEventListener("scroll", showMogalByScroll);

  //set menu Items

  class ProductCard {
    constructor(
      src,
      alt,
      title,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.parent = document.querySelector(parentSelector);
      this.price = price;
      this.classes = classes;
      this.transfer = 36;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const menuItem = document.createElement("div");
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        menuItem.classList.add("menu__item");
      } else {
        this.classes.forEach((className) => menuItem.classList.add(className));
      }

      menuItem.innerHTML = `
      <img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
        ${this.description}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;
      this.parent.append(menuItem);
    }
  }

  const cards = [
    {
      img: "img/tabs/vegy.jpg",
      alt: "vegy",
      subtitle: "Меню 'Фитнес'",
      descr:
        "Меню Фитнес - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.родукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
      price: 9,
    },
    {
      img: "img/tabs/elite.jpg",
      alt: "elite",
      subtitle: "Меню “Премиум”",
      descr:
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
      price: 15,
    },
    {
      img: "img/tabs/post.jpg",
      alt: "post",
      subtitle: "Меню 'Постное'",
      descr:
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
      price: 11,
    },
  ];

  cards.forEach((el) => {
    new ProductCard(
      el.img,
      el.alt,
      el.subtitle,
      el.descr,
      el.price,
      ".menu__field .container"
      // "menu__item"
    ).render();
  });
});
