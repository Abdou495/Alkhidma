 const menuHambourguerButton = document.querySelector(".menu-hambourguer-butoon");
        const menuHambourguerButtonIcon = document.querySelector(".menu-hambourguer-butoon i");
        const menuHambourguer = document.querySelector(".menu-hambourguer");
    
        // Fonction pour basculer l'état du menu
        menuHambourguerButton.onclick = function (e) {
            e.stopPropagation(); // Empêche la propagation du clic au document
            menuHambourguer.classList.toggle("ouvert");
            const isOuvert = menuHambourguer.classList.contains("ouvert");
            menuHambourguerButtonIcon.className = isOuvert ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        };
    
        // Fonction pour fermer le menu si l'utilisateur clique ailleurs
        document.onclick = function () {
            if (menuHambourguer.classList.contains("ouvert")) {
                menuHambourguer.classList.remove("ouvert");
                menuHambourguerButtonIcon.className = "fa-solid fa-bars";
            }
        };
    
        // Empêche la fermeture si on clique dans le menu
        menuHambourguer.onclick = function (e) {
            e.stopPropagation(); // Empêche le clic d'atteindre le document
        };


        document.querySelector('.toggle-content-btn').addEventListener('click', function() {
            const contentSection = document.querySelector('.formation-content');
            // Si la section est cachée, on l'affiche, sinon on la cache
            if (contentSection.style.display === 'none' || contentSection.style.display === '') {
                contentSection.style.display = 'block';
                this.textContent = 'Masquer le contenu de la formation'; // Modifier le texte du bouton
            } else {
                contentSection.style.display = 'none';
                this.textContent = 'Afficher le contenu de la formation'; // Réinitialiser le texte du bouton
            }
        });
        