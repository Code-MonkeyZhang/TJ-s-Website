// Johnson & Sons Bookkeeping - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".navbar") &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu after clicking a link
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
        }
      }
    });
  });

  // Testimonials Slider
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll(".testimonial");
  const totalTestimonials = testimonials.length;

  if (totalTestimonials > 1) {
    // Initial setup
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = "none";
      }
    });

    // Auto-rotate testimonials
    setInterval(() => {
      testimonials[currentTestimonial].style.display = "none";
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      testimonials[currentTestimonial].style.display = "block";
    }, 5000);
  }

  // Form Validation
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form inputs
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      // Basic validation
      let isValid = true;

      if (!nameInput.value.trim()) {
        highlightError(nameInput, "Please enter your name");
        isValid = false;
      } else {
        removeError(nameInput);
      }

      if (!emailInput.value.trim()) {
        highlightError(emailInput, "Please enter your email");
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        highlightError(emailInput, "Please enter a valid email address");
        isValid = false;
      } else {
        removeError(emailInput);
      }

      if (!messageInput.value.trim()) {
        highlightError(messageInput, "Please enter your message");
        isValid = false;
      } else {
        removeError(messageInput);
      }

      // If valid, submit the form (you would typically send to a server here)
      if (isValid) {
        // For demonstration purposes, just show a success message
        const formMessage = document.createElement("div");
        formMessage.className = "form-message success";
        formMessage.textContent =
          "Thank you for your message! We will get back to you soon.";

        // Insert the message after the form
        contactForm.parentNode.insertBefore(
          formMessage,
          contactForm.nextSibling
        );

        // Reset the form
        contactForm.reset();

        // Remove the message after 5 seconds
        setTimeout(() => {
          formMessage.remove();
        }, 5000);
      }
    });
  }

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById("scroll-top");

  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Helper Functions
  function highlightError(input, message) {
    input.classList.add("error");

    // Remove any existing error message
    const existingError = input.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    input.parentNode.appendChild(errorMessage);
  }

  function removeError(input) {
    input.classList.remove("error");

    // Remove error message if it exists
    const errorMessage = input.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
