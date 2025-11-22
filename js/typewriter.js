// ===== TYPEWRITER UTILITY =====
function typeText(element, text, speed = 70, callback = null) {
  let index = 0;
  element.textContent = "";

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// ===== ON LOAD: FADE IN HEADER =====
window.onload = () => {
  const h1 = document.getElementById("profile");
  const subtitle = document.getElementById("titleText");

  if (h1) {
    setTimeout(() => h1.classList.add("fade-in"), 100);
  }
  if (subtitle) {
    setTimeout(() => subtitle.classList.add("fade-in"), 400);
  }
};

// ===== SCROLL: BACKGROUND GRADIENT =====
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const fraction = Math.min(scrollTop / docHeight, 1);

  const startColor = { r: 30,  g: 37,  b: 71  }; // #1e2547
  const endColor   = { r: 172, g: 250, b: 112 }; // #acfa70

  const r = Math.round(startColor.r + (endColor.r - startColor.r) * fraction);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * fraction);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * fraction);

  document.body.style.background =
    `linear-gradient(180deg, rgb(${r}, ${g}, ${b}), #fff)`;

  // ===== ACTIVE NAV LINK HIGHLIGHT =====
  highlightActiveSection();
});

// ===== ACTIVE NAV SECTION TRACKER =====
function highlightActiveSection() {
  const sections = ["profile", "skills", "experience", "education"];
  const navLinks = document.querySelectorAll(".nav-center a");
  const offset = 120;

  let current = "";

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= offset) {
      current = id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.style.color = "";
    link.style.background = "";

    if (href === `#${current}`) {
      link.style.color = "#fff";
      link.style.background = "rgba(255,255,255,0.12)";
    }
  });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== SCROLL REVEAL FOR PROJECT CARDS =====
const revealOnScroll = () => {
  const cards = document.querySelectorAll(".project, .edu-block");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
};

// Set initial hidden state for cards
window.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project, .edu-block");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(18px)";
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  });

  // Trigger once on load for cards already in view
  setTimeout(revealOnScroll, 200);
});

window.addEventListener("scroll", revealOnScroll, { passive: true });