// Pratham Kapadia — portfolio interactions
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mainNav.classList.toggle("open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Reveal content as it enters the viewport. Keep content visible if unsupported.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Subtle pointer glow on devices that support a precise pointer.
const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// Automatically keep the footer year current.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Switch between four colour palettes and remember the visitor's choice.
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const savedTheme = localStorage.getItem("pratham-portfolio-theme") || "neon";
document.body.dataset.theme = savedTheme;
themeButtons.forEach((button) => {
  button.classList.toggle("active", button.dataset.themeChoice === savedTheme);
  button.addEventListener("click", () => {
    const selected = button.dataset.themeChoice;
    document.body.dataset.theme = selected === "neon" ? "" : selected;
    localStorage.setItem("pratham-portfolio-theme", selected);
    themeButtons.forEach((item) => item.classList.toggle("active", item === button));
  });
});
