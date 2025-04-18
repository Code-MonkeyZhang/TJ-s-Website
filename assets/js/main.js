// Johnson & Sons Bookkeeping Website JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector("nav ul");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Toggle menu icon
      const menuIcon = mobileMenuToggle.querySelector("i");
      if (menuIcon.classList.contains("fa-bars")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
      } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", () => {
        // Close all other FAQs
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });

        // Toggle current FAQ
        item.classList.toggle("active");

        // Change icon
        const icon = question.querySelector("i");
        if (item.classList.contains("active")) {
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus");
        } else {
          icon.classList.remove("fa-minus");
          icon.classList.add("fa-plus");
        }
      });
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      let valid = true;
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      // Reset previous error messages
      const errorMessages = document.querySelectorAll(".error-message");
      errorMessages.forEach((msg) => msg.remove());

      // Validate name
      if (name.value.trim() === "") {
        showError(name, "Please enter your name");
        valid = false;
      }

      // Validate email
      if (email.value.trim() === "") {
        showError(email, "Please enter your email");
        valid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, "Please enter a valid email address");
        valid = false;
      }

      // Validate message
      if (message.value.trim() === "") {
        showError(message, "Please enter your message");
        valid = false;
      }

      // If form is valid, submit to FormSubmit service
      if (valid) {
        // Allow the form to submit normally to FormSubmit
        contactForm.submit();
      }
    });
  }

  // Testimonial Slider (automatic cycling)
  const testimonials = document.querySelectorAll(".testimonial");
  let currentTestimonial = 0;

  if (testimonials.length > 1) {
    // Hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
      testimonials[i].style.display = "none";
    }

    // Set interval to cycle through testimonials
    setInterval(() => {
      testimonials[currentTestimonial].style.display = "none";
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonials[currentTestimonial].style.display = "block";
    }, 5000); // Change testimonial every 5 seconds
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId !== "#") {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Offset for header
            behavior: "smooth",
          });
        }
      }
    });
  });

  // About Us Image Slider
  const slides = document.querySelectorAll(".about-image-slider .slide");
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 1) {
    // Hide all slides except the first one
    for (let i = 1; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }

    // Function to show a specific slide
    function showSlide(index) {
      // Hide current slide
      slides[currentSlide].classList.remove("active");

      // Update current slide index
      currentSlide = index;

      // Handle index out of bounds
      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      } else if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      // Show new current slide
      slides[currentSlide].classList.add("active");
    }

    // Initialize automatic sliding
    function startSlideTimer() {
      // Clear any existing interval
      if (slideInterval) {
        clearInterval(slideInterval);
      }

      // Set new interval
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 4000); // Change slide every 4 seconds
    }

    // Start the automatic sliding
    startSlideTimer();

    // Manual navigation with buttons
    const prevButton = document.querySelector(".slider-prev");
    const nextButton = document.querySelector(".slider-next");

    if (prevButton && nextButton) {
      // Previous slide
      prevButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        // Reset the timer to avoid immediate auto-slide after manual navigation
        startSlideTimer();
      });

      // Next slide
      nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        // Reset the timer to avoid immediate auto-slide after manual navigation
        startSlideTimer();
      });
    }
  }
});

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to show error messages
function showError(inputElement, message) {
  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
  errorMessage.style.fontSize = "0.8rem";
  errorMessage.style.marginTop = "5px";

  inputElement.parentNode.appendChild(errorMessage);
  inputElement.style.borderColor = "red";
}

// Add additional CSS for mobile menu
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.textContent = `
        @media (max-width: 768px) {
            nav ul {
                position: absolute;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                z-index: 100;
                transform: translateY(-150%);
                transition: transform 0.3s ease;
            }
            
            nav ul.active {
                transform: translateY(0);
                display: flex;
            }
            
            nav ul li {
                margin: 15px 0;
            }
        }
    `;
  document.head.appendChild(style);
});
