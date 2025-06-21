// File: update-pengetahuan.js
// Skrip ini dijalankan manual di komputermu untuk meng-update file pengetahuan AI.

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// 1. TENTUKAN URL WEBSITE-MU
const WEBSITE_URL = 'https://www.jejakhabibsaggaf.com';

// 2. TENTUKAN BAGIAN MANA DARI WEBSITE YANG INGIN DIAMBIL TEKSNYA
// Kita akan mengambil teks dari section-section penting di websitemu.
// ID ini harus cocok dengan ID section di file index.html-mu.
const SECTIONS_TO_SCRAPE = [
    '#jejak-kehidupan',
    '#legasi-alkhairaat',
    '#pemikiran',
    '#kaderisasi'
];

async function scrapeWebsite() {
    console.log(`Memulai proses panen informasi dari ${WEBSITE_URL}...`);

    try {
        // Ambil konten HTML dari website
        const response = await fetch(WEBSITE_URL);
        if (!response.ok) {
            throw new Error(`Gagal mengambil halaman web: Status ${response.status}`);
        }
        const html = await response.text();

        // Gunakan cheerio untuk mem-parsing HTML
        const $ = cheerio.load(html);

        let allText = '';

        // Loop melalui setiap section yang ingin kita ambil datanya
        SECTIONS_TO_SCRAPE.forEach(selector => {
            const section = $(selector);
            if (section.length > 0) {
                console.log(`- Menemukan dan memproses section: ${selector}`);
                // Ambil semua teks dari elemen <p>, <h2>, <h3>, <h4> di dalam section
                const textFromSection = section.find('h2, h3, h4, p').map((i, el) => $(el).text().trim()).get().join('\n\n');
                allText += textFromSection + '\n\n';
            } else {
                console.warn(`- Peringatan: Section dengan selector '${selector}' tidak ditemukan.`);
            }
        });

        // Bersihkan teks dari spasi atau baris baru yang berlebihan
        const cleanedText = allText.replace(/\n\s*\n/g, '\n\n').trim();

        // Tentukan di mana file pengetahuan akan disimpan
        const outputPath = path.join(__dirname, 'api', 'pengetahuan.txt');

        // Tulis teks yang sudah bersih ke dalam file pengetahuan.txt
        fs.writeFileSync(outputPath, cleanedText, 'utf8');

        console.log(`\n✅ SUKSES! File pengetahuan.txt telah berhasil diperbarui.`);
        console.log(`Lokasi file: ${outputPath}`);

    } catch (error) {
        console.error('\n❌ TERJADI ERROR saat proses panen informasi:');
        console.error(error);
    }
}

// Jalankan fungsi utama
scrapeWebsite();