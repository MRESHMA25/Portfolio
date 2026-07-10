const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");
const backTop = document.getElementById("backTop");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.textContent = navLinks.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const content = item.querySelector(".accordion-content");

    item.classList.toggle("open");

    if (item.classList.contains("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});

const animatedItems = document.querySelectorAll(
  ".highlight-card, .project-card, .skill-box, .accordion-item, .about, .contact"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

animatedItems.forEach((item) => {
  item.classList.add("hidden");
  observer.observe(item);
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  progressBar.style.width = `${progress}%`;

  if (scrollTop > 500) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }

  updateActiveNav();
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");

    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
}