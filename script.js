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
    p1: {
        images: ['images/img8.png', 'images/22222.jpg', 'images/img8.png'],
        title: 'Phone',
        description: 'Un téléphone avec écran HD.',
        oldPrice: '25,000 XOF',
        newPrice: '19,500 XOF',
        whatsapp: 'https://wa.me/22912345678?text=Je suis intéressé par le Phone.'
    },
    p2: {
        images: ['images/145.png', 'images/145.png', 'images/145.png'],
        title: 'Smartphone Avancé',
        description: 'Smartphone avec fonctionnalités avancées.',
        oldPrice: '50,000 XOF',
        newPrice: '45,000 XOF',
        whatsapp: 'https://wa.me/22912345678?text=Je suis intéressé par le Smartphone Avancé.'
    },
    p3: {
        images: ['images/145.png', 'images/145.png', 'images/145.png'],
        title: 'Smartphone Avancé',
        description: 'Smartphone avec fonctionnalités avancées.',
        oldPrice: '50,000 XOF',
        newPrice: '45,000 XOF',
        whatsapp: 'https://wa.me/22912345678?text=Je suis intéressé par le Smartphone Avancé.'
    },
    p4: {
        images: ['images/145.png', 'images/145.png', 'images/145.png'],
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





// pour la barre de recherche

// Fonction de recherche principale
function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    const suggestionsBox = document.querySelector('.suggestions');
    const productItems = document.querySelectorAll('.produit');  // Sélectionner tous les produits de la page

    // Masquer les suggestions après la saisie
    suggestionsBox.style.display = 'none';
    resultsContainer.innerHTML = ''; // Effacer les résultats précédents

    let foundAnyProduct = false;

    // Masquer tous les produits au départ
    productItems.forEach(item => {
        item.style.display = 'none';
    });

    // Rechercher parmi tous les produits HTML
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase(); // Récupérer le nom du produit
        if (productName.includes(input)) {
            item.style.display = 'block'; // Afficher les produits correspondants
            foundAnyProduct = true;
        }
    });

    // Afficher un message si aucun produit n'a été trouvé
    if (!foundAnyProduct && input !== '') {
        resultsContainer.innerHTML = '<p>Aucun produit trouvé.</p>';
    }

    // Afficher des suggestions basées sur les noms des produits
    showSuggestions(input);
}

// Fonction pour afficher les suggestions en fonction des produits visibles
function showSuggestions(input) {
    const suggestionsBox = document.querySelector('.suggestions');
    const productItems = document.querySelectorAll('.produit');
    const uniqueSuggestions = new Set(); // Pour éviter les doublons

    // Créer une liste de suggestions en fonction des produits visibles
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(input) && input !== '') {
            uniqueSuggestions.add(productName);  // Ajouter le nom du produit à la liste des suggestions
        }
    });

    // Vider la boîte de suggestions et ajouter les nouvelles suggestions
    suggestionsBox.innerHTML = '';
    uniqueSuggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('p');
        suggestionItem.textContent = suggestion;
        suggestionItem.onclick = () => selectSuggestion(suggestion);  // Lancer la recherche automatiquement quand une suggestion est cliquée
        suggestionsBox.appendChild(suggestionItem);
    });

    // Afficher ou masquer les suggestions
    if (uniqueSuggestions.size > 0) {
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }
}

// Fonction pour lancer la recherche quand l'utilisateur clique sur une suggestion
function selectSuggestion(suggestion) {
    const input = document.getElementById('searchInput');
    input.value = suggestion;
    searchProducts();  // Lancer la recherche automatiquement

    // Masquer les suggestions après sélection
    document.querySelector('.suggestions').style.display = 'none';
}

// Fonction pour masquer les suggestions quand l'utilisateur clique en dehors
document.addEventListener('click', function(event) {
    const suggestionsBox = document.querySelector('.suggestions');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.style.display = 'none'; // Masquer les suggestions si l'utilisateur clique ailleurs
    }
});
