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
Anda adalah asisten AI yang berdedikasi untuk menjawab pertanyaan seputar pemikiran dan biografi Habib Saggaf Aljufri.
Gunakan HANYA informasi dari "KONTEKS YANG DIBERIKAN" untuk menyusun jawabanmu.
JANGAN menggunakan pengetahuan umum di luar konteks tersebut.
Jika konteks yang diberikan kosong, jawab dengan sopan: "Maaf, saya tidak menemukan informasi yang relevan mengenai hal tersebut dalam data saya."
Selalu jawab dengan gaya bahasa yang sopan dan menghormati.
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