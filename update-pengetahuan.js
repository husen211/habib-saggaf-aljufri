// File: update-pengetahuan.js (Versi BARU dengan kemampuan multi-halaman)

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// =========================================================================
// === PENGATURAN UTAMA ===
// =========================================================================

// 1. DAFTAR SEMUA HALAMAN YANG INGIN DI-SCRAPE
const PAGES_TO_SCRAPE = [
    {
        url: 'https://www.jejakhabibsaggaf.com/index.html',
        selectors: [
            '#jejak-kehidupan',
            '#legasi-alkhairaat',
            '#pemikiran',
            '#kaderisasi'
        ]
    },
    {
        url: 'https://www.jejakhabibsaggaf.com/kesan_mereka.html',
        selectors: [
            '#kesan-mereka-full' // <-- Ini sekarang sudah benar karena ID-nya sudah kita tambahkan
        ]
    }
];

// =========================================================================

async function scrapeAllPages() {
    console.log(`Memulai proses panen informasi dari ${PAGES_TO_SCRAPE.length} halaman...`);
    let allText = '';

    // Loop melalui setiap halaman yang ada di dalam daftar
    for (const page of PAGES_TO_SCRAPE) {
        console.log(`\n--> Memproses halaman: ${page.url}`);
        try {
            // Ambil konten HTML dari website
            const response = await fetch(page.url);
            if (!response.ok) {
                console.warn(`    - Peringatan: Gagal mengambil halaman ${page.url} (Status: ${response.status})`);
                continue; // Lanjut ke halaman berikutnya jika gagal
            }
            const html = await response.text();
            const $ = cheerio.load(html);

            let textFromPage = '';
            // Loop melalui setiap selector untuk halaman ini
            page.selectors.forEach(selector => {
                const section = $(selector);
                if (section.length > 0) {
                    console.log(`    - Menemukan dan memproses section: ${selector}`);
                    // Ambil semua teks dari elemen <p>, <h2>, <h3>, <h4> di dalam section
                    const textFromSection = section.find('h2, h3, h4, p, blockquote').map((i, el) => $(el).text().trim()).get().join('\n\n');
                    textFromPage += textFromSection + '\n\n';
                } else {
                    console.warn(`    - Peringatan: Section '${selector}' tidak ditemukan di halaman ini.`);
                }
            });

            allText += textFromPage;

        } catch (error) {
            console.error(`    - ❌ TERJADI ERROR saat memproses halaman ${page.url}:`, error);
        }
    }

    // Bersihkan teks dari spasi atau baris baru yang berlebihan
    const cleanedText = allText.replace(/\n\s*\n/g, '\n\n').trim();

    // Tentukan di mana file pengetahuan akan disimpan
    const outputPath = path.join(__dirname, 'api', 'pengetahuan.txt');
    fs.writeFileSync(outputPath, cleanedText, 'utf8');

    console.log(`\n✅ SUKSES! File pengetahuan.txt telah berhasil diperbarui dengan informasi dari semua halaman.`);
    console.log(`Lokasi file: ${outputPath}`);
}

// Jalankan fungsi utama
scrapeAllPages();