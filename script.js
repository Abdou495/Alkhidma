// Sslec all filter buttons and filtrable cards
const filterbuttons = document.querySelectorAll("filter_buttons button")
const filtrablecards = document.querySelectorAll("filterable_cards .card")

// define the filtrablecards function
const filtercards = e => {
    document.querySelector(".active").classlist.remove("active")
    e.target.classlist.add("active");
    console.log(e.target);
};
// add click event listener to each filter button
filterbuttons.forEach(button => button.addEventListener("click",filtrablecards));





// Fonction pour afficher les détails du produit dans la modale
// pour l'ajoute des prduits

const products = {
    produit1categori1: {
        images: ['images/22222.jpg', 'images/22222.jpg', 'images/phone1.png'],
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
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

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
        attachTouchEvents();
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

function attachTouchEvents() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    sliderWrapper.addEventListener('touchstart', touchStart, { passive: true });
    sliderWrapper.addEventListener('touchmove', touchMove, { passive: true });
    sliderWrapper.addEventListener('touchend', touchEnd, { passive: true });
}

function touchStart(event) {
    startX = event.touches[0].clientX;
    prevTranslate = currentTranslate;
}

function touchMove(event) {
    const currentX = event.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    const sliderWrapper = document.getElementById('sliderWrapper');
    sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
    const moveBy = Math.abs(currentTranslate - prevTranslate);
    const threshold = 50; // Adjust for sensitivity
    if (moveBy > threshold) {
        if (currentTranslate < prevTranslate && currentIndex < 2) {
            currentIndex++;
        } else if (currentTranslate > prevTranslate && currentIndex > 0) {
            currentIndex--;
        }
    }
    updateSlider();
}
