// Fonction pour afficher les détails du produit
function showProductDetails(productId) {
    // Exemple de données pour les produits
    const products = {
        p11: {
            images: ["images/p1_11.jpg", "images/p1_11.jpg", "images/p1_11.jpg"],
            title: "Boîte à Pain 🥖",
            oldPrice: "10,000 XOF",
            newPrice: "9,050 XOF",
            description: "Une boîte à pain élégante et pratique pour votre cuisine.",
            whatsappLink: "https://wa.me/1234567890?text=Je%20souhaite%20commander%20la%20Boîte%20à%20Pain"
        },
        p9: {
            images: ["images/p1_9.jpg", "images/p1_9_2.jpg", "images/p1_9_3.jpg"],
            title: "Ensemble Théière et Thermos 🌸",
            oldPrice: "10,500 XOF",
            newPrice: "9,400 XOF",
            description: "Un bel ensemble pour profiter de vos boissons chaudes.",
            whatsappLink: "https://wa.me/1234567890?text=Je%20souhaite%20commander%20l'Ensemble%20Théière%20et%20Thermos"
        }
    };

    const product = products[productId];

    if (product) {
        // Charger les images
        document.getElementById("modalImg1").src = product.images[0];
        document.getElementById("modalImg2").src = product.images[1];
        document.getElementById("modalImg3").src = product.images[2];

        // Charger le contenu du produit
        document.getElementById("modalTitle").innerText = product.title;
        document.getElementById("modalOldPrice").innerText = product.oldPrice;
        document.getElementById("modalNewPrice").innerText = product.newPrice;
        document.getElementById("modalDescription").innerText = product.description;
        document.getElementById("modalWhatsApp").href = product.whatsappLink;

        // Afficher la modale
        document.getElementById("productModal").style.display = "block";
    }
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
    document.getElementById("productModal").style.display = "none";
}
let currentSlideIndex = 0;

function showSlides(index) {
    const sliderWrapper = document.getElementById("sliderWrapper");
    const slides = sliderWrapper.querySelectorAll("img");
    const dots = document.querySelectorAll(".slider-dots .dot");

    // Nombre total de slides
    const totalSlides = slides.length;

    // Boucler l'index si nécessaire
    if (index >= totalSlides) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = totalSlides - 1;

    // Mise à jour de la transformation pour déplacer les slides
    sliderWrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Gestion des points actifs
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlideIndex].classList.add("active");
}

function currentSlide(n) {
    currentSlideIndex = n - 1;
    showSlides(currentSlideIndex);
}

function nextSlide() {
    currentSlideIndex++;
    showSlides(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex--;
    showSlides(currentSlideIndex);
}

// Initialiser le slider
document.addEventListener("DOMContentLoaded", () => showSlides(0));
let startX = 0;

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    if (!startX) return;
    const moveX = event.touches[0].clientX;
    const diffX = startX - moveX;

    if (diffX > 30) {
        nextSlide();
    } else if (diffX < -30) {
        prevSlide();
    }
    startX = 0;  // Réinitialise après un mouvement
}

const sliderWrapper = document.getElementById("sliderWrapper");
sliderWrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
sliderWrapper.addEventListener("touchmove", handleTouchMove, { passive: true });


