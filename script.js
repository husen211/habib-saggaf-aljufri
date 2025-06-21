// PERBAIKAN: Menggabungkan semua logika ke dalam satu event listener DOMContentLoaded
// untuk memastikan semua elemen HTML sudah dimuat sebelum skrip dijalankan dan
// untuk menghindari konflik dari duplikasi kode.
document.addEventListener("DOMContentLoaded", function () {
  
    // --- LOGIKA UNTUK MENU MOBILE ---
    // Kode ini sekarang menjadi satu-satunya yang mengatur menu mobile.
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
        // Menutup menu ketika salah satu link di dalamnya diklik
        document.querySelectorAll("#mobile-menu a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }
  
  
    // --- LOGIKA UNTUK TIMELINE (Hanya untuk index.html) ---
    const timelineData = [
      {
        year: "1937",
        title: "Kelahiran Sang Cahaya",
        description:
          "Lahir di Pekalongan, Jawa Tengah, 17 Agustus 1937 Masehi. Kelahirannya yang bertepatan dengan tanggal kemerdekaan menjadi simbol keterikatannya dengan bangsa Indonesia.",
        imageUrl: "asset/kota pekalongan.jpg",
      },
      {
        year: "1951",
        title: "Hijrah ke Palu",
        description:
          "Pindah dan menetap di Palu, Sulawesi Tengah, memulai babak baru hidupnya di jantung komunitas Alkhairaat yang akan dipimpinnya kelak.",
        imageUrl: "asset/kota palu.jpeg",
      },
      {
        year: "1959-1967",
        title: "Menimba Ilmu di Al-Azhar",
        description:
          "Melanjutkan studi di Universitas Al-Azhar, Kairo, Mesir. Meraih gelar Sarjana dan Master, membangun fondasi keilmuan yang mendalam.",
        imageUrl: "asset/al azhar.jpg",
      },
      {
        year: "1974",
        title: "Memegang Amanah Kepemimpinan",
        description:
          "Diangkat menjadi Ketua Utama Alkhairaat, melanjutkan estafet kepemimpinan dari Guru Tua dan memulai era transformasi besar.",
        imageUrl: "asset/habib saggaf pict.jpg",
      },
      {
        year: "1991",
        title: "Gagasan Visioner",
        description:
          "Pada Muktamar Alkhairaat VI, beliau menggagas pendirian Pondok Pesantren Madinatul Ilmi Dolo sebagai solusi strategis untuk krisis kader pengajar.",
        imageUrl: "asset/ponpes madinatul ilmi old.jpeg",
      },
      {
        year: "2021",
        title: "Berpulang ke Rahmatullah",
        description:
          "Wafat pada 3 Agustus di Palu, meninggalkan warisan institusi yang kokoh dan jutaan Abnaulkhairaat yang melanjutkan perjuangannya.",
        imageUrl: "asset/habib saggaf meninggal.jpg",
      },
    ];
  
    const timelineContainer = document.getElementById("timeline-container");
    if (timelineContainer) {
      timelineData.forEach((item, index) => {
        const timelineItem = document.createElement("div");
        timelineItem.className = `relative w-full md:w-2/3 p-4 rounded-lg bg-white shadow-md border border-stone-200/60 mx-auto`;
        timelineItem.innerHTML = `
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
              ${index + 1}
          </div>
          <p class="font-bold text-lg text-amber-700 text-center">${item.year}</p>
          <h4 class="font-semibold text-emerald-800 mt-1 text-center cursor-pointer flex justify-center items-center gap-2">
              ${item.title}
              <svg class="h-4 w-4 text-emerald-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
          </h4>
          <div class="timeline-item-content overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out">
              <div class="pt-4 space-y-4">
                  <img src="${item.imageUrl}" alt="Ilustrasi untuk ${item.title}" class="w-full h-auto rounded-lg shadow-md object-cover" onerror="this.style.display='none'">
                  <p class="text-sm text-stone-600 mt-2 text-center">${item.description}</p>
              </div>
          </div>
        `;
        timelineContainer.appendChild(timelineItem);
        const titleElement = timelineItem.querySelector("h4");
        const contentElement = timelineItem.querySelector(".timeline-item-content");
        const iconElement = timelineItem.querySelector("svg");
        titleElement.addEventListener("click", () => {
          const isOpen = contentElement.style.maxHeight && contentElement.style.maxHeight !== "0px";
          if (isOpen) {
            contentElement.style.maxHeight = "0px";
            contentElement.style.opacity = "0";
            iconElement.style.transform = "rotate(0deg)";
          } else {
            contentElement.style.maxHeight = contentElement.scrollHeight + "px";
            contentElement.style.opacity = "1";
            iconElement.style.transform = "rotate(180deg)";
          }
        });
      });
    }
  
    // --- LOGIKA UNTUK CHARTS (Hanya untuk index.html) ---
    let growthChartInstance = null;
    function drawGrowthChart() {
      const growthCtx = document.getElementById("growthChart");
      if (!growthCtx) return;
      if (growthChartInstance) growthChartInstance.destroy();
      growthChartInstance = new Chart(growthCtx.getContext("2d"), {
        type: "line",
        data: {
          labels: ["1969", "1970", "1980", "1986", "1991", "1997", "2007"],
          datasets: [{
            label: "Jumlah Madrasah/Sekolah",
            data: [420, 450, 556, 732, 1221, 1268, 1561],
            borderColor: "rgb(217, 119, 6)",
            backgroundColor: "rgba(217, 119, 6, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, ticks: { color: "#57534e" } }, x: { ticks: { color: "#57534e" } } },
          plugins: { legend: { display: false }, tooltip: { backgroundColor: "#064e3b", titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 10, cornerRadius: 4 } },
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
          labels: ["Sulteng", "Maluku & MU", "Sulut", "Gorontalo", "Kaltim", "Sulbar", "Papua & PB", "Sulsel"],
          datasets: [{
            label: "Jumlah Madrasah/Sekolah",
            data: [1096, 162, 135, 61, 55, 18, 12, 7],
            backgroundColor: ["rgba(6, 78, 59, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(202, 138, 4, 0.7)", "rgba(120, 113, 108, 0.7)", "rgba(6, 78, 59, 0.5)", "rgba(16, 185, 129, 0.5)", "rgba(245, 158, 11, 0.5)"],
            borderColor: ["rgb(6, 78, 59)", "rgb(16, 185, 129)", "rgb(245, 158, 11)", "rgb(202, 138, 4)", "rgb(120, 113, 108)", "rgb(6, 78, 59)", "rgb(16, 185, 129)", "rgb(245, 158, 11)"],
            borderWidth: 1,
          }],
        },
        options: {
          indexAxis: "y", responsive: true, maintainAspectRatio: false,
          scales: { x: { beginAtZero: true, ticks: { color: "#57534e" } }, y: { ticks: { color: "#57534e" } } },
          plugins: { legend: { display: false }, tooltip: { backgroundColor: "#064e3b", titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 10, cornerRadius: 4 } },
          animation: { duration: 2000, easing: "easeInOutQuart" },
        },
      });
    }
  
    const chartObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "growthChart") drawGrowthChart();
          else if (entry.target.id === "distributionChart") drawDistributionChart();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
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
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      });
    }
  
    // --- LOGIKA UNTUK GEMINI API (Hanya untuk index.html) ---
    const summarizeBtn = document.getElementById("summarize-btn");
    const questionsBtn = document.getElementById("questions-btn");
    const llmOutputDiv = document.getElementById("llm-output");
    const llmLoadingDiv = document.getElementById("llm-loading");
    const llmContentDiv = document.getElementById("llm-content");
    if (summarizeBtn) {
        const pemikiranCards = document.querySelectorAll("#pemikiran .card p");
        let pemikiranText = "";
        pemikiranCards.forEach((card) => { pemikiranText += card.textContent + " "; });
        pemikiranText = pemikiranText.trim();
  
        async function callGeminiAPI(promptText) {
            if (llmOutputDiv) llmOutputDiv.classList.remove("hidden");
            if (llmLoadingDiv) llmLoadingDiv.classList.remove("hidden");
            if (llmContentDiv) llmContentDiv.innerHTML = "";
            try {
                let chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
                const payload = { contents: chatHistory };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                const response = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
                const result = await response.json();
                if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts[0]) {
                    const text = result.candidates[0].content.parts[0].text;
                    if (llmContentDiv) llmContentDiv.innerHTML = text.replace(/\n/g, "<br>");
                } else {
                    if (llmContentDiv) llmContentDiv.textContent = "Maaf, tidak dapat menghasilkan respons. Silakan coba lagi.";
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                if (llmContentDiv) llmContentDiv.textContent = "Terjadi kesalahan saat berkomunikasi dengan API. Coba lagi nanti.";
            } finally {
                if (llmLoadingDiv) llmLoadingDiv.classList.add("hidden");
            }
        }
        summarizeBtn.addEventListener("click", () => callGeminiAPI(`Ringkaslah poin-poin utama dari teks berikut tentang pemikiran dan pengaruh Habib Saggaf Aljufri:\n\n${pemikiranText}`));
        questionsBtn.addEventListener("click", () => callGeminiAPI(`Buatlah 3-5 pertanyaan diskusi yang mendalam dan relevan berdasarkan teks berikut tentang pemikiran dan pengaruh Habib Saggaf Aljufri:\n\n${pemikiranText}`));
    }
  
    // --- LOGIKA UNTUK COUNTDOWN (Hanya untuk index.html) ---
    const countdownDate = new Date("July 13, 2025 00:00:00").getTime();
    const updateCountdown = setInterval(function () {
      const countdownDiv = document.getElementById("countdown");
      if (!countdownDiv) { clearInterval(updateCountdown); return; }
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");
      if (daysEl && hoursEl && minutesEl && secondsEl) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
    const countUpObserver = new IntersectionObserver((entries, observer) => {
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
    }, { threshold: 0.5 });
    document.querySelectorAll(".count-up").forEach((el) => countUpObserver.observe(el));
  
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
    const generalScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          generalScrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".scroll-fade").forEach((el) => generalScrollObserver.observe(el));
  
    const fotoHabibTarget = document.getElementById("foto-habib");
    if (fotoHabibTarget) {
      const fotoHabibObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
            fotoHabibObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      fotoHabibObserver.observe(fotoHabibTarget);
    }
  
    // --- LOGIKA ANIMASI FADE-IN KARTU TESTIMONI (Hanya untuk kesan_mereka.html) ---
    const testimonialCards = document.querySelectorAll(".testimoni-card");
    if (testimonialCards.length > 0) {
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    testimonialObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
  
        testimonialCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            testimonialObserver.observe(card);
        });
    }
  
  }); // Akhir dari event listener DOMContentLoaded
  