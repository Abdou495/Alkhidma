// pour le header
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 0);
});

// pour l'ajoute des prduits

const products = {
    phone1: {
        images: ['images/phone1.png', 'images/phone1.png', 'images/phone1.png'],
        title: 'Phone',
        description: 'Un téléphone avec écran HD.',
        oldPrice: '25,000 XOF',
        newPrice: '19,500 XOF',
        whatsapp: 'https://wa.me/22912345678?text=Je suis intéressé par le Phone.'
    },
    phone2: {
        images: ['images/phone2-1.png', 'images/phone2-2.png', 'images/phone2-3.png'],
        title: 'Smartphone Avancé',
        description: 'Smartphone avec fonctionnalités avancées.',
        oldPrice: '50,000 XOF',
        newPrice: '45,000 XOF',
        whatsapp: 'https://wa.me/22912345678?text=Je suis intéressé par le Smartphone Avancé.'
    }
};



// Sélection du bouton de fermeture
const closeButton = document.querySelector('.modal .close');

// Fonction pour fermer la modale
closeButton.addEventListener('click', function () {
    document.getElementById('productModal').style.display = 'none';
});

// Ferme la modale en cliquant en dehors de celle-ci
window.onclick = function (event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


// pour le slider
let currentIndex = 0;

function showProductDetails(productId) {
    const product = products[productId];
    if (product) {
        const { images, title, description, oldPrice, newPrice, whatsapp } = product;

        document.getElementById('modalImg1').src = images[0];
        document.getElementById('modalImg2').src = images[1];
        document.getElementById('modalImg3').src = images[2];

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalOldPrice').textContent = oldPrice;
        document.getElementById('modalNewPrice').textContent = newPrice;
        document.getElementById('modalWhatsApp').href = whatsapp;

        document.getElementById('productModal').style.display = 'flex';
        currentIndex = 0;
        updateSlider();
    }
}

function updateSlider() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function currentSlide(index) {
    currentIndex = index - 1;
    updateSlider();
}

document.querySelector('.modal .close').onclick = function () {
    document.getElementById('productModal').style.display = 'none';
};

window.onclick = function (event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

const slider = document.querySelector('.carousel-images');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste la vitesse de défilement
    slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Ajuste la sensibilité
    slider.scrollLeft = scrollLeft - walk;
});
