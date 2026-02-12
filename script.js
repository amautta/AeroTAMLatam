/* =========================================================
   AeroTAMLatam Demo
   - Eventos para laboratorio
   - Apertura de messenger
   - Menú móvil
   ========================================================= */

(function () {
  // Utilidad: disparar evento Journey si existe ac()
  function recordJourneyEvent(eventName, payload) {
    // IMPORTANTE:
    // Para que esto funcione, debes pegar/configurar el snippet de Journey (ac.js) en index.html
    // y reemplazar REEMPLAZAR_JOURNEY_WEBSITE_ID / REEMPLAZAR_REGION.
    try {
      if (typeof window.ac === "function") {
        window.ac("record", eventName, payload || {});
      }
    } catch (e) {
      // Silencioso a propósito (sitio debe funcionar sin Journey)
    }
  }

  // Utilidad: abrir Messenger (si el deployment lo permite)
  function openMessenger() {
    try {
      if (window.Genesys) {
        window.Genesys("command", "Messenger.open");
      }
    } catch (e) {}
  }

  // Año en footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());


  // CTA Hero (evento requerido: click_cta_hero)
  const ctaHero = document.getElementById("btn-cta-hero");
  const ctaHeroNav = document.getElementById("btn-cta-hero-nav");
  const ctaHeroNavMobile = document.getElementById("btn-cta-hero-nav-mobile");

  function onHeroCtaClick(origin) {
    recordJourneyEvent("click_cta_hero", {
      brand: "AeroTAMLatam",
      origin: origin,
      page: "index",
      intent_hint: "buscar_vuelos"
    });

    // Experiencia demo: scroll al formulario
    const checkin = document.getElementById("checkin");
    if (checkin) checkin.scrollIntoView({ behavior: "smooth" });
  }

  [ctaHero, ctaHeroNav, ctaHeroNavMobile].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", () => onHeroCtaClick(btn.id));
  });

  // Cards de promos (evento requerido: click_paquete)
  document.querySelectorAll(".btn-paquete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const paquete = String(btn.getAttribute("data-paquete") || "N/A");
      recordJourneyEvent("click_paquete", {
        brand: "AeroTAMLatam",
        paquete: paquete,
        page: "index"
      });

      // Demo: abrir chat para que el usuario continúe con el bot
      openMessenger();
    });
  });

  // Botones “Abrir chat”
  const openBtn1 = document.getElementById("btn-open-messenger");
  const openBtn2 = document.getElementById("btn-open-messenger-2");
  [openBtn1, openBtn2].forEach((b) => b && b.addEventListener("click", openMessenger));

  // Botón “Preguntar por políticas”
  const btnAskPolicy = document.getElementById("btn-ask-policy");
  if (btnAskPolicy) {
    btnAskPolicy.addEventListener("click", function () {
      recordJourneyEvent("click_paquete", {
        brand: "AeroTAMLatam",
        paquete: "POLITICAS",
        page: "index"
      });
      openMessenger();
    });
  }

  // Form submit (evento requerido: form_submit)
  const form = document.getElementById("form-checkin");
  const toast = document.getElementById("toast");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = new FormData(form);
      const payload = {
        brand: "AeroTAMLatam",
        nombre: String(data.get("nombre") || ""),
        apellido: String(data.get("apellido") || ""),
        correo: String(data.get("correo") || ""),
        reserva: String(data.get("reserva") || ""),
        ruta: String(data.get("ruta") || ""),
        motivo: String(data.get("motivo") || ""),
        page: "index"
      };

      recordJourneyEvent("form_submit", payload);

      // UX demo
      if (toast) {
        toast.hidden = false;
        toast.textContent = `Listo ✅ Solicitud demo recibida (${payload.reserva}). Si quieres, abre el chat para continuar con el bot.`;
        setTimeout(() => (toast.hidden = true), 5200);
      }

      // Limpieza parcial (mantengo correo para reintentos)
      form.reset();
      const correo = document.getElementById("correo");
      if (correo && payload.correo) correo.value = payload.correo;
    });
  }
})();

