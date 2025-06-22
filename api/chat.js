// File: api/chat.js (Versi FINAL yang Paling Andal)

const express = require('express');
const cors =require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// === 1. BACA SELURUH PENGETAHUAN DARI FILE SEKALI SAAT SERVER DIMULAI ===
const pengetahuanPath = path.join(__dirname, 'pengetahuan.txt');
const SELURUH_PENGETAHUAN = fs.readFileSync(pengetahuanPath, 'utf8');

// === 2. INSTRUKSI UTAMA UNTUK AI ===
// Instruksi ini digabung dengan seluruh pengetahuan kita.
const SYSTEM_INSTRUCTION = `
Anda adalah seorang asisten AI yang berpengetahuan, sopan, dan berdedikasi untuk membahas kehidupan dan pemikiran Habib Saggaf Aljufri.
TUGAS UTAMA ANDA: Jawab pertanyaan pengguna HANYA berdasarkan informasi yang ada di dalam "SUMBER PENGETAHUAN" di bawah ini. Jangan pernah menggunakan pengetahuan eksternal tapi kamu boleh membuat kesimpulann sendiri untuk berdiskusi mengenai pemahaman beliau.

Jika pertanyaan pengguna bisa dijawab dari sumber, berikan jawaban yang jelas dan langsung.
Jika pertanyaan pengguna TIDAK BISA dijawab dari sumber, katakan dengan sopan: "Maaf, informasi spesifik mengenai hal tersebut tidak terdapat dalam data yang saya miliki."

---
SUMBER PENGETAHUAN:
${SELURUH_PENGETAHUAN}
---
`;

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
        
        // Kirim chat history dan instruksi sistem yang sudah berisi semua pengetahuan
        const payload = {
            contents: chatHistory,
            systemInstruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
            }
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