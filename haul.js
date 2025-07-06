document.addEventListener("DOMContentLoaded", function () {
  
    // --- LOGIKA COUNTDOWN HAUL ---
    const countdownDate = new Date("July 13, 2025 00:00:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            if (distance < 0) {
                document.getElementById("countdown").innerHTML = "<p class='text-2xl'>Haul Telah Tiba!</p>";
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = String(days).padStart(2, "0");
            hoursEl.innerText = String(hours).padStart(2, "0");
            minutesEl.innerText = String(minutes).padStart(2, "0");
            secondsEl.innerText = String(seconds).padStart(2, "0");
        }
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- LOGIKA GALERI VIDEO INTERAKTIF ---
    const videoData = [
        { id: 'O6vTE1W1Pqg', title: 'Haul Guru Tua ke-54', year: '2022' },
        { id: '2f5x1g87BSc', title: 'Haul Guru Tua ke-55', year: '2023' },
        { id: 'fmaA-uLq5Yk', title: 'Haul Guru Tua ke-56', year: '2024' },
        { id: '3q8bYtW2rC0', title: 'Dokumenter Haul Akbar', year: 'Arsip' }
        // Tambahkan video lainnya di sini
    ];

    const mainVideoPlayer = document.getElementById('main-video-player');
    const playlistContainer = document.getElementById('video-playlist');

    function renderPlaylist() {
        if (!playlistContainer) return;
        playlistContainer.innerHTML = ''; // Kosongkan playlist

        videoData.forEach((video, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            item.dataset.videoId = video.id;

            item.innerHTML = `
                <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
                <div class="playlist-item-info">
                    <h4>${video.title}</h4>
                    <p>Tahun ${video.year}</p>
                </div>
            `;
            
            // Tandai item pertama sebagai aktif
            if (index === 0) {
                item.classList.add('active');
            }

            item.addEventListener('click', () => {
                // Set video utama
                mainVideoPlayer.src = `http://googleusercontent.com/youtube.com/3`;

                // Update status aktif
                document.querySelectorAll('.playlist-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            });
            playlistContainer.appendChild(item);
        });
    }

    // Set video pertama saat halaman dimuat
    if (videoData.length > 0 && mainVideoPlayer) {
        mainVideoPlayer.src = `http://googleusercontent.com/youtube.com/4`;
    }

    renderPlaylist();
    
    // --- LOGIKA ANIMASI SCROLL FADE (opsional, untuk konsistensi) ---
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-fade').forEach((el) => {
        el.classList.add('fade-in-init'); // Tambah kelas awal untuk animasi
        scrollObserver.observe(el);
    });

});

// CSS untuk animasi fade-in bisa ditambahkan di haul.css
/*
.fade-in-init {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}
*/