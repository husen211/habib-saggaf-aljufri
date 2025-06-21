// File: api/chat.js (Versi BARU dengan Konteks Pengetahuan)

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// === 1. PUSAT PENGETAHUAN AI ===
// Masukkan semua informasi, teks, atau "script" yang kamu ingin AI ketahui di sini.
// Kamu bisa membuatnya sepanjang yang kamu mau. Gunakan ` (backtick) untuk teks multi-baris.
const KONTEKS_PENGETAHUAN = `
Habib Saggaf bin Muhammad Al-Jufri (1937–2021) adalah ulama besar, pemimpin karismatik, dan tokoh sentral dalam pengembangan pendidikan Islam di Indonesia Timur, terutama melalui organisasi Al-Khairaat. Ia dikenal luas karena kepemimpinannya yang visioner, moderat, dan tegas dalam menjaga nilai-nilai keislaman dan kebangsaan.

Kehidupan Awal dan Keluarga
Lahir di Pekalongan, Jawa Tengah, pada 17 Agustus 1937, sebagai anak sulung dari Habib Muhammad bin Idrus Al-Jufri dan Hababah Syarifah Raquan binti Thalib Al-Jufri. Ia adalah cucu dari Habib Idrus bin Salim Al-Jufri (Guru Tua), pendiri Al-Khairaat di Palu, Sulawesi Tengah.

Sejak kecil, Habib Saggaf tumbuh di lingkungan religius, bersekolah di Madrasah Arab Islamiyah Pekalongan, dan aktif dalam kegiatan masjid.

Pada 1951, keluarganya pindah ke Palu untuk membantu Guru Tua mengelola Al-Khairaat. Di Palu, ia melanjutkan pendidikan dasar dan menengah, serta belajar langsung dari kakeknya setiap pagi bersama para santri lain.

Setelah lulus Madrasah Mu’allimin Al-Khairaat pada 1955, ia mengikuti kakeknya dalam rihlah dakwah keliling Sulawesi, belajar tentang kesabaran dan pengabdian masyarakat.

Pendidikan Tinggi dan Pembentukan Karakter
Tahun 1959, Habib Saggaf mendapat beasiswa ke Universitas Al-Azhar, Kairo, Mesir, mengambil jurusan Syari’ah dan meraih gelar sarjana (Lc) pada 1963, lalu magister pada 1967.

Selama di Mesir, ia aktif di Himpunan Pelajar dan Pemuda Indonesia (HPPI) dan bergaul dengan tokoh-tokoh seperti Prof. Quraish Shihab dan KH. Abdurrahman Wahid (Gus Dur).

Usai menyelesaikan studi S2, ia pulang ke Palu pada 1967 untuk mengabdikan ilmunya di tanah air.

Karier, Kepemimpinan, dan Dedikasi di Al-Khairaat
Karier Awal: Sepulang dari Al-Azhar, langsung diamanahi sebagai Dekan Fakultas Ushuluddin IAIN Datokarama Palu (1967–1977).

Sejak 1962, bahkan ketika masih di Mesir, ia sudah dipercaya sebagai Ketua Umum Al-Khairaat, didampingi kerabatnya yang menjalankan tugas harian di tanah air.

Setelah wafatnya ayah beliau pada 1974, Habib Saggaf diangkat menjadi Ketua Utama Al-Khairaat, menjabat selama 47 tahun hingga wafatnya pada 2021. Ia menjadi Ketua Utama terlama dalam sejarah Al-Khairaat.

Sebagai Ketua Utama, ia memiliki wewenang tertinggi, termasuk hak veto untuk menjaga garis perjuangan Al-Khairaat tetap sesuai misi pendirinya.

Selalu memimpin peringatan Haul Guru Tua setiap 12 Syawal di Palu, dihadiri puluhan ribu jamaah Al-Khairaat dari berbagai penjuru.

Sepeninggal beliau, kepemimpinan Al-Khairaat dilanjutkan oleh putranya, Habib Sayyid Alwi bin Saggaf Al-Jufri, terpilih dalam Muktamar Al-Khairaat XI tahun 2023.

Kontribusi Strategis dan Inovasi
1. Pengembangan Pendidikan dan Sosial

Di bawah kepemimpinannya, Al-Khairaat berkembang menjadi salah satu lembaga pendidikan Islam terbesar di Indonesia Timur, dengan lebih dari 2.500 satuan pendidikan dari TK hingga perguruan tinggi, serta lembaga sosial seperti panti asuhan, rumah sakit, klinik kesehatan, radio, dan surat kabar.

Mendorong pendirian cabang-cabang Al-Khairaat hingga ke pelosok, termasuk wilayah mayoritas non-Muslim seperti Kulawi, Sulawesi Tengah, di mana Al-Khairaat berhasil mendirikan belasan madrasah dan mengapresiasi tokoh-tokoh lokal non-Muslim yang membantu menjaga sekolah Al-Khairaat.

Mengedepankan sikap moderat dan toleran, serta menolak keras segala bentuk provokasi dan kekerasan atas nama agama. Ia menegaskan pentingnya menjaga kerukunan lintas agama dan menolak ajakan berkonflik, baik dari internal maupun eksternal umat Islam.

2. Pembinaan Guru dan Santri

Sangat peduli pada kesejahteraan spiritual guru dan santri, menanamkan keikhlasan dan pentingnya ilmu pengetahuan, serta memotivasi mereka agar tetap sabar dan tabah dalam mengabdi, walau di pelosok dengan honor kecil.

Mengutip hadis Rasulullah ﷺ bahwa bahkan semut dan ikan turut mendoakan kebaikan bagi orang yang mengajarkan ilmu yang baik. Ia menegaskan profesi guru adalah kelanjutan tugas para nabi dan menekankan pentingnya ilmu bagi kejayaan dunia dan akhirat.

3. Kepemimpinan Sosial dan Keteladanan

Aktif terjun ke masyarakat, memenuhi undangan warga untuk memimpin zikir, tablig akbar, maulid, dan tahlilan di berbagai daerah, serta menjadi rujukan utama masyarakat dalam hal keagamaan.

Menjawab berbagai persoalan umat melalui rubrik tanya jawab di harian Media Alkhairaat, yang kemudian dibukukan menjadi “Soal Jawab tentang Umat dan Masalahnya” dalam dua jilid.

Tegas menentang paham ekstremisme dan kekerasan, seperti aksi teror bom bunuh diri, yang ia sebut sebagai tindakan bodoh, haram, dan sangat berdosa.

4. Peran di Luar Al-Khairaat

Pernah menjadi Ketua Majelis Ulama Indonesia (MUI) Provinsi Sulawesi Tengah pertama pada 1977 dan memimpin Gerakan Usaha Pembaharuan Pendidikan Islam (GUPPI) Sulawesi Tengah, namun memilih fokus penuh pada Al-Khairaat.

Sukses membawa Al-Khairaat melewati berbagai tantangan zaman, dari krisis ekonomi, dinamika politik, hingga modernisasi kurikulum, dengan menjaga keseimbangan antara nilai tradisional pesantren dan tuntutan sistem pendidikan modern.

Pesantren Al-Khairaat Madinatul Ilmi Dolo
Didirikan pada 1992 di Desa Kotarindau, Dolo, Sigi, Sulawesi Tengah, sekitar 12 km dari Palu. Pesantren ini dikelola oleh keluarga beliau, dengan putrinya Dr. Mufidah Al-Jufri sebagai pengasuh.

Habib Saggaf rutin mengunjungi dan mengajar di pesantren ini setiap pekan, menggunakan metode halaqah (rawha) di masjid pesantren, membahas kitab kuning dan berbagai disiplin ilmu Islam seperti fikih, akidah, akhlak, tasawuf, nahwu-sharaf, tafsir, dan hadits.

Pesantren ini menjadi pusat pembinaan tidak hanya bagi santri mukim, tapi juga pusat pencerahan bagi masyarakat sekitar. Setelah wafatnya, haul beliau rutin dipusatkan di Ponpes Dolo, dihadiri ribuan jamaah sebagai wujud penghormatan dan kecintaan terhadap beliau.

Kehidupan Pribadi dan Wafat
Menikah tiga kali: Syarifah Ruqayah Al-Jufri (1967), Syarifah Zahrah binti Yahya (1971), dan Syarifah Umnah Ar-Rumi. Memiliki tujuh anak, di antaranya Habib Alwi bin Saggaf Al-Jufri dan Dr. Mufidah Al-Jufri.

Wafat pada 3 Agustus 2021 di Palu pada usia 83 tahun, dimakamkan di kompleks Masjid Al-Khairaat Jalan SIS Al-Jufri, Palu, bersebelahan dengan makam adiknya Habib Abdillah Al-Jufri. Ribuan warga, ulama, serta pejabat menghadiri pemakamannya.

Pesan terakhirnya yang menggugah: “Alkhairaat, hidupkan Alkhairaat, jaga Alkhairaat”.

Warisan Intelektual dan Karya Tulis
Meninggalkan sejumlah karya tulis, di antaranya buku “Soal Jawab tentang Umat dan Masalahnya” (dua jilid), berisi kumpulan nasihat dan fatwa keagamaan yang menjawab persoalan umat di berbagai bidang.

Tulisannya banyak dijadikan rujukan oleh masyarakat dan santri Al-Khairaat, serta menjadi sumber inspirasi bagi generasi penerus.

Kesimpulan
Habib Saggaf bin Muhammad Al-Jufri adalah figur sentral yang tidak hanya mewarisi, tetapi juga membesarkan dan memodernisasi Al-Khairaat sebagai pusat pendidikan, dakwah, dan sosial keumatan. Ia dikenal karena integritas, kepemimpinan visioner, sikap moderat, serta komitmen pada kerukunan dan pengembangan ilmu. Warisannya hidup dalam ribuan lembaga pendidikan, karya tulis, serta generasi penerus yang terus menjaga dan mengembangkan nilai-nilai Al-Khairaat di Indonesia Timur dan Nusantara
`;

// === 2. ATUR PERAN DAN PERINTAH UNTUK AI ===
const SYSTEM_INSTRUCTION = `
Anda adalah asisten AI yang berdedikasi untuk menjawab pertanyaan seputar pemikiran dan biografi Habib Saggaf Aljufri.
Gunakan HANYA informasi dari "KONTEKS PENGETAHUAN" yang diberikan untuk menyusun jawabanmu.
JANGAN menggunakan pengetahuan umum di luar konteks tersebut.
Jika pertanyaan pengguna tidak relevan atau tidak bisa dijawab dari konteks yang ada, jawab dengan sopan: "Maaf, saya hanya bisa menjawab pertanyaan yang berkaitan dengan pemikiran Habib Saggaf Aljufri berdasarkan informasi yang saya miliki."
Selalu jawab dengan gaya bahasa yang sopan dan menghormati.
`;


// --- Bagian teknis server (tidak perlu banyak diubah) ---

app.use(express.json());

const allowedOrigins = [
    'https://nama-domain-kamu.com', // GANTI DENGAN DOMAIN ASLI KAMU
    'http://localhost:5500' 
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.post('/api/chat', async (req, res) => {
  try {
    const { chatHistory } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "API Key tidak dikonfigurasi di server." });
    }

    // === 3. MENGGABUNGKAN PERINTAH, KONTEKS, DAN PERTANYAAN PENGGUNA ===
    // Kita membuat prompt baru yang lengkap setiap kali ada pertanyaan
    const fullPrompt = `
      ${SYSTEM_INSTRUCTION}

      ---
      KONTEKS PENGETAHUAN:
      ${KONTEKS_PENGETAHUAN}
      ---

      Berikut adalah riwayat percakapan sejauh ini (jika ada):
      ${JSON.stringify(chatHistory.slice(0, -1))}

      Pertanyaan terbaru dari pengguna adalah:
      ${chatHistory[chatHistory.length - 1].parts[0].text}
    `;

    // Kita menyusun ulang 'contents' untuk dikirim ke Google
    const modifiedHistory = [
        // Pesan pertama adalah prompt lengkap kita
        {
            role: "user",
            parts: [{ text: fullPrompt }]
        },
        // Kita bisa tambahkan pesan 'model' untuk 'mengarahkan' AI
        {
            role: "model",
            parts: [{ text: "Baik, saya mengerti. Saya akan menjawab berdasarkan informasi yang diberikan."}]
        }
    ];

    const payload = { contents: modifiedHistory }; // Menggunakan history yang sudah dimodifikasi
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await apiResponse.json();

    // Cek jika ada teks yang diblokir atau error dari API
    if (!data.candidates || data.candidates.length === 0) {
        console.warn("API response blocked or empty:", data);
        const blockReason = data.promptFeedback?.blockReason || 'Tidak ada respons kandidat';
        return res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: `Maaf, pertanyaan Anda tidak dapat diproses saat ini. (${blockReason})` }]
                }
            }]
        });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("Error di endpoint /api/chat:", error);
    res.status(500).json({ message: "Terjadi kesalahan internal." });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});