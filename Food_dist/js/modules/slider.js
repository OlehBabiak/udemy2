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

export default slider;
