/* =========================================================
   ELEMENTS
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");
const backTop = document.getElementById("backTop");
const resumeBtn = document.getElementById("resumeBtn");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuBtn.textContent = isOpen ? "×" : "☰";

    menuBtn.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuBtn.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

  });


  document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

      });

    });


  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      navLinks.classList.contains("open")
    ) {

      navLinks.classList.remove("open");

      menuBtn.textContent = "☰";

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 860) {

      navLinks.classList.remove("open");

      menuBtn.textContent = "☰";

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );
    }

  });
}


/* =========================================================
   ACCORDIONS
========================================================= */

/*
   SQL & Data and Beyond the Classroom both use the
   same accordion system.

   Each accordion works independently.

   This means:
   - SQL accordion can have one open item.
   - Beyond accordion can have one open item.
   - Opening an item closes the previous item
     inside that same accordion.
*/

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {

  const items =
    accordion.querySelectorAll(".accordion-item");


  /* -------------------------------------------------------
     INITIAL STATE
  -------------------------------------------------------- */

  items.forEach((item) => {

    const header =
      item.querySelector(".accordion-header");

    const content =
      item.querySelector(".accordion-content");

    const arrow =
      item.querySelector(".accordion-arrow");


    if (!header || !content) {
      return;
    }


    if (item.classList.contains("open")) {

      content.style.maxHeight =
        content.scrollHeight + "px";

      content.style.opacity = "1";

      header.setAttribute(
        "aria-expanded",
        "true"
      );


      if (arrow) {
        arrow.textContent = "∧";
      }

    } else {

      content.style.maxHeight = "0px";

      content.style.opacity = "0";

      header.setAttribute(
        "aria-expanded",
        "false"
      );


      if (arrow) {
        arrow.textContent = "∨";
      }

    }

  });


  /* -------------------------------------------------------
     CLICK BEHAVIOR
  -------------------------------------------------------- */

  items.forEach((item) => {

    const header =
      item.querySelector(".accordion-header");

    const content =
      item.querySelector(".accordion-content");

    const arrow =
      item.querySelector(".accordion-arrow");


    if (!header || !content) {
      return;
    }


    header.addEventListener("click", () => {

      const wasOpen =
        item.classList.contains("open");


      items.forEach((otherItem) => {

        const otherHeader =
          otherItem.querySelector(".accordion-header");

        const otherContent =
          otherItem.querySelector(".accordion-content");

        const otherArrow =
          otherItem.querySelector(".accordion-arrow");


        otherItem.classList.remove("open");


        if (otherContent) {

          otherContent.style.maxHeight = "0px";

          otherContent.style.opacity = "0";

        }


        if (otherHeader) {

          otherHeader.setAttribute(
            "aria-expanded",
            "false"
          );

        }


        if (otherArrow) {

          otherArrow.textContent = "∨";

        }

      });


      if (!wasOpen) {

        item.classList.add("open");


        content.style.maxHeight =
          content.scrollHeight + "px";

        content.style.opacity = "1";


        header.setAttribute(
          "aria-expanded",
          "true"
        );
        if (arrow) {

          arrow.textContent = "∧";

        }

      }

    });

  });

});

/* =========================================================
   RECALCULATE OPEN ACCORDIONS ON RESIZE
========================================================= */

window.addEventListener("resize", () => {

  document
    .querySelectorAll(".accordion-item.open")
    .forEach((item) => {

      const content =
        item.querySelector(".accordion-content");


      if (content) {

        content.style.maxHeight =
          content.scrollHeight + "px";

      }

    });

});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const animatedItems = document.querySelectorAll(

  ".highlight-card, " +
  ".about-layout, " +
  ".focus-card, " +
  ".accordion-item, " +
  ".skill-box, " +
  ".education-card, " +
  ".education-area, " +
  ".github-card, " +
  ".contact-email, " +
  ".contact-links"

);


animatedItems.forEach((item) => {

  item.classList.add("hidden");

});


const revealObserver = new IntersectionObserver(

  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        entry.target.classList.remove("hidden");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.07,
    rootMargin: "0px 0px -30px 0px"
  }

);


animatedItems.forEach((item) => {

  revealObserver.observe(item);

});


/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */

function updateProgressBar() {

  if (!progressBar) {
    return;
  }


  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop;


  const scrollableHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;


  if (scrollableHeight <= 0) {

    progressBar.style.width = "0%";

    return;

  }

  const scrollPercentage =
    (scrollTop / scrollableHeight) * 100;


  progressBar.style.width =
    `${Math.min(scrollPercentage, 100)}%`;

}


/* =========================================================
   BACK TO TOP
========================================================= */

function updateBackToTop() {

  if (!backTop) {
    return;
  }


  if (window.scrollY > 500) {

    backTop.classList.add("show");

  } else {

    backTop.classList.remove("show");

  }
}


if (backTop) {

  backTop.addEventListener("click", () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNav() {

  const sections =
    document.querySelectorAll("main section[id]");


  const navItems =
    document.querySelectorAll(".nav-links a");


  let currentSection = "";
  
  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 160;


    const sectionBottom =
      sectionTop + section.offsetHeight;


    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionBottom
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });

  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 100;


  if (nearBottom) {

    currentSection = "contact";

  }
  navItems.forEach((item) => {

    item.classList.remove("active");


    if (
      item.getAttribute("href") ===
      `#${currentSection}`
    ) {

      item.classList.add("active");

    }

  });

}


/* =========================================================
   SCROLL HANDLER
========================================================= */

let scrollTicking = false;


function handleScroll() {

  if (!scrollTicking) {

    window.requestAnimationFrame(() => {

      updateProgressBar();
      updateBackToTop();
      updateActiveNav();

      scrollTicking = false;

    });


    scrollTicking = true;

  }

}


window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener("click", (event) => {

      const targetId =
        anchor.getAttribute("href");


      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(targetId);


      if (!target) {
        return;
      }


      event.preventDefault();


      const header =
        document.querySelector(".header");


      const headerHeight =
        header
          ? header.offsetHeight
          : 0;


      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;


      window.scrollTo({

        top: targetPosition,

        behavior: "smooth"

      });

    });

  });


/* =========================================================
   RESUME BUTTON
========================================================= */

if (resumeBtn) {

  resumeBtn.addEventListener("click", () => {

    const originalText =
      resumeBtn.textContent;


    resumeBtn.textContent =
      "Downloading ✓";


    setTimeout(() => {

      resumeBtn.textContent =
        originalText;

    }, 1800);

  });

}


/* =========================================================
   SUBTLE CARD MOVEMENT
========================================================= */

const interactiveCards =
  document.querySelectorAll(
    ".highlight-card, .focus-card, .skill-box"
  );


interactiveCards.forEach((card) => {

  card.addEventListener("mousemove", (event) => {

    if (window.innerWidth <= 860) {
      return;
    }


    const rectangle =
      card.getBoundingClientRect();


    const mouseX =
      event.clientX - rectangle.left;


    const mouseY =
      event.clientY - rectangle.top;


    const centerX =
      rectangle.width / 2;


    const centerY =
      rectangle.height / 2;


    const rotateX =
      ((mouseY - centerY) / centerY) * -1;


    const rotateY =
      ((mouseX - centerX) / centerX) * 1;


    card.style.transform =
      `translateY(-5px)
       perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

updateProgressBar();
updateBackToTop();
updateActiveNav();

window.addEventListener("load", () => {

  document
    .querySelectorAll(".accordion-item.open")
    .forEach((item) => {

      const content =
        item.querySelector(".accordion-content");


      if (content) {

        content.style.maxHeight =
          content.scrollHeight + "px";

      }

    });

});
