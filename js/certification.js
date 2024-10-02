'use strict';

// Fonction pour initialiser les événements de certifications
function certificationsEvents() {
    function events() {
        // Sélection des éléments de catégorie et des listes de certifications
        const categories = document.querySelectorAll('#certifications_section .box .menu .category');
        const certificationLists = document.querySelectorAll('#certifications_section .box .box_content .certifications_list');
        const selector = document.querySelector('#certifications_section .box .menu .selector');

        // Vérifiez si les éléments existent avant de les manipuler
        if (!categories.length || !certificationLists.length || !selector) {
            console.error('Un ou plusieurs éléments nécessaires pour les événements des certifications sont introuvables.');
            return;
        }

        // Fonction pour gérer la sélection d'une catégorie
        function chooseCategory(index) {
            // Déplacer le sélecteur vers la catégorie choisie
            selector.style.top = (100 / categories.length) * index + '%';

            // Mettre à jour les styles de curseur pour les catégories
            categories.forEach((category, i) => {
                category.style.cursor = (i === index) ? 'default' : 'pointer';
            });

            // Afficher la liste de certifications correspondante et masquer les autres
            certificationLists.forEach((list, i) => {
                list.style.display = (i === index) ? 'grid' : 'none';
            });
        }

        // Attacher les événements de clic à chaque catégorie
        categories.forEach((category, index) => {
            category.addEventListener('click', () => chooseCategory(index));
        });

        // Initialiser la première catégorie comme sélectionnée
        chooseCategory(0);
    }

    // Initialiser les événements
    events();
}

// Fonction pour générer le HTML pour les certifications
function generateCertifications(data) {
    const box = document.querySelector('#certifications_section .box');

    // Vérifiez si l'élément box existe
    if (!box) {
        console.error('L\'élément #certifications_section .box est introuvable.');
        return;
    }

    box.innerHTML = ''; // Effacer le contenu existant

    // Générer le contenu seulement si la largeur de la fenêtre est supérieure à 930px
    if (window.innerWidth > 930) {
        let menuHTML = '';
        let boxContentHTML = '';

        // Créer l'élément de sélection
        menuHTML += `
            <div class="selector" style="height: calc(100% / ${data.certifications_categories.length})"></div>
        `;

        // Boucler sur chaque catégorie et générer le HTML respectif
        data.certifications_categories.forEach(category => {
            menuHTML += `<div class="category">${category.name}</div>`;

            let certificationsHTML = '';
            category.certifications.forEach(certification => {
                certificationsHTML += `
                    <a class="certification" href="${certification.link}" target="_blank">
                        <img src="${certification.logo}" alt="${certification.name.toLowerCase()}" width="190px" height="190px"/>
                        <span>${certification.name}</span>
                    </a>
                `;
            });

            // Ajouter chaque liste de certifications au contenu de la boîte
            boxContentHTML += `<div class="certifications_list">${certificationsHTML}</div>`;
        });

        // Définir le HTML interne de la boîte
        box.innerHTML = `
            <div class="menu">${menuHTML}</div>
            <div class="box_content">${boxContentHTML}</div>
        `;

        // Initialiser les événements des certifications
        certificationsEvents();
    }
}

// Stocker la largeur de la fenêtre précédente pour gérer les changements réactifs
let prevWidth = window.innerWidth;

// S'assurer que le DOM est prêt avant de générer les certifications
document.addEventListener('DOMContentLoaded', () => {
    // Lire le JSON et générer les certifications lors du chargement initial
    read_json('resources/jsons/certifications.json', generateCertifications);
});

// Écouteur d'événement pour redimensionner la fenêtre et régénérer le contenu si le seuil est franchi
window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;

    // Vérifiez que l'élément existe avant de régénérer le contenu
    if (document.querySelector('#certifications_section .box')) {
        // Vérifiez si la largeur de la fenêtre dépasse le seuil de 930px
        if ((prevWidth >= 930 && currentWidth < 930) || (prevWidth < 930 && currentWidth >= 930)) {
            read_json('resources/jsons/certifications.json', generateCertifications);
            prevWidth = currentWidth;
        }
    }
});
