
document.addEventListener("DOMContentLoaded", () => {

  // AÑO AUTOMÁTICO
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // MENÚ MÓVIL
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
      });
    });
  }

  // BARRA DE PROGRESO
  const progress = document.getElementById("progress");

  function updateProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const percentage = max > 0 ? scrollY / max * 100 : 0;
    progress.style.width = percentage + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // VOLVER ARRIBA
  const topButton = document.getElementById("topButton");

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // NOTIFICACIONES
  function toast(message) {
    const element = document.getElementById("toast");
    if (!element) return;

    element.textContent = message;
    element.classList.add("show");

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      element.classList.remove("show");
    }, 2800);
  }

  // COPIAR IP
  const copyButton = document.getElementById("copyIP");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("mc.circoac.com");
        toast("IP copiada correctamente");
      } catch {
        toast("IP: mc.circoac.com");
      }
    });
  }

  // BUSCADOR DE SECCIONES
  const search = document.getElementById("siteSearch");
  const results = document.getElementById("searchResults");

  if (search && results) {
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      let matches = 0;

      document.querySelectorAll("main section").forEach(section => {
        const match = !query || section.innerText.toLowerCase().includes(query);
        section.style.display = match ? "" : "none";
        if (match) matches++;
      });

      results.textContent = query
        ? matches + " secciones encontradas"
        : "Todas las secciones están disponibles.";
    });
  }

  // PARTÍCULAS
  const particles = document.getElementById("particles");

  if (particles && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 12 + "s";
      particle.style.animationDuration = (8 + Math.random() * 12) + "s";
      particles.appendChild(particle);
    }
  }

  // ENTRADAS ANIMADAS
  const elements = document.querySelectorAll(
    ".card, .section-heading, .profile, .timeline-item, .social-link, .gallery a"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ready");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => element.classList.add("ready"));
  }

  // CERRAR CON ESCAPE
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav) {
      nav.classList.remove("open");
      if (menuBtn) menuBtn.textContent = "☰";
    }
  });

  // SERVICE WORKER
  if ("serviceWorker" in navigator &&
      location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js")
      .catch(error => console.error("Service Worker:", error));
  }

});
