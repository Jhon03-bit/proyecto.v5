// ==================== VARIABLES ====================
const carousel = document.getElementById("carousel");
const slides = Array.from(carousel.children);
const totalSlides = slides.length;

let currentIndex = 1; // Comenzamos en el primer slide real
let autoSlideTimeout;

// ==================== CLONAR SLIDES PARA BUCLE ====================
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, carousel.children[0]);

// Ajustar posición inicial
carousel.style.transition = 'none';
carousel.style.transform = `translateX(${-currentIndex * 100}%)`;

// ==================== FUNCIONES ====================

// Mueve el carrusel
function moveSlide(step) {
  currentIndex += step;
  carousel.style.transition = 'transform 0.6s ease-in-out';
  carousel.style.transform = `translateX(${-currentIndex * 100}%)`;

  // Ajuste después de la transición para bucle infinito
  carousel.addEventListener('transitionend', () => {
    if (carousel.children[currentIndex] === firstClone) {
      carousel.style.transition = 'none';
      currentIndex = 1;
      carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
    if (carousel.children[currentIndex] === lastClone) {
      carousel.style.transition = 'none';
      currentIndex = totalSlides;
      carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
  }, { once: true });
}

// Inicia el auto-slide
function startAutoSlide() {
  autoSlideTimeout = setTimeout(() => {
    moveSlide(1);
    startAutoSlide(); // recursivo para reiniciar
  }, 3000);
}

// Detiene el auto-slide
function stopAutoSlide() {
  clearTimeout(autoSlideTimeout);
}

// ==================== EVENTOS ====================

// Botones anterior/siguiente
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    moveSlide(-1);
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    moveSlide(1);
    startAutoSlide();
  });
}

// ==================== INICIAR AUTO-SLIDE ====================
startAutoSlide();
