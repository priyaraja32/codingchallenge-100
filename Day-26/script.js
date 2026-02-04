const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
let autoSlide;

/* Move Slide */
function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

/* Next & Prev */
function goNext() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

function goPrev() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

/* Button Controls */
if (nextBtn) nextBtn.addEventListener("click", goNext);
if (prevBtn) prevBtn.addEventListener("click", goPrev);

/* Auto Slide */
function startAutoSlide() {
  autoSlide = setInterval(goNext, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

startAutoSlide();

/* Pause on Hover */
track.addEventListener("mouseenter", stopAutoSlide);
track.addEventListener("mouseleave", startAutoSlide);

/* Keyboard Navigation */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goNext();
  if (e.key === "ArrowLeft") goPrev();
});
