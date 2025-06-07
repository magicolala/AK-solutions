/**
 * Initializes the main JavaScript functionality for AK-Solutions.
 * 
 * This script sets up various interactive features when the DOM is fully loaded:
 * - Animate On Scroll (AOS) initialization
 * - Masonry gallery interactions
 * - Navbar scroll behavior
 * - Back-to-top button
 * - Counter animations
 * - Card hover effects
 * - Contact form handling
 * - Smooth scrolling
 * - Active navigation link highlighting
 * - Scroll arrow interactions
 * 
 * @fires DOMContentLoaded
 */
// ======================================
// Main JavaScript for AK-Solutions
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initMasonryGallery();
  initNavbarScroll();
  initBackToTop();
  initCounters();
  initCardHover();
  initContactForm();
  initSmoothScroll();
  initActiveNavLink();
  initScrollArrows();
  initTestimonialsCarousel();
    // Ajouter les nouvelles fonctions pour cacher Elfsight
  injectHidingCSS();
  hideElfsightBranding();
    if (typeof Granim !== 'undefined' && document.getElementById('granim-canvas')) {
        var granimInstance = new Granim({
            element: '#granim-canvas',
            direction: 'diagonal',
            isPausedWhenNotInView: true,
            opacity: [0.9, 1],
            states: {
                "default-state": {
                    gradients: [
                        ['#006187', '#82E2FF'],
                        ['#82E2FF', '#7A8EFF'],
                        ['#7A8EFF', '#006187'],
                        ['#006187', '#7A8EFF'],
                        ['#7A8EFF', '#82E2FF'],
                        ['#82E2FF', '#006187']
                    ],
                    transitionSpeed: 3000,
                    loop: true
                }
            }
        });
    }
});

// --------------------------------------
// 1. AOS (Animate On Scroll) init
// --------------------------------------
function initAOS() {
  // Exclude footer elements from AOS animation
  document.querySelectorAll("footer *[data-aos]").forEach(el => {
    el.removeAttribute("data-aos");
  });

  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    disable: "footer"
  });
}

// --------------------------------------
// 2. Masonry Gallery
// --------------------------------------
// Amélioration de la fonction initMasonryGallery
function initMasonryGallery() {
  const gallery = document.querySelector(".masonry-gallery");
  if (!gallery) return;

  const images = gallery.querySelectorAll(".masonry-item img");
  let loadedCount = 0;

  // Attendre que toutes les images soient chargées
  images.forEach(img => {
    img.onload = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        gallery.classList.add("images-loaded");
        
        // Animation d'entrée séquentielle
        setTimeout(() => {
          gallery.querySelectorAll('.masonry-item').forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 100);
          });
        }, 300);
      }
    };
    if (img.complete) img.onload();
  });

  // Interaction avancée au survol
  gallery.querySelectorAll(".gallery-card").forEach(card => {
    card.addEventListener("mouseenter", function() {
      // Ajouter une classe active pour des effets supplémentaires
      this.classList.add("active");
      
      // Effet de profondeur sur les autres cartes
      gallery.querySelectorAll(".gallery-card").forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.style.opacity = "0.7";
          otherCard.style.transform = "scale(0.98)";
        }
      });
    });
    
    card.addEventListener("mouseleave", function() {
      // Retirer la classe active
      this.classList.remove("active");
      
      // Restaurer l'apparence normale des autres cartes
      gallery.querySelectorAll(".gallery-card").forEach(otherCard => {
        otherCard.style.opacity = "";
        otherCard.style.transform = "";
      });
    });
    
    // Effet de parallaxe sur l'image au mouvement de la souris
    card.addEventListener("mousemove", function(e) {
      const cardRect = this.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      // Calculer la distance entre le curseur et le centre de la carte
      const moveX = (e.clientX - cardCenterX) / 20;
      const moveY = (e.clientY - cardCenterY) / 20;
      
      // Appliquer un léger effet de parallaxe à l'image
      const img = this.querySelector("img");
      img.style.transform = `scale(1.08) translate(${moveX}px, ${moveY}px)`;
    });
    
    // Réinitialiser la position de l'image quand la souris quitte la carte
    card.addEventListener("mouseleave", function() {
      const img = this.querySelector("img");
      img.style.transform = "";
    });
  });
  
  // Ajouter un effet de clic pour simuler une ouverture de modal (optionnel)
  gallery.querySelectorAll(".card-img-overlay").forEach(overlay => {
    overlay.addEventListener("click", function() {
      const img = this.previousElementSibling;
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt");
      
      // Vous pourriez implémenter ici une lightbox ou un modal
      // Pour l'instant, juste un effet visuel
      this.closest(".gallery-card").classList.add("pulse");
      
      setTimeout(() => {
        this.closest(".gallery-card").classList.remove("pulse");
      }, 500);
    });
  });
}

// --------------------------------------
// 3. Navbar scroll behavior
// --------------------------------------
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// --------------------------------------
// 4. Back-to-top button
// --------------------------------------
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --------------------------------------
// 5. Counter animations
// --------------------------------------
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach(counter => {
    const target = parseInt(counter.innerText, 10);
    let count = 0;

    const update = () => {
      if (count < target) {
        count++;
        counter.innerText = count;
        setTimeout(update, speed);
      }
    };
    update();
  });
}

// --------------------------------------
// 6. Card hover animation
// --------------------------------------
function initCardHover() {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });
}

// --------------------------------------
// 7. Contact form via Web3Forms
// --------------------------------------
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Hidden inputs for Web3Forms
  if (!form.querySelector('input[name="access_key"]')) {
    const key = document.createElement("input");
    key.type = "hidden";
    key.name = "access_key";
    key.value = "41067a98-9a4e-4cec-b09b-361099b59bee";
    form.appendChild(key);
  }
  if (!form.querySelector('input[name="botcheck"]')) {
    const bot = document.createElement("input");
    bot.type = "checkbox";
    bot.name = "botcheck";
    bot.style.display = "none";
    form.appendChild(bot);
  }

  let result = form.querySelector("#result");
  if (!result) {
    result = document.createElement("div");
    result.id = "result";
    form.appendChild(result);
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Envoi en cours...`;
    result.textContent = "Veuillez patienter...";

    try {
      const data = JSON.stringify(Object.fromEntries(new FormData(form)));
      const resp = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: data
      });
      const json = await resp.json();

      if (resp.ok) {
        btn.innerHTML = `<i class="bi bi-check-circle"></i> Message envoyé!`;
        btn.classList.replace("btn-primary", "btn-success");
        result.textContent = "Formulaire envoyé avec succès";
      } else {
        btn.innerHTML = `<i class="bi bi-x-circle"></i> Erreur!`;
        btn.classList.replace("btn-primary", "btn-danger");
        result.textContent = json.message || "Une erreur s'est produite";
      }
    } catch {
      btn.innerHTML = `<i class="bi bi-x-circle"></i> Erreur!`;
      btn.classList.replace("btn-primary", "btn-danger");
      result.textContent = "Une erreur s'est produite!";
    } finally {
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.classList.replace("btn-success", "btn-primary");
        btn.classList.remove("btn-danger");
        result.style.display = "none";
      }, 3000);
    }
  });
}

// --------------------------------------
// 8. Smooth scroll for anchor links
// --------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = anchor.getAttribute("href");
      if (target === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
      }
    });
  });
}

// --------------------------------------
// 9. Active link highlighting on scroll
// --------------------------------------
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");
  const collapse = document.querySelector(".navbar-collapse");

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (collapse.classList.contains("show")) {
        new bootstrap.Collapse(collapse).hide();
      }
    });
  });

  // Highlight on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const offset = 100;

    sections.forEach(sec => {
      const top = sec.offsetTop - offset;
      if (window.scrollY >= top && window.scrollY < top + sec.offsetHeight) {
        current = sec.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });
}

// --------------------------------------
// 10. Scroll arrows behavior
// --------------------------------------
function initScrollArrows() {
  document.querySelectorAll(".scroll-arrow").forEach(arrow => {
    arrow.addEventListener("click", () => {
      const target = document.querySelector(arrow.dataset.target);
      if (target) {
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      }
    });
  });
}

// Suivi des clics sur le numéro de téléphone
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    gtag('event', 'phone_call', {
      event_category: 'contact',
      event_label: 'Header Phone Click'
    });
  });
});

// Suivi des clics sur l'email
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', () => {
    gtag('event', 'email_click', {
      event_category: 'contact',
      event_label: 'Email Click'
    });
  });
});

// Suivi de la soumission du formulaire
document.getElementById('contactForm').addEventListener('submit', (e) => {
  gtag('event', 'form_submit', {
    event_category: 'lead_generation',
    event_label: 'Contact Form'
  });
});

// Suivi du temps passé sur la page
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
  let timeSpent = Math.round((Date.now() - startTime) / 1000);
  gtag('event', 'time_on_page', {
    event_category: 'engagement',
    value: timeSpent
  });
});

// --------------------------------------
// 11. Hide Elfsight widget text and logo
// --------------------------------------
function hideElfsightBranding() {
  // Fonction pour cacher les éléments Elfsight
  const hideElements = () => {
    // Cacher le lien "Free Whatsapp Chat button"
    const elfsightLinks = document.querySelectorAll('a[href*="elfsight.com/whatsapp-chat-widget"][href*="utm_campaign=free-widget"]');
    elfsightLinks.forEach(link => {
      link.style.setProperty('display', 'none', 'important');
      link.style.setProperty('visibility', 'hidden', 'important');
      link.style.setProperty('opacity', '0', 'important');
      link.style.setProperty('height', '0', 'important');
      link.style.setProperty('width', '0', 'important');
      link.style.setProperty('overflow', 'hidden', 'important');
    });

    // Cacher tous les liens Elfsight génériques
    const allElfsightLinks = document.querySelectorAll('a[href*="elfsight.com"]');
    allElfsightLinks.forEach(link => {
      link.style.setProperty('display', 'none', 'important');
      link.style.setProperty('visibility', 'hidden', 'important');
    });

    // Cacher le texte par contenu
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      if (link.textContent.includes('Free Whatsapp Chat button') || 
          link.textContent.includes('Elfsight') ||
          link.href.includes('elfsight.com')) {
        link.style.setProperty('display', 'none', 'important');
        link.style.setProperty('visibility', 'hidden', 'important');
      }
    });

    // Cacher les éléments par classe ou attributs Elfsight
    const elfsightElements = document.querySelectorAll('[class*="elfsight"], [id*="elfsight"], [data-elfsight]');
    elfsightElements.forEach(element => {
      // Ne cacher que les éléments de branding, pas le widget entier
      if (element.tagName === 'A' || 
          element.textContent.includes('Free') || 
          element.textContent.includes('Elfsight')) {
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('visibility', 'hidden', 'important');
      }
    });
  };

  // Exécuter immédiatement
  hideElements();

  // Observer les changements dans le DOM pour les widgets chargés dynamiquement
  const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldCheck = true;
      }
    });
    
    if (shouldCheck) {
      setTimeout(hideElements, 100); // Petit délai pour laisser le widget se charger
    }
  });

  // Observer tout le document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Vérifier périodiquement (au cas où le MutationObserver ne capturerait pas tout)
  setInterval(hideElements, 2000);
}

// Fonction pour injecter du CSS directement dans le head
function injectHidingCSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* Cacher le branding Elfsight avec une priorité maximale */
    a[href*="elfsight.com"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      height: 0 !important;
      width: 0 !important;
      overflow: hidden !important;
      position: absolute !important;
      left: -9999px !important;
    }
    
    /* Cacher par contenu textuel */
    a:has-text("Free Whatsapp Chat button"),
    a:has-text("Elfsight") {
      display: none !important;
      visibility: hidden !important;
    }
    
    /* Cacher les éléments avec classes Elfsight qui sont des liens */
    [class*="elfsight"] a,
    [id*="elfsight"] a {
      display: none !important;
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(style);
}

// --------------------------------------
// 12. Testimonials Carousel
// --------------------------------------
function initTestimonialsCarousel() {
  const carousel = document.getElementById('testimonialsCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = carousel.querySelectorAll('.testimonial-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let slidesPerView = 1; // Default for mobile

  // Function to update slidesPerView based on screen width
  const updateSlidesPerView = () => {
    if (window.innerWidth >= 992) {
      slidesPerView = 3;
    } else if (window.innerWidth >= 768) {
      slidesPerView = 2;
    } else {
      slidesPerView = 1;
    }
    // Recalculate total pages/dots based on slidesPerView
    updateDots();
    updateCarousel();
  };

  // Create dots
  const updateDots = () => {
    dotsContainer.innerHTML = ''; // Clear existing dots
    const totalDots = Math.ceil(totalSlides / slidesPerView);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (i === Math.floor(currentIndex / slidesPerView)) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        currentIndex = i * slidesPerView;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  };

  // Update carousel position and dot active state
  const updateCarousel = () => {
    // Ensure currentIndex is within bounds
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex >= totalSlides - (slidesPerView > 1 ? slidesPerView - 1 : 0)) {
         // Adjust max index based on slides per view
         currentIndex = totalSlides - (slidesPerView > 1 ? slidesPerView - 1 : 1);
         if (currentIndex < 0) currentIndex = 0; // Handle case with fewer slides than slidesPerView
    }


    const offset = -currentIndex * (100 / slidesPerView);
    carousel.style.transform = `translateX(${offset}%)`;

    // Update active dot
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === Math.floor(currentIndex / slidesPerView));
    });

    // Update button states (optional: disable at ends)
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalSlides - slidesPerView;
     if (totalSlides <= slidesPerView) { // Disable buttons if all slides are visible
        prevBtn.disabled = true;
        nextBtn.disabled = true;
     }
  };

  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    currentIndex -= slidesPerView;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex += slidesPerView;
    updateCarousel();
  });

  // Initial setup and update on resize
  updateSlidesPerView();
  window.addEventListener('resize', updateSlidesPerView);

  // Ensure initial state is correct
  updateCarousel();
}
