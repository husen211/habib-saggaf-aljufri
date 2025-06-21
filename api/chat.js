// File: api/chat.js (Versi SANGAT CERDAS dengan Fuse.js untuk anti-typo)

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js'); // <-- Panggil Pustakawan Profesional kita

const app = express();
const port = process.env.PORT || 3000;

// === 1. BACA PENGETAHUAN DARI FILE ===
const pengetahuanPath = path.join(__dirname, 'pengetahuan.txt');
const SELURUH_PENGETAHUAN = fs.readFileSync(pengetahuanPath, 'utf8');
const PENGETAHUAN_PER_PARAGRAF = SELURUH_PENGETAHUAN.split(/\n\s*\n/)
    .filter(p => p.trim() !== '')
    .map((p, index) => ({ id: index, content: p })); // Beri struktur pada data

// === 2. SIAPKAN PUSTAKAWAN PROFESIONAL (FUSE.JS) ===
const fuseOptions = {
    includeScore: true,     // Sertakan skor relevansi
    keys: ['content'],      // Cari di dalam field 'content'
    threshold: 0.4,         // Tingkat toleransi (0.0 = sempurna, 1.0 = super kabur)
    ignoreLocation: true,   // Cari di seluruh teks, bukan hanya di awal
};
const fuse = new Fuse(PENGETAHUAN_PER_PARAGRAF, fuseOptions);

// === 3. ATUR PERAN DAN PERINTAH UNTUK AI ===
const SYSTEM_INSTRUCTION = `
Anda adalah "Pemandu Jejak Digital", seorang asisten AI yang berpengetahuan luas, sopan, dan berdedikasi untuk membahas kehidupan dan pemikiran Habib Saggaf Aljufri. Sumber utamamu adalah teks yang diberikan dalam "KONTEKS YANG DIBERIKAN".

Tugasmu memiliki DUA mode:

1.  **MODE JAWAB FAKTA (Jika ada konteks relevan):**
    * Jika pengguna bertanya sesuatu yang spesifik DAN "KONTEKS YANG DIBERIKAN" berisi informasi yang relevan, jawab pertanyaan tersebut secara langsung dan akurat berdasarkan HANYA pada konteks itu.
    * Jangan pernah menambah informasi dari luar konteks yang diberikan.

2.  **MODE PEMANDU DISKUSI (Jika tidak ada konteks atau pertanyaan umum):**
    * Jika "KONTEKS YANG DIBERIKAN" kosong, ATAU jika pertanyaan pengguna bersifat sangat umum (contoh: "halo", "ceritakan tentang beliau", "saya ingin berdiskusi"), JANGAN langsung berkata "saya tidak menemukan informasi".
    * Sebaliknya, bersikaplah proaktif dan ramah. Lakukan salah satu dari ini:
        * **Ajak lebih spesifik:** Jika pengguna bilang "saya ingin berdiskusi tentang pemikiran beliau", jawab dengan ramah seperti: "Tentu, saya siap membantu. Ada topik spesifik dari pemikiran beliau yang ingin Anda diskusikan? Misalnya tentang moderasi beragama, pendidikan, atau nasihat kebangsaan beliau?"
        * **Berikan saran topik:** "Anda bisa bertanya tentang masa kecilnya, pendidikannya di Al-Azhar, perannya di Alkhairaat, atau testimoni para tokoh tentang beliau."
        * **Jawab sapaan:** Jika pengguna menyapa, balas sapaannya dengan ramah.

ATURAN UTAMA: Selalu berikan jawaban yang terkesan alami dan membantu. Tujuan utamamu adalah memandu pengguna untuk menjelajahi informasi yang ada dengan cara yang menyenangkan.
`;
// --- Bagian teknis server (tetap sama) ---
app.use(express.json());

const allowedOrigins = [
    'https://www.jejakhabibsaggaf.com',
    'https://jejakhabibsaggaf.com',
    'http://localhost:5500' 
];
// ... Logika CORS tetap sama ...
app.use(cors({ origin: function (origin, callback) { if (!origin || allowedOrigins.indexOf(origin) !== -1) { callback(null, true); } else { callback(new Error('Not allowed by CORS')); } } }));

app.post('/api/chat', async (req, res) => {
    try {
        const { chatHistory } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: "API Key tidak dikonfigurasi di server." });
        }

        // === 4. GUNAKAN FUSE.JS UNTUK MENCARI KONTEKS ANTI-TYPO ===
        const pertanyaanTerakhir = chatHistory[chatHistory.length - 1].parts[0].text;
        
        // Fuse.js akan mencari paragraf yang paling cocok, bahkan jika ada typo
        const hasilPencarian = fuse.search(pertanyaanTerakhir);

        // Ambil 3 paragraf paling relevan dari hasil pencarian
        const konteksRelevan = hasilPencarian
            .slice(0, 3)
            .map(result => result.item.content)
            .join("\n\n");

        const fullPrompt = `
          ${SYSTEM_INSTRUCTION}

          ---
          KONTEKS YANG DIBERIKAN:
          ${konteksRelevan || "Tidak ada konteks yang relevan ditemukan."}
          ---

          Pertanyaan dari pengguna adalah:
          "${pertanyaanTerakhir}"
        `;

        const payload = { contents: [{ role: "user", parts: [{ text: fullPrompt }] }] };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await apiResponse.json();
        res.status(200).json(data);

    } catch (error) {
        console.error("Error di endpoint /api/chat:", error);
        res.status(500).json({ message: "Terjadi kesalahan internal." });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});