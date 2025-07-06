document.addEventListener("DOMContentLoaded", function () {
            
    // --- MOBILE MENU FUNCTIONALITY ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
        mobileMenuOverlay.classList.toggle('open');
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // --- COUNTDOWN FUNCTIONALITY ---
    const countdownDate = new Date("July 13, 2025 08:00:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            if (distance < 0) {
                document.getElementById("countdown").innerHTML = 
                    "<div class='col-span-4 text-center'><p class='text-2xl font-bold'>🎉 Haul Telah Tiba! 🎉</p></div>";
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

    // --- VIDEO GALLERY FUNCTIONALITY ---
    const videoData = [
        { id: 'urEVNget_g8', title: 'Haul Habib Saggaf ke 3', year: '2024' },
        { id: 'KZHnjUocCKw', title: 'Live Streaming Haul Habib Saggaf ke 2', year: '2023' },
        { id: 'yU5YJH1Ofvg', title: 'Live Streaming Haul Habib Saggaf ke 1', year: '2022' },
        // { id: 'O6vTE1W1Pqg', title: 'Haul Guru Tua ke-54', year: '2022' },
        // { id: '2f5x1g87BSc', title: 'Haul Guru Tua ke-55', year: '2023' },
        // { id: 'fmaA-uLq5Yk', title: 'Haul Guru Tua ke-56', year: '2024' }
    ];

    const mainVideoPlayer = document.getElementById('main-video-player');
    const playlistContainer = document.getElementById('video-playlist');

    function renderPlaylist() {
        if (!playlistContainer) return;
        
        playlistContainer.innerHTML = '';

        videoData.forEach((video, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            item.dataset.videoId = video.id;

            item.innerHTML = `
                <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" 
                     alt="${video.title}" 
                     loading="lazy">
                <div class="playlist-item-info">
                    <h4>${video.title}</h4>
                    <p>Tahun ${video.year}</p>
                </div>
            `;
            
            // Mark first item as active
            if (index === 0) {
                item.classList.add('active');
            }

            item.addEventListener('click', () => {
                // Update main video
                if (mainVideoPlayer) {
                    mainVideoPlayer.src = `https://www.youtube.com/embed/${video.id}`;
                }

                // Update active status
                document.querySelectorAll('.playlist-item').forEach(el => {
                    el.classList.remove('active');
                });
                item.classList.add('active');
            });

            playlistContainer.appendChild(item);
        });
    }

    // Initialize playlist
    renderPlaylist();

    // --- SCROLL ANIMATIONS ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-fade').forEach((el) => {
        el.classList.add('fade-in-init');
        scrollObserver.observe(el);
    });

    // --- SMOOTH SCROLLING FOR NAVIGATION ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- HEADER SCROLL EFFECT ---
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // --- LOADING ENHANCEMENT ---
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // --- ERROR HANDLING FOR VIDEOS ---
    if (mainVideoPlayer) {
        mainVideoPlayer.addEventListener('error', () => {
            console.log('Video loading error, trying alternative...');
        });
    }

});

// --- UTILITY FUNCTIONS ---
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

function validateYouTubeId(id) {
    const regex = /^[a-zA-Z0-9_-]{11}$/;
    return regex.test(id);
}

// --- UNDANGAN FUNCTIONS ---
function downloadImage() {
    const link = document.createElement('a');
    link.href = 'asset/undangan hal 4.jpg';
    link.download = 'Undangan_Haul_Akbar_2025.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function shareImage() {
    if (navigator.share) {
        navigator.share({
            title: 'Undangan Haul Akbar 2025',
            text: 'Haul Akbar Habib Saggaf bin Muhammad Aljufri ke-57 - 13 Juli 2025',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link telah disalin ke clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link telah disalin ke clipboard!');
        });
    }
}

// --- PERFORMANCE OPTIMIZATION ---
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}