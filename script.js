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
        images: ['images/p1_1.png', 'images/p2_1.jpg', 'images/p3_1.jpg'],
        title: 'Phone',
        description: 'Préparez pains, gâteaux et crèmes avec facilité 🥖🎂, Inclus : fouet 🌀, crochet 🥯, et pale mélangeuse 🍪.',
        oldPrice: '25,000 XOF',
        newPrice: '19,500 XOF',
        whatsapp: 'https://wa.me/221789586031?text= Bonjour! je suis intéressé par cet article "ID: p1".'
    },
    p2: {
        images: ['images/p1_2.jpg','images/p2_2.jpg', 'images/p3_2.jpg', 'images/p4_2.jpg'],
        title: 'Smartphone Avancé',
        description: 'Smartphone avec fonctionnalités avancées.',
        oldPrice: '50,000 XOF',
        newPrice: '45,000 XOF',
        whatsapp: 'https://wa.me/221789586031?text= Bonjour! je suis intéressé par cet article "ID: p2".'
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

// Liste des produits à rechercher
const productItems = document.querySelectorAll('.produit');

// Fonction principale de recherche
function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    const suggestionsBox = document.querySelector('.suggestions');

    resultsContainer.innerHTML = '';  // Effacer les anciens résultats
    suggestionsBox.style.display = 'none'; // Masquer les suggestions après la recherche

    let foundAnyProduct = false;

    // Masquer tous les produits au départ
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(input)) {
            item.style.display = 'block'; // Afficher le produit si la recherche correspond
            foundAnyProduct = true;
        } else {
            item.style.display = 'none'; // Masquer les produits qui ne correspondent pas
        }
    });

    // Si aucun produit trouvé, afficher le message
    if (!foundAnyProduct && input !== '') {
        resultsContainer.innerHTML = '<p>Aucun produit trouvé.</p>';
    }

    // Remettre le focus sur la barre de recherche après la recherche
    document.getElementById('searchInput').focus();
}

// Fonction pour afficher les suggestions en fonction de ce que l'utilisateur tape
function showSuggestions(input) {
    const suggestionsBox = document.querySelector('.suggestions');
    const uniqueSuggestions = new Set();

    // Créer une liste de suggestions en fonction des produits visibles
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(input.toLowerCase()) && input !== '') {
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

// Fonction pour lancer la recherche lorsqu'une suggestion est cliquée
function selectSuggestion(suggestion) {
    const input = document.getElementById('searchInput');
    input.value = suggestion;
    searchProducts();  // Lancer la recherche automatiquement après sélection
    document.querySelector('.suggestions').style.display = 'none'; // Masquer les suggestions
}

// Fonction pour exécuter la recherche lorsqu'une touche est pressée (notamment "Entrée")
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Empêche le comportement par défaut (comme le rechargement de la page)

        searchProducts(); // Exécuter la recherche si "Entrée" est pressé

        // Assurez-vous que le focus reste sur la barre de recherche
        const searchInput = document.getElementById('searchInput');
        searchInput.focus();

        // Après l'exécution de la recherche, faire sortir le pointeur de la barre de recherche
        setTimeout(() => {
            searchInput.blur();  // Retirer le focus de la barre de recherche (sortir le pointeur)
        }, 100);  // Délai de 100ms pour simuler la sortie du pointeur
    }
}

// Masquer les suggestions si l'utilisateur clique en dehors de la barre de recherche
document.addEventListener('click', function(event) {
    const suggestionsBox = document.querySelector('.suggestions');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.style.display = 'none'; // Masquer les suggestions si l'utilisateur clique ailleurs
    }
});

// Ajout d'un événement sur la barre de recherche pour détecter la saisie
document.getElementById('searchInput').addEventListener('input', function() {
    const inputValue = this.value;
    showSuggestions(inputValue);  // Afficher les suggestions en fonction de la saisie
});

// Ajouter un gestionnaire d'événement pour le clic sur la barre de recherche
document.getElementById('searchInput').addEventListener('click', function() {
    // Lorsque l'utilisateur clique sur la barre de recherche, afficher les suggestions
    const inputValue = this.value;
    showSuggestions(inputValue);
});

// Ajouter l'événement 'keydown' sur la barre de recherche pour détecter l'Entrée
document.getElementById('searchInput').addEventListener('keydown', handleKeyDown);








const videos = [
    {
        title: "Vidéo éducative 1",
        description: "Description de la vidéo 1.",
        url: "https://www.youtube.com/embed/ID_VIDEO"
    },
    {
        title: "Vidéo éducative 2",
        description: "Description de la vidéo 2.",
        url: "https://www.youtube.com/embed/ID_VIDEO2"
    }
];

function loadVideos() {
    const container = document.querySelector('.video-container');
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-item';
        videoElement.innerHTML = `
            <iframe src="${video.url}" allowfullscreen></iframe>
            <h3>${video.title}</h3>
            <p>${video.description}</p>
        `;
        container.appendChild(videoElement);
    });
}

window.onload = loadVideos;






// detecter Animation au defillement
