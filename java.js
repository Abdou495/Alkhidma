// script.js
let currentIndex = 0;

function showNextImage() {
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('img');
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    });
}

setInterval(showNextImage, 3000); // Change d'image toutes les 3 secondes

