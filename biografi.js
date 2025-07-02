// File: biografi.js

document.addEventListener("DOMContentLoaded", function () {
    // --- LOGIKA UNTUK NAVIGASI INTERAKTIF DI HALAMAN BIOGRAFI ---
    const tocNav = document.getElementById('toc-nav');
  
    // Hanya jalankan kode jika elemen navigasi 'toc-nav' ada di halaman ini
    if (tocNav) {
      const tocLinks = tocNav.querySelectorAll('.toc-link');
      const sections = document.querySelectorAll('.biography-section');
  
      // Opsi untuk IntersectionObserver
      const observerOptions = {
        root: null, // Menggunakan viewport browser
        rootMargin: '0px 0px -50% 0px', // Memicu saat section mencapai bagian tengah atas layar
        threshold: 0 // Memicu segera setelah bagian pertama section masuk
      };
  
      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // Cari link yang cocok dengan section yang sedang terlihat
          const correspondingLink = tocNav.querySelector(`a[href="#${entry.target.id}"]`);
  
          if (entry.isIntersecting) {
            // Jika section terlihat, hapus dulu kelas 'active' dari semua link
            tocLinks.forEach(link => link.classList.remove('active'));
            // Kemudian tambahkan kelas 'active' ke link yang sesuai
            if (correspondingLink) {
              correspondingLink.classList.add('active');
            }
          }
        });
      }, observerOptions);
  
      // Amati setiap section di halaman biografi
      sections.forEach(section => {
        sectionObserver.observe(section);
      });
    }
  });