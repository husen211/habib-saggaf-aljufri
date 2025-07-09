// ===== ENHANCED NAVBAR JAVASCRIPT =====
// File: navbar-enhanced.js

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("header");
  const mobileMenuBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const progressBar = document.querySelector(".scroll-progress-bar");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  // Scroll handling - REMOVED auto-hide functionality
  function handleScroll() {
    const currentScroll = window.pageYOffset;
    const winHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (currentScroll / winHeight) * 100;

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }

    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // REMOVED hide/show navbar on scroll - navbar always visible
  }

  // Throttle scroll event
  let scrollTimer;
  window.addEventListener("scroll", function () {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(handleScroll, 10);
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    // Prevent page scroll jump on hamburger click
    window.scrollTo(window.pageXOffset, window.pageYOffset);
  });

  // Close mobile menu when clicking overlay
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", function () {
      mobileMenuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("mobile-menu-open");
    });
  });

  // Active link detection
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Update active link on scroll
  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Initial check

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = navbar.offsetHeight;
          const targetPosition = target.offsetTop - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Initial scroll check
  handleScroll();

  // Handle window resize for mobile menu
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Close mobile menu on resize to desktop
      if (
        window.innerWidth >= 1025 &&
        mobileMenu.classList.contains("active")
      ) {
        mobileMenuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.classList.remove("mobile-menu-open");
      }
    }, 250);
  });

  // --- LOGIKA UNTUK CHARTS (Hanya untuk index.html) ---
  let growthChartInstance = null;
  function drawGrowthChart() {
    const growthCtx = document.getElementById("growthChart");
    if (!growthCtx) return;
    if (growthChartInstance) growthChartInstance.destroy();
    growthChartInstance = new Chart(growthCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: [
          "1969",
          "1970",
          "1980",
          "1986",
          "1991",
          "1997",
          "2007",
          "2021",
        ],
        datasets: [
          {
            label: "Jumlah Madrasah/Sekolah",
            data: [420, 450, 556, 732, 1221, 1268, 1561, 1700],
            borderColor: "rgb(217, 119, 6)",
            backgroundColor: "rgba(217, 119, 6, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, ticks: { color: "#57534e" } },
          x: { ticks: { color: "#57534e" } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#064e3b",
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 4,
          },
        },
        animation: { duration: 2000, easing: "easeInOutQuart" },
      },
    });
  }

  let distributionChartInstance = null;
  function drawDistributionChart() {
    const distributionCtx = document.getElementById("distributionChart");
    if (!distributionCtx) return;
    if (distributionChartInstance) distributionChartInstance.destroy();
    distributionChartInstance = new Chart(distributionCtx.getContext("2d"), {
      type: "bar",
      data: {
        labels: [
          "Sulteng",
          "Sulut",
          "Maluku & MU",
          "Gorontalo",
          "Kaltim",
          "Sulbar",
          "Papua & PB",
          "Sulsel",
        ],
        datasets: [
          {
            label: "Jumlah Madrasah/Sekolah",
            data: [1550, 195, 166, 61, 55, 18, 13, 27],
            backgroundColor: [
              "rgba(6, 78, 59, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(245, 158, 11, 0.7)",
              "rgba(202, 138, 4, 0.7)",
              "rgba(120, 113, , 0.7)",
              "rgba(6, 78, 59, 0.5)",
              "rgba(16, 185, 129, 0.5)",
              "rgba(245, 158, 11, 0.5)",
            ],

            borderWidth: 4,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { beginAtZero: true, ticks: { color: "#57534e" } },
          y: { ticks: { color: "#57534e" } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#064e3b",
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 4,
          },
        },
        animation: { duration: 2000, easing: "easeInOutQuart" },
      },
    });
  }

  const chartObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "growthChart") drawGrowthChart();
          else if (entry.target.id === "distributionChart")
            drawDistributionChart();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const growthChartCanvas = document.getElementById("growthChart");
  const distributionChartCanvas = document.getElementById("distributionChart");
  if (growthChartCanvas) chartObserver.observe(growthChartCanvas);
  if (distributionChartCanvas) chartObserver.observe(distributionChartCanvas);

  // --- LOGIKA UNTUK SWIPER (Hanya untuk index.html) ---
  const swiperElement = document.querySelector(".mySwiper");
  if (swiperElement) {
    const swiper = new Swiper(swiperElement, {
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  // --- FITUR SHARE UNDANGAN HAUL ---
  const shareBtn = document.getElementById("share-haul-btn");
  if (shareBtn) {
    const shareData = {
      title: "Undangan Haul Habib Saggaf",
      text: "Undangan Haul Tahunan Habib Saggaf Aljufri",
      url:
        window.location.origin + window.location.pathname + "#haul-invitation",
    };
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error("Share failed", err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareData.url);
          alert("Link undangan disalin ke clipboard!");
        } catch (e) {
          prompt("Salin link berikut: ", shareData.url);
        }
      }
    });
  }

  // --- LOGIKA UNTUK COUNTDOWN (Hanya untuk index.html) ---
  const countdownDate = new Date("July 13, 2025 00:00:00").getTime();
  const updateCountdown = setInterval(function () {
    const countdownDiv = document.getElementById("countdown");
    if (!countdownDiv) {
      clearInterval(updateCountdown);
      return;
    }
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    if (daysEl && hoursEl && minutesEl && secondsEl) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      daysEl.innerHTML = String(days).padStart(2, "0");
      hoursEl.innerHTML = String(hours).padStart(2, "0");
      minutesEl.innerHTML = String(minutes).padStart(2, "0");
      secondsEl.innerHTML = String(seconds).padStart(2, "0");
      if (distance < 0) {
        clearInterval(updateCountdown);
        countdownDiv.innerHTML = "Haul Telah Tiba!";
      }
    }
  }, 1000);

  // --- LOGIKA UNTUK ANIMASI COUNT-UP (Hanya untuk index.html) ---
  const countUpObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.dataset.target);
          let current = 0;
          const duration = 1500;
          const stepTime = 10;
          const steps = duration / stepTime;
          const increment = target / steps;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              element.textContent = target.toLocaleString("id-ID");
              clearInterval(timer);
            } else {
              element.textContent = Math.ceil(current).toLocaleString("id-ID");
            }
          }, stepTime);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );
  document
    .querySelectorAll(".count-up")
    .forEach((el) => countUpObserver.observe(el));

  // --- LOGIKA ANIMASI INTRO (Hanya untuk index.html) ---
  const intro = document.getElementById("intro");
  if (intro) {
    setTimeout(() => {
      intro.style.opacity = "0";
      intro.style.pointerEvents = "none";
      setTimeout(() => {
        intro.style.display = "none";
      }, 1000);
    }, 3000);
  }

  // --- LOGIKA ANIMASI SCROLL FADE (UMUM) ---
  const generalScrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          generalScrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll(".scroll-fade")
    .forEach((el) => generalScrollObserver.observe(el));

  const fotoHabibTarget = document.getElementById("foto-habib");
  if (fotoHabibTarget) {
    const fotoHabibObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
            fotoHabibObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    fotoHabibObserver.observe(fotoHabibTarget);
  }

  // --- LOGIKA ANIMASI FADE-IN KARTU TESTIMONI (Hanya untuk kesan_mereka.html) ---
  const testimonialCards = document.querySelectorAll(".testimoni-card");
  if (testimonialCards.length > 0) {
    const testimonialObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            testimonialObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    testimonialCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 100}ms`;
      testimonialObserver.observe(card);
    });
  }

  // --- BATASI PREVIEW GALERI DI INDEX HANYA 3 KARTU ---
  const previewContainer = document.getElementById("galeri-preview");
  if (previewContainer && previewContainer.children.length > 3) {
    for (let i = previewContainer.children.length - 1; i >= 3; i--) {
      previewContainer.removeChild(previewContainer.children[i]);
    }
  }

  // --- LOGIKA CHATBOT AI BARU YANG AMAN  ---
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatBox = document.getElementById("chat-box");

  if (chatForm && chatInput && chatBox) {
    let chatHistory = [];

    const appendMessage = (sender, text) => {
      const messageElement = document.createElement("p");
      messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    appendMessage(
      "AI",
      "Assalamualaikum, ada yang bisa saya bantu terkait pemikiran dan kisah Habib Saggaf?"
    );

    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userText = chatInput.value.trim();
      if (!userText) return;

      appendMessage("Anda", userText);
      chatInput.value = "";
      chatHistory.push({ role: "user", parts: [{ text: userText }] });

      const loadingMsgElement = document.createElement("p");
      loadingMsgElement.innerHTML = "<strong>AI:</strong> <em>Mengetik...</em>";
      chatBox.appendChild(loadingMsgElement);
      chatBox.scrollTop = chatBox.scrollHeight;

      try {
        // URL di bawah  URL Web Service Render

        const apiUrl = "https://habib-saggaf-api.onrender.com/api/chat";

        const payload = { chatHistory: chatHistory };

        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        loadingMsgElement.remove();

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Gagal mendapatkan respons dari server."
          );
        }

        const data = await res.json();

        let aiText = "Maaf, terjadi sedikit kendala. Coba lagi nanti.";
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          aiText = data.candidates[0].content.parts[0].text;
        }

        appendMessage("AI", aiText.replace(/\n/g, "<br>"));
        chatHistory.push({ role: "model", parts: [{ text: aiText }] });
      } catch (err) {
        console.error("Error saat berkomunikasi dengan backend:", err);
        if (loadingMsgElement) {
          loadingMsgElement.remove();
        }
        appendMessage("AI", `Maaf, terjadi masalah koneksi. (${err.message})`);
      }
    });
  }

  // ===== TIMELINE DETAIL FUNCTIONALITY =====

  // Setup timeline detail buttons
  const timelineCards = document.querySelectorAll(".timeline-card");

  timelineCards.forEach((card) => {
    const detailButton = card.querySelector(".detail-button");
    const titleElement = card.querySelector("h4[onclick]");

    // Tambahkan event listener untuk button
    if (detailButton) {
      detailButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const detailContent = card.querySelector(".timeline-detail-content");
        toggleTimelineDetailContent(detailContent, this);
      });
    }

    // Tambahkan event listener untuk title
    if (titleElement) {
      titleElement.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const detailContent = card.querySelector(".timeline-detail-content");
        const button = card.querySelector(".detail-button");
        toggleTimelineDetailContent(detailContent, button);
      });

      // Tambahkan cursor pointer
      titleElement.style.cursor = "pointer";
    }
  });

  // Fungsi helper untuk toggle detail content
  function toggleTimelineDetailContent(detailContent, button) {
    if (!detailContent) return;

    const isExpanded = detailContent.classList.contains("expanded");

    if (isExpanded) {
      // Tutup detail
      detailContent.classList.remove("expanded");
      detailContent.style.maxHeight = "0px";
      if (button) button.textContent = "Lihat Detail";

      // Rotate arrow icon
      const arrowIcon =
        detailContent.parentElement.querySelector(".arrow-icon");
      if (arrowIcon) {
        arrowIcon.style.transform = "rotate(0deg)";
      }
    } else {
      // Buka detail
      detailContent.classList.add("expanded");
      detailContent.style.maxHeight = detailContent.scrollHeight + "px";
      if (button) button.textContent = "Sembunyikan";

      // Rotate arrow icon
      const arrowIcon =
        detailContent.parentElement.querySelector(".arrow-icon");
      if (arrowIcon) {
        arrowIcon.style.transform = "rotate(180deg)";
      }
    }
  }

  // ===== TIMELINE ANIMATION IMPROVEMENTS =====

  // Enhanced timeline observer untuk animasi yang lebih smooth
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 200); // Stagger animation

          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Apply observer ke timeline items
  document.querySelectorAll(".timeline-item").forEach((item) => {
    timelineObserver.observe(item);
  });

  // ===== MOBILE TIMELINE FIXES =====

  function handleTimelineResponsive() {
    const isMobile = window.innerWidth <= 768;
    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach((item, index) => {
      const card = item.querySelector(".timeline-card");

      if (isMobile) {
        // Force semua cards ke kiri di mobile
        if (card) {
          card.classList.remove("timeline-card-right");
          card.classList.add("timeline-card-left");
        }
      } else {
        // Alternatif kiri-kanan di desktop
        if (card) {
          if (index % 2 === 0) {
            card.classList.remove("timeline-card-right");
            card.classList.add("timeline-card-left");
          } else {
            card.classList.remove("timeline-card-left");
            card.classList.add("timeline-card-right");
          }
        }
      }
    });
  }

  // Jalankan saat load dan resize
  handleTimelineResponsive();
  window.addEventListener("resize", handleTimelineResponsive);

  // ===== DEBUGGING TOOLS =====

  // Fungsi untuk debug timeline issues
  window.debugTimeline = function () {
    console.log("=== TIMELINE DEBUG INFO ===");

    const timelineContainer = document.querySelector(".timeline-container");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const milestoneItems = document.querySelectorAll(
      ".milestone-timeline .timeline-item"
    );

    console.log("Timeline Container:", timelineContainer);
    console.log("Timeline Items:", timelineItems.length);
    console.log("Milestone Items:", milestoneItems.length);

    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      console.log(`Item ${index}:`, {
        element: item,
        position: rect,
        hasDataNumber: item.hasAttribute("data-number"),
        classes: item.className,
      });
    });
  };

  // Fungsi untuk reset timeline jika ada masalah
  window.resetTimeline = function () {
    console.log("Resetting timeline...");

    // Reset semua timeline detail states
    const detailContents = document.querySelectorAll(
      ".timeline-detail-content"
    );
    detailContents.forEach((content) => {
      content.classList.remove("expanded");
      content.style.maxHeight = "0px";
    });

    // Reset semua button texts
    const detailButtons = document.querySelectorAll(".detail-button");
    detailButtons.forEach((button) => {
      button.textContent = "Lihat Detail";
    });

    // Reset arrow icons
    const arrowIcons = document.querySelectorAll(".arrow-icon");
    arrowIcons.forEach((icon) => {
      icon.style.transform = "rotate(0deg)";
    });

    console.log("Timeline reset complete");
  };

  // Auto-fix untuk masalah umum
  function autoFixTimelineIssues() {
    // Pastikan semua timeline items punya z-index yang benar
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
      item.style.zIndex = 10 + index;
    });

    // Pastikan tidak ada garis yang mengganggu
    const problemElements = document.querySelectorAll(
      ".timeline-container::before, .timeline-container::after"
    );
    problemElements.forEach((el) => {
      if (el) el.style.display = "none";
    });
  }

  autoFixTimelineIssues();
}); // <--  AKHIR dari event listener DOMContentLoaded

// ===== TIMELINE JAVASCRIPT FIXES =====

// Fungsi toggleTimelineDetail yang hilang
function toggleTimelineDetail(element) {
  const detailContent = element.parentElement.querySelector(
    ".timeline-detail-content"
  );
  const button = element.parentElement.querySelector(".detail-button");
  const arrowIcon = element.querySelector(".arrow-icon");

  if (!detailContent) return;

  const isExpanded = detailContent.classList.contains("expanded");

  if (isExpanded) {
    // Tutup detail
    detailContent.classList.remove("expanded");
    detailContent.style.maxHeight = "0px";
    button.textContent = "Lihat Detail";
    if (arrowIcon) {
      arrowIcon.style.transform = "rotate(0deg)";
    }
  } else {
    // Buka detail
    detailContent.classList.add("expanded");
    detailContent.style.maxHeight = detailContent.scrollHeight + "px";
    button.textContent = "Sembunyikan";
    if (arrowIcon) {
      arrowIcon.style.transform = "rotate(180deg)";
    }
  }
}

// ===== GLOBAL TIMELINE FUNCTIONS =====

// Fungsi global untuk digunakan di HTML onclick
window.toggleTimelineDetail = toggleTimelineDetail;

// Export functions untuk testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    toggleTimelineDetail,
    debugTimeline: window.debugTimeline,
    resetTimeline: window.resetTimeline,
  };
}

// ===== ENHANCED MAP FUNCTIONALITY (FIXED) =====

// Global map variables
let currentMap = null;
let mapMarkers = [];
let isMapActive = false;

// Enhanced alkhairaatLokasi data (pastikan ini ada)
const alkhairaatLokasi = [
  // Sulawesi Tengah
  {
    kota: "Kota Palu",
    provinsi: "Sulawesi Tengah",
    coords: [-0.8983, 119.8707],
  },
  {
    kota: "Kab. Donggala",
    provinsi: "Sulawesi Tengah",
    coords: [-0.6833, 119.7333],
  },
  {
    kota: "Kab. Sigi",
    provinsi: "Sulawesi Tengah",
    coords: [-1.3989, 119.9774],
  },
  {
    kota: "Kab. Parigi Moutong",
    provinsi: "Sulawesi Tengah",
    coords: [-1.1594, 120.2122],
  },
  {
    kota: "Kab. Poso",
    provinsi: "Sulawesi Tengah",
    coords: [-1.3958, 120.7519],
  },
  {
    kota: "Kab. Tojo Una-Una",
    provinsi: "Sulawesi Tengah",
    coords: [-1.025, 121.575],
  },
  {
    kota: "Kab. Tolitoli",
    provinsi: "Sulawesi Tengah",
    coords: [1.0456, 120.8175],
  },
  {
    kota: "Kab. Buol",
    provinsi: "Sulawesi Tengah",
    coords: [1.1333, 121.4333],
  },
  {
    kota: "Kab. Morowali",
    provinsi: "Sulawesi Tengah",
    coords: [-2.1167, 121.5667],
  },
  {
    kota: "Kab. Banggai",
    provinsi: "Sulawesi Tengah",
    coords: [-0.9667, 122.7833],
  },

  // Sulawesi Utara & Gorontalo
  {
    kota: "Kota Manado",
    provinsi: "Sulawesi Utara",
    coords: [1.4748, 124.8421],
  },
  {
    kota: "Kota Bitung",
    provinsi: "Sulawesi Utara",
    coords: [1.4422, 125.1892],
  },
  {
    kota: "Bolaang Mongondow",
    provinsi: "Sulawesi Utara",
    coords: [0.7583, 124.0322],
  },
  { kota: "Kota Gorontalo", provinsi: "Gorontalo", coords: [0.5435, 123.0596] },
  { kota: "Kab. Pohuwato", provinsi: "Gorontalo", coords: [0.55, 121.8333] },

  // Maluku & Maluku Utara
  { kota: "Kota Ambon", provinsi: "Maluku", coords: [-3.6563, 128.1906] },
  {
    kota: "Kota Ternate",
    provinsi: "Maluku Utara",
    coords: [0.7812, 127.3633],
  },
  { kota: "Kota Tidore", provinsi: "Maluku Utara", coords: [0.6583, 127.4475] },
  {
    kota: "Halmahera Utara",
    provinsi: "Maluku Utara",
    coords: [1.75, 127.8833],
  },

  // Lainnya
  {
    kota: "Kota Makassar",
    provinsi: "Sulawesi Selatan",
    coords: [-5.1477, 119.4238],
  },
  {
    kota: "Kota Kendari",
    provinsi: "Sulawesi Tenggara",
    coords: [-3.9926, 122.5149],
  },
  { kota: "Kota Sorong", provinsi: "Papua Barat", coords: [-0.8833, 131.25] },
  { kota: "Kota Jayapura", provinsi: "Papua", coords: [-2.5333, 140.7167] },
  {
    kota: "Kota Balikpapan",
    provinsi: "Kalimantan Timur",
    coords: [-1.2651, 116.8285],
  },
];

// Activate map function (global scope)
function activateMap() {
  const overlay = document.getElementById("map-overlay");
  const loading = document.getElementById("map-loading");

  if (!overlay || !loading) {
    console.error("Map elements not found");
    return;
  }

  overlay.style.opacity = "0";
  loading.classList.remove("hidden");

  setTimeout(() => {
    overlay.style.display = "none";
    initEnhancedMap();
  }, 500);
}

// Enhanced map initialization
function initEnhancedMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) {
    console.error("Map element not found");
    return;
  }

  try {
    if (!currentMap) {
      currentMap = L.map("map", {
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        zoomControl: true,
      }).setView([-2.5, 118], 5);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(currentMap);

      addEnhancedMarkers();
    }

    setTimeout(() => {
      const loadingElement = document.getElementById("map-loading");
      if (loadingElement) {
        loadingElement.classList.add("hidden");
      }
      isMapActive = true;
      animateRegionalStats();
    }, 1500);
  } catch (error) {
    console.error("Error initializing map:", error);
    // Fallback: hide loading and show basic message
    const loadingElement = document.getElementById("map-loading");
    if (loadingElement) {
      loadingElement.innerHTML =
        "<p>Peta tidak dapat dimuat. Silakan refresh halaman.</p>";
    }
  }
}

// Enhanced markers with error handling
function addEnhancedMarkers() {
  if (!currentMap || !Array.isArray(alkhairaatLokasi)) {
    console.error("Map or location data not available");
    return;
  }

  alkhairaatLokasi.forEach((location, index) => {
    try {
      // Determine marker class based on location
      let markerClass = "low-density";
      if (location.kota === "Kota Palu") {
        markerClass = "high-density";
      } else if (
        ["Kota Manado", "Kota Ambon", "Kota Ternate"].includes(location.kota)
      ) {
        markerClass = "medium-density";
      }

      // Simple popup content
      const popupContent = `
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 1.1rem;">${
            location.kota
          }</h4>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 0.875rem;">${
            location.provinsi
          }</p>
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
            <span style="color: #6b7280;">Estimasi:</span>
            <span style="color: #10b981; font-weight: 600;">${getLocationCount(
              location.kota
            )}</span>
          </div>
          <button onclick="showLocationDetails('${location.kota}', '${
        location.provinsi
      }')" 
                  style="width: 100%; margin-top: 12px; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Lihat Detail
          </button>
        </div>
      `;

      const marker = L.marker(location.coords)
        .addTo(currentMap)
        .bindPopup(popupContent);

      // Store marker for filtering
      mapMarkers.push({
        marker: marker,
        location: location,
        region: getRegionCode(location.provinsi),
      });
    } catch (error) {
      console.error(`Error adding marker for ${location.kota}:`, error);
    }
  });
}

// Get estimated count for location (safe function)
function getLocationCount(kota) {
  const counts = {
    "Kota Palu": "1,200+",
    "Kab. Donggala": "150+",
    "Kab. Sigi": "120+",
    "Kota Manado": "80+",
    "Kota Bitung": "45+",
    "Kota Ambon": "60+",
    "Kota Ternate": "40+",
    "Kota Gorontalo": "35+",
    "Kota Makassar": "15+",
    "Kota Kendari": "12+",
  };
  return counts[kota] || "5-20";
}

// Get region code for filtering (safe function)
function getRegionCode(provinsi) {
  const regionMap = {
    "Sulawesi Tengah": "sulteng",
    "Sulawesi Utara": "sulut",
    Maluku: "maluku",
    "Maluku Utara": "maluku",
    Gorontalo: "gorontalo",
    "Kalimantan Timur": "kaltim",
    "Kalimantan Utara": "kaltim",
    Papua: "papua",
    "Papua Barat": "papua",
    "Sulawesi Selatan": "sulsel",
    "Sulawesi Barat": "sulbar",
    "Sulawesi Tenggara": "sulsel",
  };
  return regionMap[provinsi] || "other";
}

// Show location details (global scope)
function showLocationDetails(kota, provinsi) {
  const infoPanel = document.getElementById("map-info-panel");
  const infoTitle = document.getElementById("info-title");
  const infoContent = document.getElementById("info-content");

  if (!infoPanel || !infoTitle || !infoContent) {
    alert(
      `Detail untuk ${kota}, ${provinsi}\nEstimasi: ${getLocationCount(
        kota
      )} institusi`
    );
    return;
  }

  infoTitle.textContent = kota;
  infoContent.innerHTML = `
    <div style="font-size: 0.875rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #f3f4f6;">
        <span style="color: #6b7280;">Provinsi:</span>
        <span style="color: #1f2937; font-weight: 600;">${provinsi}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #f3f4f6;">
        <span style="color: #6b7280;">Estimasi Institusi:</span>
        <span style="color: #1f2937; font-weight: 600;">${getLocationCount(
          kota
        )}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f3f4f6;">
        <span style="color: #6b7280;">Jenis:</span>
        <span style="color: #1f2937; font-weight: 600;">Madrasah, Sekolah</span>
      </div>
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #f3f4f6;">
        <p style="color: #6b7280; line-height: 1.5; margin: 0;">
          ${getLocationDescription(kota)}
        </p>
      </div>
    </div>
  `;

  infoPanel.classList.remove("hidden");
}

// Get location description (safe function)
function getLocationDescription(kota) {
  const descriptions = {
    "Kota Palu":
      "Pusat utama Alkhairaat dan tempat berkedudukan Ketua Utama. Memiliki konsentrasi institusi pendidikan terbesar.",
    "Kab. Donggala":
      "Salah satu kabupaten dengan sejarah panjang Alkhairaat di Sulawesi Tengah.",
    "Kota Manado":
      "Pusat pengembangan Alkhairaat di Sulawesi Utara dengan pertumbuhan pesat.",
    "Kota Ambon":
      "Representasi Alkhairaat di wilayah Maluku dengan fokus pendidikan multikultural.",
    "Kota Ternate": "Gerbang utama Alkhairaat di Maluku Utara.",
    "Kota Gorontalo": "Pusat pendidikan Alkhairaat di Provinsi Gorontalo.",
  };
  return (
    descriptions[kota] ||
    "Bagian dari jaringan institusi pendidikan Alkhairaat yang tersebar di Indonesia Timur."
  );
}

// Close info panel (global scope)
function closeInfoPanel() {
  const infoPanel = document.getElementById("map-info-panel");
  if (infoPanel) {
    infoPanel.classList.add("hidden");
  }
}

// Filter markers by region (safe function)
function filterByRegion(regionCode) {
  if (!isMapActive || !Array.isArray(mapMarkers)) return;

  mapMarkers.forEach(({ marker, region }) => {
    if (regionCode === "all" || region === regionCode) {
      if (currentMap && marker) {
        marker.addTo(currentMap);
      }
    } else {
      if (currentMap && marker) {
        currentMap.removeLayer(marker);
      }
    }
  });
}

// Reset map view (global scope)
function resetMapView() {
  if (!isMapActive || !currentMap) return;

  // Show all markers
  mapMarkers.forEach(({ marker }) => {
    if (marker && currentMap) {
      marker.addTo(currentMap);
    }
  });

  // Reset view
  currentMap.setView([-2.5, 118], 5);

  // Reset filter
  const regionFilter = document.getElementById("region-filter");
  if (regionFilter) {
    regionFilter.value = "all";
  }

  // Close info panel
  closeInfoPanel();
}

// Animate regional stats (safe function)
function animateRegionalStats() {
  const regionalCards = document.querySelectorAll(".regional-card");

  regionalCards.forEach((card, index) => {
    setTimeout(() => {
      const numberElement = card.querySelector(".regional-number");
      const progressBar = card.querySelector(".progress-bar-regional");

      if (numberElement && progressBar) {
        const targetNumber = parseInt(
          numberElement.textContent.replace(/,/g, "")
        );
        animateNumber(numberElement, 0, targetNumber, 2000);

        setTimeout(() => {
          const percentage = Math.min((targetNumber / 1550) * 100, 100);
          progressBar.style.width = `${percentage}%`;
        }, 500);
      }
    }, index * 200);
  });
}

// Animate number counting (safe function)
function animateNumber(element, start, end, duration) {
  const startTime = Date.now();
  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);

    element.textContent = current.toLocaleString("id-ID");

    if (progress === 1) {
      clearInterval(timer);
      element.textContent = end.toLocaleString("id-ID");
    }
  }, 16);
}

// Initialize map controls when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Region filter
  const regionFilter = document.getElementById("region-filter");
  if (regionFilter) {
    regionFilter.addEventListener("change", function () {
      filterByRegion(this.value);
    });
  }

  // Reset button
  const resetButton = document.getElementById("reset-map");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      resetMapView();
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  // ===== LEGASI DASHBOARD ANIMATIONS =====

  // Animated Counter untuk Stats
  // ===== FIXED  // --- STAT COUNTER LOGIC (Robust Version) ---
  const statCounterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetElement = entry.target;
          const targetValue = targetElement.dataset.target;

          // Check if the target is a pure number
          if (/^\d+$/.test(targetValue)) {
            const target = parseInt(targetValue, 10);
            let current = 0;
            const duration = 2000; // 2 seconds
            const stepTime = 20; // update every 20ms
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const animateCounter = () => {
              current += increment;
              if (current >= target) {
                targetElement.textContent = target.toLocaleString("id-ID");
                return;
              }
              targetElement.textContent =
                Math.ceil(current).toLocaleString("id-ID");
              requestAnimationFrame(animateCounter);
            };
            animateCounter();
          } else {
            // If target is not a number (e.g., "24/7"), just display the text
            targetElement.textContent = targetValue;
          }

          observer.unobserve(targetElement);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Apply observer to all elements with .stat-number and a data-target
  document.querySelectorAll(".stat-number[data-target]").forEach((el) => {
    statCounterObserver.observe(el);
  });

  // Progress Bars Animation
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const target = parseInt(card.dataset.target);
          const maxTarget = 1700; // Nilai maksimum untuk scaling
          const percentage = (target / maxTarget) * 100;

          setTimeout(() => {
            const progressBar = card.querySelector(".progress-bar");
            if (progressBar) {
              progressBar.style.width = `${percentage}%`;
            }
          }, 500);

          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  // Timeline Animation
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  // Apply observers
  document
    .querySelectorAll(".stat-number")
    .forEach((el) => statCounterObserver.observe(el));
  document
    .querySelectorAll(".stat-card")
    .forEach((el) => progressObserver.observe(el));
  document
    .querySelectorAll(".timeline-item")
    .forEach((el) => timelineObserver.observe(el));
});




// ===== PENGGANTI: KODE UNIVERSAL YOUTUBE PLAYER (ANTI-KONFLIK) =====

let player; // Variabel player global
const mainVideoId = "l-wUIbWNkyw";

/**
 * Fungsi PUSAT yang akan dipanggil oleh YouTube API setelah siap.
 * Fungsi ini akan memeriksa halaman mana yang sedang aktif 
 * dan menjalankan logika yang sesuai.
 */
function onYouTubeIframeAPIReady() {
    console.log("Universal YouTube API is ready.");
    
    // Cek jika kita berada di halaman utama (ada pemutar video dokumenter)
    if (document.getElementById("youtube-player")) {
        console.log("Halaman utama terdeteksi. Membuat pemutar video dokumenter.");
        player = new YT.Player("youtube-player", {
            height: "100%",
            width: "100%",
            videoId: mainVideoId,
            playerVars: {
                playsinline: 1,
                controls: 1,
                rel: 0,
                modestbranding: 1,
                autoplay: 0,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    } 
    
    // Cek jika class untuk Reels sudah di-load (berarti kita di halaman reels)
    // dan panggil metode di dalamnya.
    if (window.reelsSystem && typeof window.reelsSystem.onYouTubeAPIReady === 'function') {
        console.log("Halaman Reels terdeteksi. Menginisialisasi player Reels.");
        window.reelsSystem.onYouTubeAPIReady();
    }
}

// Fungsi ini HANYA untuk pemutar video di halaman utama
function onPlayerReady(event) {
  console.log("Player dokumenter siap.");
  const thumbnail = document.getElementById("video-thumbnail");

  if (thumbnail) {
      // Kita hanya pasang SATU event listener yang cerdas
      thumbnail.addEventListener("click", () => {
          const playerState = player.getPlayerState();
          if (playerState === YT.PlayerState.PLAYING) {
              // Jika video sedang diputar, jeda videonya
              player.pauseVideo();
              console.log("Video dijedah (paused).");
          } else {
              // Jika video tidak sedang diputar (dijeda, selesai, atau belum mulai), putar videonya
              player.playVideo();
              console.log("Video diputar (played).");
          }
      });
  }
}

// Fungsi ini HANYA untuk pemutar video di halaman utama
function onPlayerStateChange(event) {
  const thumbnailImage = document.querySelector("#video-thumbnail img");
  const playButtonWrapper = document.getElementById("play-button-wrapper");

  if (thumbnailImage && playButtonWrapper) {
      if (event.data === YT.PlayerState.PLAYING) {
          // Saat video diputar, sembunyikan GAMBAR THUMBNAIL dan IKON PLAY
          thumbnailImage.style.opacity = '0';
          playButtonWrapper.style.display = 'none';
          console.log("Menyembunyikan thumbnail & ikon play.");
      } else {
          // Saat video dijeda atau selesai, tampilkan kembali GAMBAR THUMBNAIL dan IKON PLAY
          thumbnailImage.style.opacity = '1';
          playButtonWrapper.style.display = 'flex';
          console.log("Menampilkan thumbnail & ikon play.");
      }
  }
}



