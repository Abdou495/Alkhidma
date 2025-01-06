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
function showProductDetails(productId) {
    const products = {
        "produit1categori1": {
            title: "Smartphone X",
            image: "images/img3.jpg",
            description: "Un téléphone performant avec un écran 6.5 pouces.",
            price: "19,500 XOF",
            whatsappMessage: "Je suis intéressé par le Smartphone X. Pouvez-vous me donner plus de détails ?"
        },
        "phone1": {
            title: "Phone A",
            image: "images/phone1.png",
            description: "Un smartphone avec une excellente caméra et performance.",
            price: "19,500 XOF",
            whatsappMessage: "Je suis intéressé par le Phone A. Pouvez-vous me donner plus de détails ?"
        },
        // Ajoutez plus de produits ici...
    };

    const product = products[productId];

    // Mettre à jour le contenu de la modale
    document.getElementById("modalProductTitle").innerText = product.title;
    document.getElementById("modalProductImage").src = product.image;
    document.getElementById("modalProductDescription").innerText = product.description;
    document.getElementById("modalProductPrice").innerText = product.price;

    // Créer le lien WhatsApp
    const whatsappNumber = "1234567890"; // Remplacez par votre numéro WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(product.whatsappMessage)}`;
    document.getElementById("whatsappButton").href = whatsappLink;

    // Afficher la modale
    document.getElementById("productModal").style.display = "block";
}

// Fonction pour fermer la modale
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("productModal").style.display = "none";
});

// Fermer la modale si l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == document.getElementById("productModal")) {
        document.getElementById("productModal").style.display = "none";
    }
}



