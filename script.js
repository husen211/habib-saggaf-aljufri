document.addEventListener('DOMContentLoaded', function () {
    
    // Mobile Menu Logic
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });


    // Timeline Data & Logic
    const timelineData = [
        { year: '1937', title: 'Kelahiran Sang Cahaya', description: 'Lahir di Pekalongan, Jawa Tengah, 17 Agustus 1937 Masehi. Bertepatan dengan. Kelahirannya yang bertepatan dengan tanggal kemerdekaan menjadi simbol keterikatannya dengan bangsa Indonesia.' },
        { year: '1951', title: 'Hijrah ke Palu', description: 'Pindah dan menetap di Palu, Sulawesi Tengah, memulai babak baru hidupnya di jantung komunitas Alkhairaat yang akan dipimpinnya kelak.' },
        { year: '1959-1967', title: 'Menimba Ilmu di Al-Azhar', description: 'Melanjutkan studi di Universitas Al-Azhar, Kairo, Mesir, Salah satu universitas kebanggaan dunia. Saat tes beliau mendapatkan nilai tertinggi kerena penguasaan beliau yang sangat baik terhadap Bahasa Arab. Meraih gelar Sarjana dan Master, membangun fondasi keilmuan yang mendalam.' },
        { year: '1974', title: 'Memegang Amanah Kepemimpinan', description: 'Diangkat menjadi Ketua Utama Alkhairaat, melanjutkan estafet kepemimpinan dari ayah dan kakeknya (Guru Tua). Memulai era transformasi dan ekspansi besar.' },
        { year: '1991', title: 'Gagasan Visioner', description: 'Pada Muktamar Alkhairaat VI, beliau menggagas pendirian Pondok Pesantren Madinatul Ilmi Dolo sebagai solusi strategis untuk krisis kader pengajar.' },
        { year: '2021', title: 'Berpulang ke Rahmatullah', description: 'Wafat pada 3 Agustus di Palu, meninggalkan warisan institusi yang kokoh dan jutaan Abnaulkhairaat yang melanjutkan perjuangannya.' }
    ];

const timelineContainer = document.getElementById('timeline-container');
timelineData.forEach((item, index) => {
    const timelineItem = document.createElement('div');
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

        <div class="timeline-item-content overflow-hidden max-h-0 opacity-0 transition-all duration-300">
            <p class="text-sm text-stone-600 mt-2 text-center">${item.description}</p>
        </div>
    `;

    timelineContainer.appendChild(timelineItem);

    const titleElement = timelineItem.querySelector('h4');
    const contentElement = timelineItem.querySelector('.timeline-item-content');
    const iconElement = timelineItem.querySelector('svg');

    titleElement.addEventListener('click', () => {
        const isOpen = contentElement.style.maxHeight && contentElement.style.maxHeight !== '0px';
        if (isOpen) {
            contentElement.style.maxHeight = '0px';
            contentElement.style.opacity = '0';
            iconElement.style.transform = 'rotate(0deg)';
        } else {
            contentElement.style.maxHeight = contentElement.scrollHeight + "px";
            contentElement.style.opacity = '1';
            iconElement.style.transform = 'rotate(180deg)';
        }
    });
});


    // Chart.js - Growth Chart
    const growthCtx = document.getElementById('growthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['1969', '1970', '1980', '1986', '1991', '1997', '2007'],
            datasets: [{
                label: 'Jumlah Madrasah/Sekolah',
                data: [420, 450, 556, 732, 1221, 1268, 1561],
                borderColor: 'rgb(217, 119, 6)',
                backgroundColor: 'rgba(217, 119, 6, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: '#57534e' } }, x: { ticks: { color: '#57534e' } } }, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#064e3b', titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 10, cornerRadius: 4 } } }
    });

    // Chart.js - Distribution Chart
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    new Chart(distributionCtx, {
        type: 'bar',
        data: {
            labels: ['Sulteng', 'Maluku & MU', 'Sulut', 'Gorontalo', 'Kaltim', 'Sulbar', 'Papua & PB', 'Sulsel'],
            datasets: [{
                label: 'Jumlah Madrasah/Sekolah',
                data: [1096, 162, 135, 61, 55, 18, 12, 7],
                backgroundColor: ['rgba(6, 78, 59, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(202, 138, 4, 0.7)', 'rgba(120, 113, 108, 0.7)', 'rgba(6, 78, 59, 0.5)', 'rgba(16, 185, 129, 0.5)', 'rgba(245, 158, 11, 0.5)'],
                borderColor: ['rgb(6, 78, 59)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)', 'rgb(202, 138, 4)', 'rgb(120, 113, 108)', 'rgb(6, 78, 59)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)'],
                borderWidth: 1
            }]
        },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, ticks: { color: '#57534e' } }, y: { ticks: { color: '#57534e' } } }, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#064e3b', titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 10, cornerRadius: 4 } } }
    });

    // Gemini API Integration Logic
    const summarizeBtn = document.getElementById('summarize-btn');
    const questionsBtn = document.getElementById('questions-btn');
    const llmOutputDiv = document.getElementById('llm-output');
    const llmLoadingDiv = document.getElementById('llm-loading');
    const llmContentDiv = document.getElementById('llm-content');
    const pemikiranCards = document.querySelectorAll('#pemikiran .card p');
    let pemikiranText = '';
    pemikiranCards.forEach(card => { pemikiranText += card.textContent + ' '; });
    pemikiranText = pemikiranText.trim();
    async function callGeminiAPI(promptText) {
        llmOutputDiv.classList.remove('hidden');
        llmLoadingDiv.classList.remove('hidden');
        llmContentDiv.innerHTML = '';
        try {
            let chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyCUWz7KCQcPAFh_xWOugTeV6JtJBy8laKc";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const result = await response.json();
            if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts[0]) {
                const text = result.candidates[0].content.parts[0].text;
                llmContentDiv.innerHTML = text.replace(/\n/g, '<br>');
            } else {
                llmContentDiv.textContent = 'Maaf, tidak dapat menghasilkan respons. Silakan coba lagi.';
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            llmContentDiv.textContent = 'Terjadi kesalahan saat berkomunikasi dengan API. Coba lagi nanti.';
        } finally {
            llmLoadingDiv.classList.add('hidden');
        }
    }
    summarizeBtn.addEventListener('click', () => callGeminiAPI(`Ringkaslah poin-poin utama dari teks berikut tentang pemikiran dan pengaruh Habib Saggaf Aljufri:\n\n${pemikiranText}`));
    questionsBtn.addEventListener('click', () => callGeminiAPI(`Buatlah 3-5 pertanyaan diskusi yang mendalam dan relevan berdasarkan teks berikut tentang pemikiran dan pengaruh Habib Saggaf Aljufri:\n\n${pemikiranText}`));

    // Countdown Logic
    const countdownDate = new Date("july 13, 2025 00:00:00").getTime();
    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
        if (distance < 0) {
            clearInterval(updateCountdown);
            document.getElementById("countdown").innerHTML = "Haul Telah Tiba!";
        }
    }, 1000);

    // Count-up Animation Logic
    function animateCountUp(element, start, end, duration) {
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toLocaleString('id-ID');
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.target);
                animateCountUp(element, 0, target, 1500);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.count-up').forEach(el => countUpObserver.observe(el));
    
    // Inisialisasi Swiper.js
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});



// Smooth Scroll for Anchor Links
window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  setTimeout(() => {
    intro.style.opacity = "0";
    intro.style.pointerEvents = "none";
    setTimeout(() => {
      intro.style.display = "none";
    }, 1000); // tunggu transisi hilang
  }, 3000); // 3 detik tampil dulu
});
