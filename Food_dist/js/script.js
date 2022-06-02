window.addEventListener("DOMContentLoaded", function () {
  // Tabs

  let tabs = document.querySelectorAll(".tabheader__item"),
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

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", function (event) {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = "2022-06-11";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
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
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  // modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  // modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // Використовуєм class для створення карток меню

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
          `;
      this.parent.append(element);
    }
  }

  // const getresource = async (url) => {
  //   const res = await fetch(url);
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }
  //   return await res.json();
  // };

  // getresource("http://localhost:3000/menu").then((res) =>
  //   res.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   })
  // );

  const menuUrl = "http://localhost:3000/menu";

  function getCard(url) {
    try {
      axios.get(url).then((res) => {
        res.data.forEach(({ img, altimg, title, descr, price }) => {
          new MenuCard(
            img,
            altimg,
            title,
            descr,
            price,
            ".menu .container"
          ).render();
        });
      });
    } catch (error) {
      console.Error(error);
    }
  }

  getCard(menuUrl);

  // axios.get(menuUrl).then((res) => {
  //   res.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  // Використовуєм function для створення карток меню

  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     function changeToUAH() {
  //       price = price * 27;
  //     }
  //     changeToUAH();
  //     const element = document.createElement("div");
  //     element.classList.add("menu__item");
  //     element.innerHTML = `
  //     <img src=${img} alt=${altimg}>
  //     <h3 class="menu__item-subtitle">${title}</h3>
  //     <div class="menu__item-descr">${descr}</div>
  //     <div class="menu__item-divider"></div>
  //     <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //     </div>
  // `;

  //     document.querySelector(".menu .container").append(element);
  //   });
  // }

  // getresource("http://localhost:3000/menu").then((res) => createCard(res));

  // Forms

  const forms = document.querySelectorAll("form"); //1 отримуєм елементи з тегом form
  const message = {
    // обєкт з варіантами відповідей
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    //3. перебираємо форми і кожну кладем аргументом в bindPostData
    bindPostData(item);
  });

  const postdata = async (url, data) => {
    //фетчаєм дані
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  function bindPostData(form) {
    // 2 ф-ція яка на кожну форму накидує слухача,
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img"); //2.1 створюєм елемент де відображаєм статус повідомлення
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;

      form.insertAdjacentElement("afterend", statusMessage); // 2.2 додає statusMessage в DOM-дерево afterend щодо елемента form.

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");

      // request.setRequestHeader(
      //   "Content-type",
      //   "application/json; charset=utf-8"
      // );
      const formData = new FormData(form); //2.3 отримуємо обєкт даних з форми
      const json = JSON.stringify(Object.fromEntries(formData.entries())); // 2.4 перетворюємо в json

      postdata("http://localhost:3000/requests", json) //// 2.5 фетчаєм дані
        .then((data) => {
          console.log(data);
          showThanksModal(message.success); //2.6  виводимо меседж з подякою
          statusMessage.remove(); //2.7 видаляємо меседж
        })
        .catch(() => {
          showThanksModal(message.failure); // ловимо помилку
        })
        .finally(() => {
          form.reset(); //очищаєм форму
        });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    //ф-ція виводу меседжа з подякою
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class='modal__content'>
        <div data-close class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
  `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  //Slider

  const slides = document.querySelectorAll(".offer__slide");
  const slider = document.querySelector(".offer__slider");
  const prevBtn = document.querySelector(".offer__slider-prev");
  const nextBtn = document.querySelector(".offer__slider-next");
  const curSlide = document.querySelector("#current");
  const countOfSlides = document.querySelector("#total");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesField = document.querySelector(".offer__slider-inner");
  const width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slideIndex < 10) {
    countOfSlides.textContent = `0${slides.length}`;
    curSlide.textContent = `0${slideIndex}`;
  } else {
    countOfSlides.textContent = slides.length;
    curSlide.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => (slide.style.width = width));

  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", i + 1);
    indicators.append(dot);

    if (i === 0) {
      dot.style.opacity = 1;
    }

    dots.push(dot);
  }

  nextBtn.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slideIndex < 10) {
      curSlide.textContent = `0${slideIndex}`;
    } else {
      curSlide.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
  });

  prevBtn.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slideIndex < 10) {
      curSlide.textContent = `0${slideIndex}`;
    } else {
      curSlide.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
  });

  dots.forEach((dot) =>
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex < 10) {
        curSlide.textContent = `0${slideIndex}`;
      } else {
        curSlide.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    })
  );

  // showSlides(slideIndex);

  // if (slideIndex < 10) {
  //   countOfSlides.textContent = `0${slides.length}`;
  // } else {
  //   countOfSlides.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => item.classList.add("hide"));
  //   slides[slideIndex - 1].classList.add("show");
  //   slides[slideIndex - 1].classList.remove("hide");

  //   if (slideIndex < 10) {
  //     curSlide.textContent = `0${slideIndex}`;
  //   } else {
  //     curSlide.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prevBtn.addEventListener("click", () => {
  //   plusSlides(-1);
  // });

  // nextBtn.addEventListener("click", () => {
  //   plusSlides(1);
  // });
});
