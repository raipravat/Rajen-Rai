document.addEventListener("DOMContentLoaded", function () {
  // Loading Screen
  const loadingScreen = document.querySelector(".loading-screen");
  window.addEventListener("load", function () {
    setTimeout(function () {
      loadingScreen.classList.add("fade-out");
    }, 1000);
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");

      // Update active link
      mobileLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Theme Toggle - Single Icon
  const themeToggle = document.querySelector(".theme-toggle");
  const mobileThemeToggle = document.querySelector(".mobile-theme-toggle");
  const body = document.body;

  // Create icon elements
  const themeIcon = document.createElement("i");
  themeIcon.className = "fas fa-moon";
  themeToggle.appendChild(themeIcon);

  const mobileThemeIcon = document.createElement("i");
  mobileThemeIcon.className = "fas fa-moon";
  mobileThemeToggle.appendChild(mobileThemeIcon);

  // Check for saved theme preference or use preferred color scheme
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  setTheme(savedTheme);

  themeToggle.addEventListener("click", toggleTheme);
  mobileThemeToggle.addEventListener("click", toggleTheme);

  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function setTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      themeIcon.className = "fas fa-sun";
      mobileThemeIcon.className = "fas fa-sun";
    } else {
      body.removeAttribute("data-theme");
      themeIcon.className = "fas fa-moon";
      mobileThemeIcon.className = "fas fa-moon";
    }
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scroll up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Change navbar background on scroll
    if (scrollTop > 50) {
      navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  // Section highlighting on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    mobileNavLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Portfolio Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Blog Category Filtering
  const categoryButtons = document.querySelectorAll(".category-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const categoryValue = button.getAttribute("data-category");

      blogCards.forEach((card) => {
        if (
          categoryValue === "all" ||
          card.getAttribute("data-category") === categoryValue
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonialCards.forEach((card) => card.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonialCards[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index);
    });
  });

  prevBtn.addEventListener("click", () => {
    currentTestimonial =
      (currentTestimonial - 1 + testimonialCards.length) %
      testimonialCards.length;
    showTestimonial(currentTestimonial);
  });

  nextBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  });

  // Initialize testimonial slider
  showTestimonial(0);

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats");

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const suffix = stat.textContent.match(/[+%]?$/)[0];
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        stat.textContent = Math.floor(current) + suffix;
      }, 16);
    });
  }

  // Intersection Observer for stats animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);

  // Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector("button[type='submit']");
      const submitText = submitBtn.querySelector(".submit-text");
      const loadingIcon = submitBtn.querySelector(".loading-icon");
      const formMessage = this.querySelector(".form-message");

      // Show loading state
      submitText.style.display = "none";
      loadingIcon.style.display = "block";

      // Validate form
      let isValid = true;
      const nameInput = this.querySelector("#name");
      const emailInput = this.querySelector("#email");
      const subjectInput = this.querySelector("#subject");
      const messageInput = this.querySelector("#message");

      // Reset error messages
      this.querySelectorAll(".error-message").forEach((el) => {
        el.style.display = "none";
        el.textContent = "";
      });

      // Validate name
      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
        isValid = false;
      }

      // Validate email
      if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required");
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email");
        isValid = false;
      }

      // Validate subject
      if (subjectInput.value.trim() === "") {
        showError(subjectInput, "Subject is required");
        isValid = false;
      }

      // Validate message
      if (messageInput.value.trim() === "") {
        showError(messageInput, "Message is required");
        isValid = false;
      }

      if (!isValid) {
        submitText.style.display = "block";
        loadingIcon.style.display = "none";
        return;
      }

      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        submitText.style.display = "block";
        loadingIcon.style.display = "none";

        // Show success message
        formMessage.textContent =
          "Thank you for your message! I will get back to you soon.";
        formMessage.classList.add("success");
        formMessage.style.display = "block";

        // Reset form
        this.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      }, 1500);
    });
  }

  function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
