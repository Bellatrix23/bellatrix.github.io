document.addEventListener("DOMContentLoaded", () => {
  // Toggle mobile menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // ---------------------------------------------------------
  // OPTION B: Only attach smooth scrolling if we're on index.html
  // ---------------------------------------------------------
  // This checks the URL path. If it ends with "index.html" or is just "/"
  // (the root on many servers), we'll run the smooth scrolling code.
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: "smooth",
          });
          // Close mobile menu after selection
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
          }
        }
      });
    });
  }

  // Back to Top Button & Collapse mobile menu on scroll (across all pages)
  const backToTopButton = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    // Collapse mobile menu if it's active
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Handle Contact Form Submission via AJAX
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (response.ok) {
          // Redirect to index.html on successful submission
          window.location.href = "index.html";
        } else {
          alert("Error sending message. Please try again.");
        }
      } catch (err) {
        alert("Error sending message. Please try again.");
      }
    });
  }
});
