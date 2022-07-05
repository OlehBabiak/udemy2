/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	const result = document.querySelector(".calculating__result span");
	
	let sex, height, weight, age, ratio;
	
	if (localStorage.getItem("sex")) {
		sex = localStorage.getItem("sex");
	} else {
		sex = "female";
		localStorage.setItem("sex", "female");
	}
	
	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = 1.375;
		localStorage.setItem("ratio", 1.375);
	}
	
	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		
		elements.forEach((el) => {
			el.classList.remove(activeClass);
			if (el.getAttribute("id") === localStorage.getItem("sex")) {
				el.classList.add(activeClass);
			}
			if (el.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
				el.classList.add(activeClass);
			}
		});
	}
	
	initLocalSettings("#gender div", "calculating__choose-item_active");
	initLocalSettings(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);
	
	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "___";
			return;
		}
		if (sex === "female") {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		}
	}
	
	calcTotal();
	
	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		
		elements.forEach((el) =>
			el.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
				} else {
					sex = e.target.getAttribute("id");
					localStorage.setItem("sex", e.target.getAttribute("id"));
				}
				console.log(ratio, sex);
				
				elements.forEach((el) => {
					el.classList.remove(activeClass);
				});
				
				e.target.classList.add(activeClass);
				calcTotal();
			})
		);
	}
	
	getStaticInfo("#gender div", "calculating__choose-item_active");
	getStaticInfo(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);
	
	function getDynamicInfo(selector) {
		const input = document.querySelector(selector);
		
		input.addEventListener("input", () => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";
			}
			
			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	
	getDynamicInfo("#height");
	getDynamicInfo("#weight");
	getDynamicInfo("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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
	
	const menuUrl = "http://localhost:3000/menu";
	
	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getCard)(menuUrl).then((res) => {
		res.forEach(({ img, altimg, title, descr, price }) => {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо! Скоро мы с вами свяжемся",
		failure: "Что-то пошло не так...",
	};
	
	forms.forEach((item) => {
		bindPostData(item);
	});
	
	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			
			let statusMessage = document.createElement("img"); //2.1 створюєм елемент де відображаєм статус повідомлення
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
			
			form.insertAdjacentElement("afterend", statusMessage); // 2.2 додає statusMessage в DOM-дерево afterend щодо елемента form.
			
			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			
			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}
	
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");
		
		prevModalDialog.classList.add("hide");
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);
		
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
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
		}, 4000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add("hide");
	modal.classList.remove("show");
	document.body.style.overflow = "";
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	
	modal.classList.add("show");
	modal.classList.remove("hide");
	document.body.style.overflow = "hidden";
	console.log(modalTimerId);
	modalTimerId && clearInterval(modalTimerId);
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);
	
	modalTrigger.forEach((btn) => {
		btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
	});
	
	// modalCloseBtn.addEventListener("click", closeModal);
	
	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") === "") {
			closeModal(modalSelector);
		}
	});
	
	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal(modalSelector);
		}
	});
	
	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	
	window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
					container,
					slide,
					nextArrow,
					prewArrow,
					totalCounter,
					currentCounter,
					wrapper,
					field,
				}) {
	const slides = document.querySelectorAll(slide);
	const slider = document.querySelector(container);
	const prevBtn = document.querySelector(prewArrow);
	const nextBtn = document.querySelector(nextArrow);
	const curSlide = document.querySelector(currentCounter);
	const countOfSlides = document.querySelector(totalCounter);
	const slidesWrapper = document.querySelector(wrapper);
	const slidesField = document.querySelector(field);
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
	
	const stringTransformer = (param) => {
		return +param.replace(/\D/g, "");
	};
	
	nextBtn.addEventListener("click", () => {
		if (offset === stringTransformer(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += stringTransformer(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		
		if (slideIndex === slides.length) {
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
		if (offset === 0) {
			offset = stringTransformer(width) * (slides.length - 1);
		} else {
			offset -= stringTransformer(width);
		}
		
		slidesField.style.transform = `translateX(-${offset}px)`;
		
		if (slideIndex === 1) {
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
			offset = stringTransformer(width) * (slideTo - 1);
			
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
	tabsSelector,
	tabsContentSelector,
	tabsParentSelector,
	activeSelector
) {
	let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);
	
	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});
		
		tabs.forEach((item) => {
			item.classList.remove(activeSelector);
		});
	}
	
	function showTabContent(i = 0) {
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
		tabs[i].classList.add(activeSelector);
	}
	
	hideTabContent();
	showTabContent();
	
	tabsParent.addEventListener("click", function (event) {
		const target = event.target;
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
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
	
	setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getCard": () => (/* binding */ getCard)
/* harmony export */ });
const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: data,
	});
	return await res.json();
};

const getCard = async (url) => {
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(`Could not fetch ${url}, status: ${resp.status}`);
	}
	return await resp.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", function () {
  const modalTimerId = setTimeout(
      () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])(".modal", modalTimerId),
      300000
  );
  
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
      ".tabheader__item",
      ".tabcontent",
      ".tabheader__items",
      "tabheader__item_active"
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2022-08-01");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: ".offer__slider",
    prevArrow: ".offer__slider-prev",
    nextArrow: ".offer__slider-next",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    slide: ".offer__slide",
    field: ".offer__slider-inner",
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map