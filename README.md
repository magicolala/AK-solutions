# Documentation du site AK Solutions

## Introduction
Cette documentation va t'aider à comprendre comment le site AK Solutions est construit, même si tu n'as que des connaissances de base en HTML. Je vais expliquer les différentes parties du site, les technologies utilisées, et comment tout fonctionne ensemble.

## Technologies utilisées
Avant d'entrer dans les détails, voici les principales technologies utilisées :

- **HTML5** : La structure de base du site
- **CSS3** : Le style et l'apparence visuelle
- **Bootstrap 5** : Un framework CSS qui facilite la création de sites responsifs
- **JavaScript** : Pour les interactions et animations
- **AOS (Animate On Scroll)** : Une bibliothèque pour créer des animations au défilement

## Qu'est-ce que Bootstrap ?
Bootstrap est comme une boîte à outils pour créer des sites web. Au lieu de devoir écrire tout le CSS à partir de zéro, Bootstrap fournit des classes prédéfinies que tu peux ajouter à tes éléments HTML. Par exemple :
- `container` crée un conteneur centré avec des marges
- `row` et `col-*` créent un système de grille pour organiser le contenu
- `d-flex` active le modèle Flexbox pour aligner facilement les éléments
- `bg-primary` applique la couleur principale du thème

Bootstrap rend le site automatiquement responsive (il s'adapte aux différentes tailles d'écran) grâce à son système de grille et ses classes utilitaires.

## Structure générale du site

### 1. En-tête du document (Head)
```html
<head>
  <!-- Métadonnées de base -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Balises SEO -->
  <title>AK Solutions - Maintenance Technique & Dépannage en Île-de-France</title>
  <meta name="description" content="...">
  
  <!-- Liens vers les ressources externes -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
```
Cette section contient :
- Les métadonnées qui aident les navigateurs et moteurs de recherche à comprendre le site
- Les liens vers les fichiers CSS (Bootstrap et notre propre CSS)
- Les liens vers les polices de caractères (Google Fonts)
- Les scripts JavaScript avec l'attribut `defer` (qui les fait charger après le HTML)
- Les balises SEO et Open Graph aident à améliorer le référencement et l'apparence du site lorsqu'il est partagé sur les réseaux sociaux.

### 2. Barre de navigation (Header)
```html
<header class="sticky-top">
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <!-- Logo et nom -->
    <a class="navbar-brand fw-bold" href="#">
      <div class="d-flex align-items-center">
        <img src="./img/logo.png" alt="Logo AK Solutions" width="40" height="40" class="me-2">
        <span>AK Solutions</span>
      </div>
    </a>
    
    <!-- Menu de navigation -->
    <!-- etc. -->
  </nav>
</header>
```
La navigation utilise les composants navbar de Bootstrap :
- `sticky-top` fait que la barre reste collée en haut de l'écran lors du défilement
- `navbar-expand-lg` signifie que le menu s'affiche normalement sur les grands écrans, mais se transforme en menu hamburger sur les petits écrans
- `d-flex align-items-center` aligne verticalement le logo et le texte

### 3. Section Héro (Hero)
```html
<section class="hero bg-primary text-dark text-center py-5 position-relative hero-custom">
  <div class="container">
    <h1 class="display-4 fw-bold mb-4" data-aos="zoom-in">
      Technicien multi-compétences à votre écoute en Île-de-France
    </h1>
    <!-- etc. -->
  </div>
  <div class="shape-wrap"></div>
  <div class="scroll-arrow" data-target="#about">
    <i class="bi bi-chevron-down"></i>
  </div>
</section>
```
Points importants :
- `data-aos="zoom-in"` crée une animation d'entrée (le texte apparaît en zoom)
- `data-aos-delay="100"` retarde l'animation de 100ms (pour créer un effet séquentiel)
- `shape-wrap` est une forme décorative en bas de la section (définie en CSS)
- `scroll-arrow` est une flèche cliquable qui fait défiler vers la section suivante

### 4. Sections de contenu
Toutes les sections suivent une structure similaire :
```html
<section id="SECTION_ID" class="py-5 [bg-light]">
  <div class="container">
    <h2 class="text-center fw-bold mb-5" data-aos="fade-up">TITRE</h2>
    
    <!-- Contenu spécifique à la section -->
    
  </div>
  <div class="scroll-arrow" data-target="#SECTION_SUIVANTE">
    <i class="bi bi-chevron-down"></i>
  </div>
</section>
```
Les sections alternent souvent entre fond blanc et fond gris clair (`bg-light`) pour créer une séparation visuelle.

### 5. Formulaire de contact
```html
<form id="contactForm">
  <div class="row">
    <div class="col-md-6 mb-3">
      <div class="form-floating">
        <input type="text" class="form-control" id="name" name="name" placeholder="Votre nom" required>
        <label for="name">Votre nom</label>
      </div>
    </div>
    <!-- Autres champs -->
  </div>
  
  <button type="submit" class="btn-modern w-100">
    <i class="bi bi-send"></i> Envoyer ma demande
  </button>
  
  <div id="result" class="mt-3 text-center"></div>
</form>
```
Le formulaire utilise :
- Les composants `form-floating` de Bootstrap pour des champs avec étiquettes flottantes
- L'attribut `required` pour la validation côté client
- Un élément `#result` où JavaScript affichera les messages de succès/erreur

### 6. Pied de page (Footer)
```html
<footer class="bg-dark text-white py-5">
  <div class="container">
    <div class="row">
      <!-- 4 colonnes avec différentes informations -->
    </div>
    
    <hr class="mt-4 mb-4 border-secondary">
    
    <div class="row align-items-center">
      <!-- Copyright et liens légaux -->
    </div>
  </div>
</footer>
```
Le footer utilise une mise en page à 4 colonnes qui se réorganise sur les petits écrans.

## Comprendre le JavaScript (script.js)
Le JavaScript du site est organisé en fonctions distinctes, chacune responsable d'une fonctionnalité spécifique :
```javascript
document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initMasonryGallery();
  initNavbarScroll();
  initBackToTop();
  // etc.
});
```
Cette structure signifie que le code attend que la page soit chargée (`DOMContentLoaded`), puis initialise toutes les fonctionnalités une par une.

### Principales fonctionnalités JavaScript :
- **Animations AOS** : Initialise la bibliothèque d'animations au défilement
```javascript
function initAOS() {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });
}
```

- **Galerie Masonry** : Crée la disposition en mosaïque de la galerie et ajoute des effets interactifs
```javascript
function initMasonryGallery() {
  // Attendre que les images soient chargées
  // Ajouter des effets au survol
  // etc.
}
```

- **Formulaire de contact** : Gère l'envoi du formulaire via AJAX
```javascript
function initContactForm() {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    // Envoyer les données
    // Afficher le résultat
  });
}
```

- **Navigation fluide** : Fait défiler en douceur vers les sections lors du clic sur les liens
```javascript
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      // Faire défiler vers la cible
    });
  });
}
```

- **Flèches de défilement** : Gère le comportement des flèches qui font défiler vers la section suivante
```javascript
function initScrollArrows() {
  document.querySelectorAll(".scroll-arrow").forEach(arrow => {
    arrow.addEventListener("click", () => {
      // Faire défiler vers la cible
    });
  });
}
```

## Comprendre le CSS (style.css)
Le CSS est organisé en sections pour faciliter la maintenance :
```css
/* ======================================
   1. VARIABLES ET CONFIGURATION DE BASE
   ====================================== */
:root {
  /* Couleurs principales */
  --bs-primary: #dae9ff !important;
  /* etc. */
}

/* ======================================
   2. STYLES GÉNÉRAUX
   ====================================== */
body {
  font-family: 'Nunito', sans-serif;
  overflow-x: hidden;
}
```
### Points importants du CSS :
- **Variables CSS** : Définies dans `:root` pour une utilisation cohérente des couleurs, espacements, etc.
- **Personnalisation de Bootstrap** : Le site redéfinit certaines variables Bootstrap (comme `--bs-primary`) pour adapter le thème de couleur.
- **Composants personnalisés** : Des styles spécifiques pour les cartes de services, boutons modernes, etc.
- **Animations et transitions** : Effets visuels pour améliorer l'expérience utilisateur.
- **Media queries** : Ajustements pour différentes tailles d'écran (responsive design).

## Composants personnalisés
### 1. Cartes de services
```html
<div class="service-card" data-aos="fade-up" data-aos-delay="100">
  <div class="service-card-icon">
    <i class="bi bi-tools"></i>
  </div>
  <div class="service-card-content">
    <h3 class="service-card-title">Plomberie générale</h3>
    <p class="service-card-text">...</p>
    <a href="#contact" class="service-card-link">En savoir plus <i class="bi bi-arrow-right"></i></a>
  </div>
</div>
```
Ces cartes ont un style personnalisé défini dans le CSS, avec une icône à gauche et du contenu à droite.

### 2. Galerie Masonry
```html
<div class="masonry-gallery" data-aos="fade-up">
  <div class="masonry-item" data-aos="zoom-in" data-aos-delay="100">
    <div class="card shadow-sm gallery-card">
      <!-- Image et contenu -->
    </div>
  </div>
  <!-- Autres éléments -->
</div>
```
La galerie utilise une disposition en colonnes CSS pour créer l'effet "masonry" (comme Pinterest). Le JavaScript ajoute des animations et effets interactifs.

### 3. Boutons modernes
```html
<a href="#contact" class="btn-modern btn-modern-icon" data-aos="fade-up" data-aos-delay="200">
  <i class="bi bi-chat-dots"></i> Demander un devis gratuit
</a>
```
Ces boutons ont un style personnalisé avec des effets de survol et des animations au clic.

## Comment modifier le site
### Pour ajouter un nouveau service :
1. Trouve la section `<div class="services-grid">` dans le HTML.
2. Copie un bloc `<div class="service-card">...</div>` existant.
3. Modifie l'icône, le titre, la description et le lien.
4. Assure-toi de garder les attributs `data-aos` pour maintenir les animations.

### Pour ajouter une nouvelle réalisation dans la galerie :
1. Trouve la section `<div class="masonry-gallery">` dans le HTML.
2. Copie un bloc `<div class="masonry-item">...</div>` existant.
3. Remplace l'image, le titre et la description.
4. Assure-toi que l'attribut `alt` de l'image décrit bien le contenu.

### Pour modifier les informations de contact :
Recherche les sections pertinentes dans la section contact et le footer, puis mets à jour les numéros de téléphone, adresses email, etc.

## Conseils pour la maintenance
- **Comprendre Bootstrap** : La plupart de la mise en page est gérée par Bootstrap. Apprendre les classes de base de Bootstrap t'aidera beaucoup.
- **Tester sur différents appareils** : Vérifie toujours que tes modifications fonctionnent bien sur desktop, tablette et mobile.
- **Optimiser les images** : Compresse les nouvelles images avant de les ajouter au site pour maintenir de bonnes performances.
- **Respecter la structure** : Garde la même structure HTML pour maintenir la cohérence du design et les animations.
- **Utiliser les outils de développement** : Les outils de développement du navigateur (F12) sont très utiles pour inspecter et modifier le code en temps réel.

J'espère que cette documentation t'aide à mieux comprendre comment le site AK Solutions est construit ! N'hésite pas à poser des questions si certains aspects ne sont pas clairs.

# 🎨 CHARTE GRAPHIQUE AK-SOLUTIONS

## COULEURS PRINCIPALES

### Couleur Primaire – Bleu Électrique
- Principal : `#007FFF` (Electric Blue)
- Foncé : `#0059B2`
- Très foncé : `#003366` (pour les titres)
- Clair : `#CCE5FF`
- RGB : `0, 127, 255`

### Couleur Secondaire – Orange Foncé
- Principal : `#FF8C00` (Dark Orange)
- Foncé : `#D97700`
- Clair : `#FFE0B2`
- RGB : `255, 140, 0`

### Couleurs de Texte
- Sur fond bleu : `#FFFFFF`
- Sur fond orange : `#FFFFFF`
- Texte standard foncé : `#212529`
- Texte standard clair : `#F8F9FA`
- Texte atténué : `#6c757d`

### Couleurs de Fond
- Gris clair : `#F8F9FA`
- Blanc : `#FFFFFF`

---

## TYPOGRAPHIE

### Police Principale
- Famille : `'Nunito', sans-serif`
- Fallbacks : `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

### Hiérarchie des Titres
- H1–H6 : Couleur `#003366`, Poids `700`
- Display-4 : Poids `800`
- Lead : Poids `400`

---

## SYSTÈME D'ESPACEMENT
- `--space-s`: `8px`
- `--space-m`: `16px`
- `--space-l`: `24px`
- `--space-xl`: `32px`

---

## SYSTÈME DE RAYONS (BORDER-RADIUS)
- `--radius-s`: `8px`
- `--radius-m`: `12px`
- `--radius-l`: `24px`
- `--radius-xl`: `48px`

---

## SYSTÈME D'OMBRES
- `--shadow-100`: `0px 0px 8px 2px rgba(0, 0, 0, .10)`
- `--shadow-200`: `0px 0px 16px 4px rgba(0, 0, 0, .10)`

---

## COMPOSANTS SPÉCIFIQUES

### Boutons
- **Principal** : Fond orange `#FF8C00`, texte blanc, rayon `48px`
- **Outline** : Bordure bleue `#007FFF`, fond transparent
- Hauteur minimale : `52px`
- Transition : `0.3s ease`

### Cartes de Services
- Fond : `#CCE5FF`
- Bordure gauche : `4px solid #0059B2`
- Hauteur minimale : `320px`
- Rayon : `12px`
- Icônes : Cercle `3rem`, fond bleu avec opacité

### Navigation
- Fond : `#007FFF`
- Liens : Blanc avec soulignement animé
- Bouton Contact : Orange `#FF8C00`

### Hero Section
- Fond : Dégradé bleu (`#0059B2 → #007FFF → #CCE5FF`)
- Animation : Gradient animé + Canvas Granim
- Forme : SVG arrondi blanc en bas

---

## STYLE GOOGLE POUR TÉMOIGNAGES

### Couleurs Spécifiques
- Étoiles : `#FBBC04` (jaune Google)
- Bleu Google : `#4285F4` (badges et avatars)
- Bordures : `#dadce0`
- Ombres : `rgba(60, 64, 67, 0.3)`

---

## RESPONSIVE

### Breakpoints
- Mobile : `< 576px`
- Tablette : `576px – 992px`
- Desktop : `> 992px`

### Grilles
- **Services** : `3 → 2 → 1` colonnes
- **Galerie Masonry** : `4 → 2 → 1` colonnes

---

## ANIMATIONS & TRANSITIONS

### Durées Standard
- Rapide : `0.2s ease`
- Standard : `0.3s ease`
- Lente : `0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`

### Effets Hover
- Cartes : `translateY(-10px)` + ombre renforcée
- Boutons : `translateY(-3px)` + `scale(1.05)`
- Images : `scale(1.1)`

---

## ICÔNES

- Famille : `Bootstrap Icons`
- Taille standard : `1.8rem`
- Couleur : `#0059B2` (bleu foncé)
- Conteneurs : Cercles avec fond bleu clair

---

> 🎯 **Cette charte graphique assure une cohérence visuelle complète pour le site AK-Solutions. Tous les développeurs peuvent s'y référer pour maintenir l'identité visuelle du projet !**