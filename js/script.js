document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  window.addEventListener("load", function () {
    document.querySelector(".preloader").style.display = "none";
  });

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Scroll spy to highlight nav items
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Initialize scroll spy
  window.addEventListener("scroll", updateActiveNavLink);

  // Smooth scrolling for navigation links
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

        // Close mobile menu after clicking
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Theme toggle functionality
  const themeSwitch = document.getElementById("theme-switch");
  if (themeSwitch) {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    // Apply the saved theme
    if (savedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      themeSwitch.checked = true;
    }

    // Theme switch event
    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Initialize jQuery plugins when DOM is ready
  $(document).ready(function () {
    // Portfolio filter
    $(".portfolio-filter li").on("click", function () {
      $(".portfolio-filter li").removeClass("active");
      $(this).addClass("active");

      var selector = $(this).attr("data-filter");
      $(".portfolio-items").isotope({
        filter: selector,
      });
      return false;
    });

    // Initialize isotope
    $(window).on("load", function () {
      var $portfolioItems = $(".portfolio-items");
      $portfolioItems.isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });
    });

    // Testimonials slider
    if ($(".testimonials-slider").length) {
      $(".testimonials-slider").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        centerMode: true,
        centerPadding: "0",
        focusOnSelect: true,
      });
    }

    // Portfolio lightbox
    $('[data-fancybox="gallery"]').fancybox({
      buttons: [
        "zoom",
        "share",
        "slideShow",
        "fullScreen",
        "download",
        "thumbs",
        "close",
      ],
      animationEffect: "zoom-in-out",
      transitionEffect: "circular",
      loop: true,
    });
  });
});
