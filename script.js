// Initialisation des animations AOS
document.addEventListener("DOMContentLoaded", function () {
  // Exclure le footer des animations AOS
  const footerElements = document.querySelectorAll("footer *");
  footerElements.forEach((el) => {
    if (el.hasAttribute("data-aos")) {
      el.removeAttribute("data-aos");
    }
  });

  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    disable: "footer", // Désactiver AOS pour le footer
  });

  // Animation de la navbar au défilement
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Animation des compteurs
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = parseInt(counter.innerText);
      const count = parseInt(counter.innerText);

      if (count < target) {
        counter.innerText = count + 1;
        setTimeout(updateCount, speed);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });

  // Animation des cartes au survol
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    });
  });

  // Validation du formulaire de contact
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulation d'envoi de formulaire
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Envoi en cours...';

      setTimeout(() => {
        submitBtn.innerHTML =
          '<i class="bi bi-check-circle"></i> Message envoyé!';
        submitBtn.classList.remove("btn-primary");
        submitBtn.classList.add("btn-success");

        // Réinitialisation du formulaire
        this.reset();

        // Retour à l'état initial après 3 secondes
        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-success");
          submitBtn.classList.add("btn-primary");
        }, 3000);
      }, 1500);
    });
  }

  // Animation des liens d'ancrage pour un défilement fluide
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Marquer le lien actif dans la navigation
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Gestion des flèches de défilement
  const scrollArrows = document.querySelectorAll(".scroll-arrow");
  scrollArrows.forEach((arrow) => {
    arrow.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});
