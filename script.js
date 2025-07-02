// File: script.js (Versi Final Lengkap untuk Disalin)

document.addEventListener("DOMContentLoaded", function () {
  // --- LOGIKA UNTUK MENU MOBILE ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
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
      sectionLabel: "MASA KELAHIRAN & PENDIDIKAN AWAL",
    },
    {
      year: "1951",
      title: "Hijrah ke Palu",
      description:
        "Pindah dan menetap di Palu, Sulawesi Tengah, memulai babak baru hidupnya di jantung komunitas Alkhairaat yang akan dipimpinnya kelak.",
      imageUrl: "asset/kota palu.jpeg",
      sectionLabel: "HIJRAH DAN PENEMPAN KARAKTER",
    },
    {
      year: "1959-1967",
      title: "Menimba Ilmu di Al-Azhar",
      description:
        "Melanjutkan studi di Universitas Al-Azhar, Kairo, Mesir. Meraih gelar Sarjana dan Master, membangun fondasi keilmuan yang mendalam.",
      imageUrl: "asset/al azhar.jpg",
      sectionLabel: "PERJALANAN ILMIAH",
    },
    {
      year: "1974",
      title: "Memegang Amanah Kepemimpinan",
      description:
        "Diangkat menjadi Ketua Utama Alkhairaat, melanjutkan estafet kepemimpinan dari Guru Tua dan memulai era transformasi besar.",
      imageUrl: "asset/habib saggaf pict.jpg",
      sectionLabel: "KEPEMIMPINAN ALKHAIRAAT",
    },
    {
      year: "1991",
      title: "Gagasan Visioner",
      description:
        "Pada Muktamar Alkhairaat VI, beliau menggagas pendirian Pondok Pesantren Madinatul Ilmi Dolo sebagai solusi strategis untuk krisis kader pengajar.",
      imageUrl: "asset/ponpes madinatul ilmi old.jpeg",
      sectionLabel: "GAGASAN DAN LEGACY",
    },
    {
      year: "2021",
      title: "Berpulang ke Rahmatullah",
      description:
        "Wafat pada 3 Agustus di Palu, meninggalkan warisan institusi yang kokoh dan jutaan Abnaulkhairaat yang melanjutkan perjuangannya.",
      imageUrl: "asset/habib saggaf meninggal.jpg",
      sectionLabel: "AKHIR HAYAT",
    },
  ];

  const timelineContainer = document.getElementById("timeline-container");

  if (timelineContainer) {
    timelineData.forEach((item, index) => {
      // SECTION TITLE
      const label = document.createElement("h5");
      label.textContent = item.sectionLabel;
      label.className =
        "text-sm font-semibold text-orange-600 text-center tracking-wider mb-2 mt-12 relative z-10";
      timelineContainer.appendChild(label);

      // CARD
      const timelineItem = document.createElement("div");
      timelineItem.className =
        "relative w-full md:w-2/3 p-4 rounded-lg bg-white shadow-md border border-stone-200/60 mx-auto";

      timelineItem.innerHTML = `
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md z-20">
                ${index + 1}
            </div>
            <p class="font-bold text-lg text-amber-700 text-center">${
              item.year
            }</p>
            <h4 class="font-semibold text-emerald-800 mt-1 text-center cursor-pointer flex justify-center items-center gap-2">
                ${item.title}
                <svg class="h-4 w-4 text-emerald-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </h4>
            <div class="timeline-item-content overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out">
                <div class="pt-4 space-y-4">
                    <img src="${item.imageUrl}" alt="Ilustrasi untuk ${
        item.title
      }" class="w-full h-auto rounded-lg shadow-md object-cover" onerror="this.style.display='none'">
                    <p class="text-sm text-stone-600 mt-2 text-center">${
                      item.description
                    }</p>
                </div>
            </div>
          `;

      timelineContainer.appendChild(timelineItem);

      // INTERAKSI COLLAPSE
      const titleElement = timelineItem.querySelector("h4");
      const contentElement = timelineItem.querySelector(
        ".timeline-item-content"
      );
      const iconElement = timelineItem.querySelector("svg");
      titleElement.addEventListener("click", () => {
        const isOpen =
          contentElement.style.maxHeight &&
          contentElement.style.maxHeight !== "0px";
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
        datasets: [
          {
            label: "Jumlah Madrasah/Sekolah",
            data: [420, 450, 556, 732, 1221, 1268, 1561],
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
          "Maluku & MU",
          "Sulut",
          "Gorontalo",
          "Kaltim",
          "Sulbar",
          "Papua & PB",
          "Sulsel",
        ],
        datasets: [
          {
            label: "Jumlah Madrasah/Sekolah",
            data: [1096, 162, 135, 61, 55, 18, 12, 7],
            backgroundColor: [
              "rgba(6, 78, 59, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(245, 158, 11, 0.7)",
              "rgba(202, 138, 4, 0.7)",
              "rgba(120, 113, 108, 0.7)",
              "rgba(6, 78, 59, 0.5)",
              "rgba(16, 185, 129, 0.5)",
              "rgba(245, 158, 11, 0.5)",
            ],
            borderColor: [
              "rgb(6, 78, 59)",
              "rgb(16, 185, 129)",
              "rgb(245, 158, 11)",
              "rgb(202, 138, 4)",
              "rgb(120, 113, 108)",
              "rgb(6, 78, 59)",
              "rgb(16, 185, 129)",
              "rgb(245, 158, 11)",
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

  // // --- LOGIKA UNTUK GEMINI API (LAMA, untuk tombol Ringkasan & Pertanyaan) ---
  // const summarizeBtn = document.getElementById("summarize-btn");
  // const questionsBtn = document.getElementById("questions-btn");
  // const llmOutputDiv = document.getElementById("llm-output");
  // const llmLoadingDiv = document.getElementById("llm-loading");
  // const llmContentDiv = document.getElementById("llm-content");
  // if (summarizeBtn) {
  //     const pemikiranCards = document.querySelectorAll("#pemikiran .card p");
  //     let pemikiranText = "";
  //     pemikiranCards.forEach((card) => { pemikiranText += card.textContent + " "; });
  //     pemikiranText = pemikiranText.trim();

  //     async function callGeminiAPI(promptText) {
  //         if (llmOutputDiv) llmOutputDiv.classList.remove("hidden");
  //         if (llmLoadingDiv) llmLoadingDiv.classList.remove("hidden");
  //         if (llmContentDiv) llmContentDiv.innerHTML = "";
  //         try {
  //             // PENTING: Kode ini masih menggunakan API Key di frontend dan tidak aman.
  //             // Jika ingin membuatnya aman, logika ini juga harus dipindahkan ke backend.
  //             // Untuk sekarang, kita biarkan sesuai kode asli.
  //             let chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
  //             const payload = { contents: chatHistory };
  //             const apiKey = ""; // API Key sengaja dikosongkan agar tidak terekspos
  //             const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  //             const response = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  //             const result = await response.json();
  //             if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts[0]) {
  //                 const text = result.candidates[0].content.parts[0].text;
  //                 if (llmContentDiv) llmContentDiv.innerHTML = text.replace(/\n/g, "<br>");
  //             } else {
  //                 if (llmContentDiv) llmContentDiv.textContent = "Maaf, tidak dapat menghasilkan respons. Silakan coba lagi.";
  //             }
  //         } catch (error) {
  //             console.error("Error calling Gemini API:", error);
  //             if (llmContentDiv) llmContentDiv.textContent = "Terjadi kesalahan saat berkomunikasi dengan API. Coba lagi nanti.";
  //         } finally {
  //             if (llmLoadingDiv) llmLoadingDiv.classList.add("hidden");
  //         }
  //     }
  //     summarizeBtn.addEventListener("click", () => callGeminiAPI(`Ringkaslah poin-poin utama dari teks berikut tentang pemikiran dan pengaruh Habib Saggaf Aljufri:\n\n${pemikiranText}`));
  //     questionsBtn.addEventListener("click", () => callGeminiAPI(`Buatlah 3-5 pertanyaan diskusi yang mendalam dan relevan berdasarkan teks berikut tentang pemikiran dan pengaruh Habib Saggaf Aljufri:\n\n${pemikiranText}`));
  // }

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
        threshold: 0.2,
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



});// <--  AKHIR dari event listener DOMContentLoaded


// --- LOGIKA UNTUK HALAMAN REELS (VERSI FINAL DENGAN SCOPE YANG BENAR) ---

function onYouTubeIframeAPIReady() {
  console.log("YouTube API is ready."); // Pesan untuk debugging
  setupReelsPage();
}

/**
 * Fungsi untuk memuat script YouTube API secara dinamis.
 */
function loadYouTubeAPI() {
  console.log("Loading YouTube API..."); // Pesan untuk debugging
  if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    onYouTubeIframeAPIReady();
  }
}

/**
 * Fungsi utama untuk men-setup semua elemen dan logika di halaman reels.
 */
function setupReelsPage() {
  console.log("Setting up reels page...");
  const reelsContainer = document.getElementById("reels-container");
  const welcomeOverlay = document.getElementById("welcome-overlay");

  if (!reelsContainer || !welcomeOverlay) {
    console.error("Reels container or Welcome overlay not found!");
    return;
  }

  document.body.classList.add("reels-page");

  // --- STATE MANAGEMENT ---
  let isGlobalMuted = true;
  const players = {};
  let activePlayer = null;

  const reelsData = [
    { youtubeVideoId: "JORR7-LOV_A", title: "Nasihat Tentang Keikhlasan", likes: "12.3k", shares: "1.2k" },
    { youtubeVideoId: "aFQ9O0s3m-U", title: "Pertemuan Habib Ali Aljufri Dan Habib Saggaf", likes: "25.1k", shares: "3.4k" },
    { youtubeVideoId: "TfAM7HliI74", title: "Pesan Habib Saggaf", likes: "18.7k", shares: "2.1k" },
    { youtubeVideoId: "Uszc2__wiOU", title: "Jalankan Tugas Dengan Ikhlas", likes: "30.2k", shares: "4.5k" },
    { youtubeVideoId: "XKWCvDG_4zM", title: "Cinta Tanah Air", likes: "22.8k", shares: "3.9k" },
    { youtubeVideoId: "hVSQE6typX8", title: "Karomah Habib Saggaf", likes: "25.1k", shares: "3.4k" },
    { youtubeVideoId: "CbFGNKeXZFI", title: "Nasehat Habib Saggaf", likes: "15.6k", shares: "2.8k" },
    { youtubeVideoId: "RM_qmGZGr3M", title: "Habib Saggaf Pict", likes: "15.6k", shares: "2.8k" },
    { youtubeVideoId: "JdEszEfcS9k", title: "Menceritakan Perkataan Habib Idrus bin Salim", likes: "15.6k", shares: "2.8k" },
    { youtubeVideoId: "iXQ0dziYif8", title: "Pesan Toleransi Habib Saggaf", likes: "102k", shares: "12k" },
    { youtubeVideoId: "o2ef003w6a8", title: "Pesan Habib Idrus kepada Habib Saggaf", likes: "2.4k", shares: "1.2k" },
    { youtubeVideoId: "r_MZcvKyHP8", title: "Habib Syech Assegaf Sowan", likes: "2.7k", shares: "1.6k" }
  ];

  // --- LOGIKA UNTUK WELCOME OVERLAY (FIX AUTOPLAY HP) ---
  function grantAutoplayPermission() {
    welcomeOverlay.classList.add("hidden");

    // Coba putar video pertama untuk "membangunkan" browser
    // Ini adalah bagian terpenting untuk fix di HP
    const firstPlayerKey = Object.keys(players)[0];
    const firstPlayer = players[firstPlayerKey];
    
    if (firstPlayer && typeof firstPlayer.playVideo === 'function') {
      firstPlayer.playVideo();
      // Pastikan status mute diterapkan dengan benar saat pertama kali play
      if(isGlobalMuted) {
          firstPlayer.mute();
      } else {
          firstPlayer.unMute();
      }
    }
    // Hapus listener agar tidak berjalan lagi
    welcomeOverlay.removeEventListener('click', grantAutoplayPermission);
  }
  welcomeOverlay.addEventListener('click', grantAutoplayPermission);

  // --- PEMBUATAN ELEMEN & INTERAKSI ---
  function createReelElement(video, index) {
    const reelElement = document.createElement("div");
    reelElement.className = "reel-item";
    reelElement.dataset.videoId = video.youtubeVideoId;
    reelElement.dataset.index = index;

    const iframeId = `ytplayer-${video.youtubeVideoId}-${index}`;
    reelElement.dataset.iframeId = iframeId;

    reelElement.innerHTML = `
      <div class="video-placeholder" id="${iframeId}"></div>
      <i class="fas fa-heart interaction-icon like-icon"></i>
      <i class="fas fa-play interaction-icon play-icon"></i>
      <i class="fas fa-pause interaction-icon pause-icon"></i>
      <div class="reel-info">
        <img src="/asset/logo hbib.jpg" alt="profil" class="profile-pic">
        <div>
          <h3>@jejakhabibsaggaf</h3>
          <p>${video.title}</p>
        </div>
      </div>
      <div class="reel-actions">
        <div class="action-button like-button">
          <i class="fas fa-heart"></i> <span class="likes-count">${video.likes}</span>
        </div>
        <div class="action-button comment-button">
          <i class="fas fa-comment-dots"></i> <span>...</span>
        </div>
        <div class="action-button share-button">
          <i class="fas fa-share"></i> <span class="shares-count">${video.shares}</span>
        </div>
      </div>`;
    addInteractions(reelElement, video);
    return reelElement;
  }
  
  const globalMuteBtn = document.createElement("div");
  globalMuteBtn.className = "global-mute-button";
  document.body.appendChild(globalMuteBtn);
  updateMuteButtonIcon();

  function addInteractions(reelElement, video) {
    const likeButtonIcon = reelElement.querySelector(".like-button .fa-heart");
    const likeIcon = reelElement.querySelector(".like-icon");
    let isLiked = false;
    
    reelElement.addEventListener("click", (e) => {
        if (e.target.classList.contains('reel-item') || e.target.classList.contains('video-placeholder')) {
            togglePlayPause(reelElement.dataset.iframeId);
        }
    });

    reelElement.addEventListener("dblclick", () => {
      if (!isLiked) {
        isLiked = true;
        likeButtonIcon.classList.add("liked");
        showInteractionIcon(likeIcon);
      }
    });
    
    reelElement.querySelector(".like-button").addEventListener("click", () => {
      isLiked = !isLiked;
      likeButtonIcon.classList.toggle("liked");
    });
    
    reelElement.querySelector(".share-button").addEventListener("click", () => {
      const shareUrl = `https://www.jejakhabibsaggaf.com/reels.html?video=${video.youtubeVideoId}`;
      if (navigator.share) {
        navigator.share({ title: `Kisah Habib Saggaf: ${video.title}`, url: shareUrl }).catch(err => console.error("Gagal share", err));
      } else {
        alert("Fitur share tidak didukung di browser ini.");
      }
    });
  }
  
  globalMuteBtn.addEventListener("click", () => {
    isGlobalMuted = !isGlobalMuted;
    updateMuteButtonIcon();
    if (activePlayer) {
      isGlobalMuted ? activePlayer.mute() : activePlayer.unMute();
    }
  });

  function updateMuteButtonIcon() {
    globalMuteBtn.innerHTML = isGlobalMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
  }

  function showInteractionIcon(iconElement) {
    iconElement.classList.add("show");
    setTimeout(() => iconElement.classList.remove("show"), 600);
  }

  function togglePlayPause(iframeId) {
    const player = players[iframeId];
    if (!player || typeof player.getPlayerState !== 'function') return;

    const playerState = player.getPlayerState();
    if (playerState === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      showInteractionIcon(document.querySelector(`[data-iframe-id="${iframeId}"] .pause-icon`));
    } else {
      player.playVideo();
      showInteractionIcon(document.querySelector(`[data-iframe-id="${iframeId}"] .play-icon`));
    }
  }

  // --- OBSERVER & PLAYER LIFECYCLE ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const reelElement = entry.target;
      const iframeId = reelElement.dataset.iframeId;

      if (entry.isIntersecting) {
        if (!players[iframeId]) {
          createPlayer(reelElement);
        } else {
          const player = players[iframeId];
          player.playVideo();
          activePlayer = player;
          isGlobalMuted ? player.mute() : player.unMute();
        }
      } else {
        const player = players[iframeId];
        if (player && typeof player.pauseVideo === 'function') {
          player.pauseVideo();
        }
        if (activePlayer === player) {
            activePlayer = null;
        }
      }
    });
  }, { threshold: 0.7 });

  function createPlayer(reelElement) {
    const videoId = reelElement.dataset.videoId;
    const iframeId = reelElement.dataset.iframeId;
    const player = new YT.Player(iframeId, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: { autoplay: 1, mute: 1, controls: 0, rel: 0, showinfo: 0, modestbranding: 1, loop: 1, playlist: videoId },
      events: { 'onReady': (event) => onPlayerReady(event, iframeId) }
    });
    players[iframeId] = player;
  }

  function onPlayerReady(event, iframeId) {
    const player = event.target;
    // Autoplay ditangani oleh observer dan overlay, di sini kita cukup pastikan status mute benar
    if (isGlobalMuted) {
      player.mute();
    } else {
      player.unMute();
    }
    // Jika ini video pertama yang ready, set sebagai active player
    if (!activePlayer) {
        activePlayer = player;
    }
  }
  
  // --- INISIALISASI ---
  reelsData.forEach((video, index) => {
    const reelElement = createReelElement(video, index);
    reelsContainer.appendChild(reelElement);
    observer.observe(reelElement);
  });
}

/**
 * --- TITIK AWAL EKSEKUSI ---
 * Listener ini akan menunggu seluruh halaman (HTML) dimuat terlebih dahulu.
 */
document.addEventListener("DOMContentLoaded", function() {
    // Cek apakah kita berada di halaman reels dengan mencari elemen #reels-container
    if (document.getElementById("reels-container")) {
        loadYouTubeAPI();
    }
    
    // Anda bisa meletakkan logika untuk halaman LAIN (timeline, chart, dll) di sini.
});
