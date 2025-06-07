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
  
  // Utiliser requestIdleCallback de façon plus intelligente
  if ("requestIdleCallback" in window) {
    // Tâches critiques immédiatement
    initNavbarScroll();
    initSmoothScroll();
    initContactForm();
    initScrollArrows(); // Ajouter cette ligne

    // Tâches non critiques en idle
    requestIdleCallback(
      () => {
        initAOS();
        initTestimonialsCarousel();
        initActiveNavLink(); // Ajouter cette ligne aussi
        initBackToTop(); // Et celle-ci
      },
      { timeout: 2000 }
    );

    // Masonry après que les images soient prêtes
    requestIdleCallback(
      () => {
        initMasonryGallery();
      },
      { timeout: 3000 }
    );
  } else {
    // Fallback optimisé
    setTimeout(() => {
      initNavbarScroll();
      initSmoothScroll();
      initContactForm();
      initScrollArrows(); // Ajouter cette ligne
    }, 0);

    setTimeout(() => {
      initAOS();
      initMasonryGallery();
      initTestimonialsCarousel();
      initActiveNavLink(); // Ajouter cette ligne
      initBackToTop(); // Et celle-ci
    }, 100);
  }

  // Granim après le chargement complet
  window.addEventListener("load", () => {
    requestIdleCallback(initGranim, { timeout: 1000 });
  });
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof gtag !== 'undefined') {
        gtag("event", "phone_call", {
          event_category: "contact",
          event_label: "Header Phone Click",
        });
      }
    });
  });

  // Suivi des clics sur l'email
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof gtag !== 'undefined') {
        gtag("event", "email_click", {
          event_category: "contact",
          event_label: "Email Click",
        });
      }
    });
  });

  // Suivi de la soumission du formulaire
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      if (typeof gtag !== 'undefined') {
        gtag("event", "form_submit", {
          event_category: "lead_generation",
          event_label: "Contact Form",
        });
      }
    });
  }

  // Suivi du temps passé sur la page
  let startTime = Date.now();
  window.addEventListener("beforeunload", () => {
    if (typeof gtag !== 'undefined') {
      let timeSpent = Math.round((Date.now() - startTime) / 1000);
      gtag("event", "time_on_page", {
        event_category: "engagement",
        value: timeSpent,
      });
    }
  });
});
// ======================================
function initGranim() {
  if (
    typeof Granim !== "undefined" &&
    document.getElementById("granim-canvas")
  ) {
    // Délai pour ne pas impacter le LCP
    setTimeout(() => {
      requestAnimationFrame(() => {
        const granimInstance = new Granim({
          element: "#granim-canvas",
          direction: "diagonal",
          isPausedWhenNotInView: true,
          opacity: [0.9, 1],
          states: {
            "default-state": {
              gradients: [
                ["#006187", "#82E2FF"],
                ["#82E2FF", "#7A8EFF"],
                ["#7A8EFF", "#006187"],
                ["#006187", "#7A8EFF"],
                ["#7A8EFF", "#82E2FF"],
                ["#82E2FF", "#006187"],
              ],
              transitionSpeed: 3000,
              loop: true,
            },
          },
        });

        // Marquer comme chargé
        document.getElementById("granim-canvas").classList.add("loaded");
      });
    }, 1000); // Délai de 1 seconde
  }
}

// --------------------------------------
// 1. AOS (Animate On Scroll) init
// --------------------------------------
function initAOS() {
  // Exclude footer elements from AOS animation
  document.querySelectorAll("footer *[data-aos]").forEach((el) => {
    el.removeAttribute("data-aos");
  });

  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    disable: "footer",
  });
}

// --------------------------------------
// 2. Masonry Gallery
// --------------------------------------
// Amélioration de la fonction initMasonryGallery
// Amélioration de la fonction initMasonryGallery
function initMasonryGallery() {
  const gallery = document.querySelector(".masonry-gallery");
  if (!gallery) return;

  const images = gallery.querySelectorAll(".masonry-item img");
  let loadedCount = 0;

  // Attendre que toutes les images soient chargées
  images.forEach((img) => {
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        // Utiliser requestAnimationFrame pour éviter les layout shifts
        requestAnimationFrame(() => {
          gallery.classList.add("images-loaded");

          // Animation d'entrée séquentielle optimisée
          const items = gallery.querySelectorAll(".masonry-item");
          items.forEach((item, index) => {
            // Utiliser transform au lieu de changer opacity/transform directement
            item.style.willChange = "transform, opacity";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
              // Nettoyer will-change après l'animation
              setTimeout(() => {
                item.style.willChange = "auto";
              }, 300);
            }, index * 100);
          });
        });
      }
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.onload = handleImageLoad;
    }
  });

  // Interaction optimisée au survol
  gallery.querySelectorAll(".gallery-card").forEach((card) => {
    let isHovering = false;

    card.addEventListener("mouseenter", function () {
      if (isHovering) return;
      isHovering = true;

      // Utiliser requestAnimationFrame pour les changements de style
      requestAnimationFrame(() => {
        this.classList.add("active");

        // Optimiser les effets sur les autres cartes
        const otherCards = gallery.querySelectorAll(".gallery-card");
        otherCards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.style.willChange = "transform, opacity";
            otherCard.style.opacity = "0.7";
            otherCard.style.transform = "scale(0.98)";
          }
        });
      });
    });

    card.addEventListener("mouseleave", function () {
      if (!isHovering) return;
      isHovering = false;

      requestAnimationFrame(() => {
        this.classList.remove("active");

        // Restaurer l'apparence normale
        const otherCards = gallery.querySelectorAll(".gallery-card");
        otherCards.forEach((otherCard) => {
          otherCard.style.opacity = "";
          otherCard.style.transform = "";
          otherCard.style.willChange = "auto";
        });
      });
    });

    // Effet de parallaxe optimisé
    let rafId = null;
    card.addEventListener("mousemove", function (e) {
      if (rafId) return; // Éviter les appels multiples

      rafId = requestAnimationFrame(() => {
        const cardRect = this.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const moveX = (e.clientX - cardCenterX) / 20;
        const moveY = (e.clientY - cardCenterY) / 20;

        const img = this.querySelector("img");
        if (img) {
          img.style.willChange = "transform";
          img.style.transform = `scale(1.08) translate(${moveX}px, ${moveY}px)`;
        }

        rafId = null;
      });
    });

    // Réinitialiser optimisé
    card.addEventListener("mouseleave", function () {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      requestAnimationFrame(() => {
        const img = this.querySelector("img");
        if (img) {
          img.style.transform = "";
          img.style.willChange = "auto";
        }
      });
    });

    // Effet de clic optimisé
    const overlay = card.querySelector(".card-img-overlay");
    if (overlay) {
      overlay.addEventListener("click", function () {
        requestAnimationFrame(() => {
          const galleryCard = this.closest(".gallery-card");
          galleryCard.classList.add("pulse");

          setTimeout(() => {
            galleryCard.classList.remove("pulse");
          }, 500);
        });
      });
    }
  });
}

// --------------------------------------
// 3. Navbar scroll behavior
// --------------------------------------
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let ticking = false;
  let lastScrollY = 0;

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Éviter les calculs inutiles
    if (Math.abs(scrollY - lastScrollY) < 5) {
      ticking = false;
      return;
    }

    // Ajouter/supprimer la classe scrolled
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  // Utiliser passive listener pour de meilleures performances
  window.addEventListener("scroll", requestTick, { passive: true });
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

  btn.addEventListener("click", (e) => {
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

  counters.forEach((counter) => {
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
  document.querySelectorAll(".card").forEach((card) => {
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

  form.addEventListener("submit", async (e) => {
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: data,
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
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
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
  const links = document.querySelectorAll(".nav-link");
  const collapse = document.querySelector(".navbar-collapse");

  // Close mobile menu on link click
  links.forEach((link) => {
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

    sections.forEach((sec) => {
      const top = sec.offsetTop - offset;
      if (window.scrollY >= top && window.scrollY < top + sec.offsetHeight) {
        current = sec.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });
}

// --------------------------------------
// 10. Scroll arrows behavior
// --------------------------------------
function initScrollArrows() {
  const arrows = document.querySelectorAll(".scroll-arrow");
  
  if (arrows.length === 0) {
    console.log("Aucune flèche de défilement trouvée");
    return;
  }

  arrows.forEach((arrow, index) => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const targetSelector = arrow.dataset.target;
      
      if (!targetSelector) {
        console.warn(`Flèche ${index + 1}: Aucun data-target défini`);
        return;
      }

      const target = document.querySelector(targetSelector);
      
      if (target) {
        // Calculer la position avec offset pour la navbar
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const offsetTop = target.offsetTop - navbarHeight;
        
        // Animation de scroll fluide
        window.scrollTo({ 
          top: Math.max(0, offsetTop), 
          behavior: "smooth" 
        });
        
        console.log(`Scroll vers: ${targetSelector}`);
      } else {
        console.warn(`Flèche ${index + 1}: Cible "${targetSelector}" non trouvée`);
      }
    });

    // Ajouter un effet visuel au clic
    arrow.addEventListener("mousedown", () => {
      arrow.style.transform = "scale(0.95)";
    });
    
    arrow.addEventListener("mouseup", () => {
      arrow.style.transform = "";
    });
    
    arrow.addEventListener("mouseleave", () => {
      arrow.style.transform = "";
    });
  });

  console.log(`✅ ${arrows.length} flèche(s) de défilement initialisée(s)`);
}

// Suivi des clics sur le numéro de téléphone
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => {
    gtag("event", "phone_call", {
      event_category: "contact",
      event_label: "Header Phone Click",
    });
  });
});

// Suivi des clics sur l'email
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", () => {
    gtag("event", "email_click", {
      event_category: "contact",
      event_label: "Email Click",
    });
  });
});

// // Suivi de la soumission du formulaire
// document.getElementById("contactForm").addEventListener("submit", (e) => {
//   gtag("event", "form_submit", {
//     event_category: "lead_generation",
//     event_label: "Contact Form",
//   });
// });

// Suivi du temps passé sur la page
let startTime = Date.now();
window.addEventListener("beforeunload", () => {
  let timeSpent = Math.round((Date.now() - startTime) / 1000);
  gtag("event", "time_on_page", {
    event_category: "engagement",
    value: timeSpent,
  });
});

// --------------------------------------
// 11. Hide Elfsight widget text and logo
// --------------------------------------
function hideElfsightBranding() {
  // Fonction pour cacher les éléments Elfsight
  const hideElements = () => {
    // Cacher le lien "Free Whatsapp Chat button"
    const elfsightLinks = document.querySelectorAll(
      'a[href*="elfsight.com/whatsapp-chat-widget"][href*="utm_campaign=free-widget"]'
    );
    elfsightLinks.forEach((link) => {
      link.style.setProperty("display", "none", "important");
      link.style.setProperty("visibility", "hidden", "important");
      link.style.setProperty("opacity", "0", "important");
      link.style.setProperty("height", "0", "important");
      link.style.setProperty("width", "0", "important");
      link.style.setProperty("overflow", "hidden", "important");
    });

    // Cacher tous les liens Elfsight génériques
    const allElfsightLinks = document.querySelectorAll(
      'a[href*="elfsight.com"]'
    );
    allElfsightLinks.forEach((link) => {
      link.style.setProperty("display", "none", "important");
      link.style.setProperty("visibility", "hidden", "important");
    });

    // Cacher le texte par contenu
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach((link) => {
      if (
        link.textContent.includes("Free Whatsapp Chat button") ||
        link.textContent.includes("Elfsight") ||
        link.href.includes("elfsight.com")
      ) {
        link.style.setProperty("display", "none", "important");
        link.style.setProperty("visibility", "hidden", "important");
      }
    });

    // Cacher les éléments par classe ou attributs Elfsight
    const elfsightElements = document.querySelectorAll(
      '[class*="elfsight"], [id*="elfsight"], [data-elfsight]'
    );
    elfsightElements.forEach((element) => {
      // Ne cacher que les éléments de branding, pas le widget entier
      if (
        element.tagName === "A" ||
        element.textContent.includes("Free") ||
        element.textContent.includes("Elfsight")
      ) {
        element.style.setProperty("display", "none", "important");
        element.style.setProperty("visibility", "hidden", "important");
      }
    });
  };

  // Exécuter immédiatement
  hideElements();

  // Observer les changements dans le DOM pour les widgets chargés dynamiquement
  const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
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
    subtree: true,
  });

  // Vérifier périodiquement (au cas où le MutationObserver ne capturerait pas tout)
  setInterval(hideElements, 2000);
}

// Fonction pour injecter du CSS directement dans le head
function injectHidingCSS() {
  const style = document.createElement("style");
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
  const carousel = document.getElementById("testimonialsCarousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("carouselDots");

  if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = carousel.querySelectorAll(".testimonial-slide");
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
    updateCarousel(); // Update carousel position after changing slidesPerView
  };

  // Create dots
  const updateDots = () => {
    dotsContainer.innerHTML = ""; // Clear existing dots
    // Calculate total pages (number of groups of slides)
    const totalDots = Math.ceil(totalSlides / slidesPerView);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      // Determine which dot should be active based on the current index and slides per view
      if (i === Math.floor(currentIndex / slidesPerView)) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", () => {
        // Jump to the start of the corresponding page
        currentIndex = i * slidesPerView;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  };

  // Update carousel position and dot active state
  const updateCarousel = () => {
    // Calculate the maximum valid index
    // The last possible index is when the first slide of the last visible group is shown.
    // If totalSlides = 6 and slidesPerView = 3, maxIndex = 6 - 3 = 3. (Slides 3, 4, 5 are visible)
    // If totalSlides = 6 and slidesPerView = 2, maxIndex = 6 - 2 = 4. (Slides 4, 5 are visible)
    // If totalSlides = 6 and slidesPerView = 1, maxIndex = 6 - 1 = 5. (Slide 5 is visible)
    // If totalSlides <= slidesPerView, maxIndex should be 0.
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    // Clamp the currentIndex to be within valid bounds [0, maxIndex]
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    // Calculate the translation offset
    const offset = -currentIndex * (100 / slidesPerView);
    carousel.style.transform = `translateX(${offset}%)`;

    // Update active dot based on the current page
    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === Math.floor(currentIndex / slidesPerView)
      );
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    // If total slides are less than or equal to slides per view, disable both buttons
    if (totalSlides <= slidesPerView) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    }
  };

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    // Move back by the number of slides per view
    currentIndex -= slidesPerView;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    // Move forward by the number of slides per view
    currentIndex += slidesPerView;
    updateCarousel();
  });

  // Initial setup and update on resize
  updateSlidesPerView(); // Set initial slidesPerView and update carousel/dots
  window.addEventListener("resize", updateSlidesPerView);

  // Ensure initial state is correct (redundant after updateSlidesPerView but safe)
  // updateCarousel();
}

// Fonction de débogage - à supprimer après résolution
function debugScrollArrows() {
  console.log("=== DEBUG SCROLL ARROWS ===");
  const arrows = document.querySelectorAll(".scroll-arrow");
  console.log(`Nombre de flèches trouvées: ${arrows.length}`);
  
  arrows.forEach((arrow, index) => {
    console.log(`Flèche ${index + 1}:`, {
      element: arrow,
      target: arrow.dataset.target,
      targetExists: !!document.querySelector(arrow.dataset.target)
    });
  });
}