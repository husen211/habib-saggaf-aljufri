// File: api/chat.js (Versi FINAL dengan Logika Pencarian yang Ditingkatkan)

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js');

const app = express();
const port = process.env.PORT || 3000;

// === 1. BACA PENGETAHUAN DARI FILE ===
const pengetahuanPath = path.join(__dirname, 'pengetahuan.txt');
const SELURUH_PENGETAHUAN = fs.readFileSync(pengetahuanPath, 'utf8');
const PENGETAHUAN_PER_PARAGRAF = SELURUH_PENGETAHUAN.split(/\n\s*\n/)
    .filter(p => p.trim() !== '')
    .map((p, index) => ({ id: index, content: p }));

// === 2. PENGATURAN FUSE.JS YANG JAUH LEBIH BAIK ===
const fuseOptions = {
    includeScore: true,
    keys: ['content'],
    minMatchCharLength: 3,
    threshold: 0.5, // Dibuat lebih longgar
    distance: 1000, // Menambah bobot pada kecocokan kata kunci
    ignoreLocation: true,
};
const fuse = new Fuse(PENGETAHUAN_PER_PARAGRAF, fuseOptions);

// === 3. INSTRUKSI SISTEM (TETAP SAMA) ===
const SYSTEM_INSTRUCTION = `
Anda adalah "Pemandu Jejak Digital", seorang asisten AI yang berpengetahuan, sopan, dan berdedikasi untuk membahas kehidupan dan pemikiran Habib Saggaf Aljufri. Sumber utamamu adalah teks yang diberikan dalam "KONTEKS YANG DIBERIKAN".
ATURAN UTAMA:
1. Jika ada konteks, JANGAN bertanya lagi untuk mempersempit. Langsung jawab pertanyaan pengguna sebaik mungkin berdasarkan konteks yang ada. Setelah menjawab, Anda BOLEH menawarkan untuk mendalami topik lebih lanjut.
2. Jika tidak ada konteks SAMA SEKALI, barulah Anda masuk ke mode pemandu. Berikan saran topik umum yang Anda tahu ada di dalam data.
3. JANGAN pernah mengarang fakta. Semua jawaban harus berakar dari "KONTEKS YANG DIBERIKAN".
`;

// === 4. DAFTAR KATA-KATA UMUM UNTUK DIABAIKAN (STOP WORDS) ===
const stopWords = new Set(['di', 'ke', 'dari', 'dan', 'atau', 'tapi', 'jika', 'maka', 'dengan', 'untuk', 'pada', 'seperti', 'yang', 'ini', 'itu', 'adalah', 'yaitu', 'dalam', 'saja', 'juga', 'lalu', 'hanya', 'sangat', 'apa', 'siapa', 'kapan', 'dimana', 'bagaimana', 'mengapa', 'beliau', 'saya', 'anda', 'gua', 'mau', 'coba', 'jelaskan', 'tentang', 'apakah']);


// --- Bagian teknis server ---
app.use(express.json());
const allowedOrigins = ['https://www.jejakhabibsaggaf.com', 'https://jejakhabibsaggaf.com', 'http://localhost:5500'];
app.use(cors({ origin: function (origin, callback) { if (!origin || allowedOrigins.indexOf(origin) !== -1) { callback(null, true); } else { callback(new Error('Not allowed by CORS')); } } }));

app.post('/api/chat', async (req, res) => {
    try {
        const { chatHistory } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: "API Key tidak dikonfigurasi di server." });
        }

        const pertanyaanTerakhir = chatHistory[chatHistory.length - 1].parts[0].text;
        
        // === 5. LOGIKA PENCARIAN BARU YANG LEBIH CERDAS ===
        // 5.1. Bersihkan pertanyaan dari kata-kata umum (stop words)
        const kataKunciPenting = pertanyaanTerakhir
            .toLowerCase()
            .split(/\s+/)
            .filter(kata => !stopWords.has(kata) && kata.length > 2)
            .join(' '); // Gabungkan kembali kata kunci penting

        // 5.2. Lakukan pencarian dengan kata kunci yang sudah bersih
        const hasilPencarian = fuse.search(kataKunciPenting || pertanyaanTerakhir); // Jika tidak ada kata kunci, cari dengan pertanyaan asli
        
        // 5.3. Ambil hingga 4 paragraf paling relevan
        const konteksRelevan = hasilPencarian
            .slice(0, 4)
            .map(result => result.item.content)
            .join("\n\n");

        const fullPrompt = `
          KONTEKS YANG DIBERIKAN:
          ---
          ${konteksRelevan || ""}
          ---
          Berdasarkan konteks di atas, jawab pertanyaan pengguna berikut: "${pertanyaanTerakhir}"
        `;
        
        const contents = [
            ...chatHistory.slice(0, -1),
            { role: "user", parts: [{ text: fullPrompt }] }
        ];

        const payload = { 
            contents: contents,
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] }
        };

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