const products = [{
        title: 'Produit 1',
        images: ['image/hero1.jpg', 'image/hero2.jpg', 'image/hero3.jpg'],
        oldPrice: '$0.99',
        newPrice: '$29.99',
        description: 'Description détaillée du produit 1.',
        whatsappLink: 'https://wa.me/1234567890?text=Je%20souhaite%20commander%20le%20Produit%201'
    },
    {
        title: 'Produit 2',
        images: ['image/product2-1.jpg', 'image/product2-2.jpg', 'image/product2-3.jpg'],
        oldPrice: '$00.99',
        newPrice: '$39.99',
        description: 'Description détaillée du produit 2.',
        whatsappLink: 'https://wa.me/1234567890?text=Je%20souhaite%20commander%20le%20Produit%202'
    }
];

function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (productId && productId >= 1 && productId <= products.length) {
        const product = products[productId - 1];

        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('old-price').textContent = product.oldPrice;
        document.getElementById('new-price').textContent = product.newPrice;

        const imagesContainer = document.getElementById('product-images');
        imagesContainer.innerHTML = ''; // Clear previous images
        product.images.forEach((image) => {
            const img = document.createElement('img');
            img.src = image;
            imagesContainer.appendChild(img);
        });

        document.getElementById('whatsapp-link').href = product.whatsappLink;

        initSlider();
    }
}

function initSlider() {
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    let index = 0;

    document.querySelector('.prev').addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        slides.style.transform = `translateX(-${index * 100}%)`;
    });

    document.querySelector('.next').addEventListener('click', () => {
        index = (index + 1) % images.length;
        slides.style.transform = `translateX(-${index * 100}%)`;
    });
}

// Charger le produit au chargement de la page
window.onload = loadProduct;



const slider = document.getElementById('product-images');
let isDown = false;
let startX, scrollLeft;

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
    const walk = (x - startX) * 3; // Vitesse de défilement
    slider.scrollLeft = scrollLeft - walk;
});

// Support pour le tactile
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    isDown = true;
});
slider.addEventListener('touchend', () => {
    isDown = false;
});
slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
});