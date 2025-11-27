# 🕌 Al-Quran Digital

Web Al-Quran Digital yang profesional dan modern dengan fitur lengkap untuk membaca, mendengar, dan mempelajari Al-Quran dengan mudah.

![Al-Quran Digital](https://img.shields.io/badge/Al--Quran-Digital-1e7b5f?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## ✨ Fitur Utama

### 📖 Membaca Al-Quran
- **114 Surah Lengkap** - Semua surah dalam Al-Quran dengan teks Arab Uthmani
- **Terjemahan Indonesia** - Setiap ayat dilengkapi dengan terjemahan bahasa Indonesia
- **Tampilan Responsif** - Optimal di desktop, tablet, dan mobile

### 🔊 Audio Al-Quran
- **Audio Player Terintegrasi** - Dengarkan bacaan Al-Quran dari Syekh Mishary Alafasy
- **Kontrol Audio Lengkap** - Play, pause, next, previous ayat
- **Progress Bar** - Lihat dan kontrol progress audio
- **Auto Play** - Otomatis melanjutkan ke ayat berikutnya

### 🔍 Pencarian
- **Cari Surah** - Cari surah berdasarkan nama, terjemahan, atau nomor
- **Real-time Search** - Hasil pencarian muncul secara instant

### 🔖 Bookmark
- **Tandai Ayat Favorit** - Simpan ayat-ayat favorit Anda
- **Akses Cepat** - Akses bookmark dengan mudah melalui halaman khusus
- **Penyimpanan Lokal** - Bookmark tersimpan di browser Anda

### 🌓 Dark Mode
- **Mode Gelap & Terang** - Toggle antara tema gelap dan terang
- **Kenyamanan Mata** - Pilih tema sesuai preferensi Anda
- **Auto Save** - Preferensi tema tersimpan otomatis

### 📊 Statistik & Tracking
- **Last Read** - Lihat surah terakhir yang dibaca
- **Bookmark Counter** - Hitung jumlah ayat yang ditandai
- **Reading Progress** - Track progress bacaan Anda

### 📋 Fitur Tambahan
- **Salin Ayat** - Copy ayat dengan mudah untuk dibagikan
- **Toast Notification** - Notifikasi yang informatif dan tidak mengganggu
- **Loading State** - Loading indicator yang smooth
- **Offline Capability** - Data tersimpan untuk akses lebih cepat

## 🚀 Teknologi

- **HTML5** - Struktur semantic dan modern
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **Vanilla JavaScript** - Tanpa framework, performa optimal
- **API Al-Quran Cloud** - Data Al-Quran gratis dan terpercaya
- **Font Awesome** - Icon set yang lengkap
- **Google Fonts** - Amiri (Arab) & Inter (Latin)

## 📦 Struktur Proyek

```
al-quran-digital/
├── index.html          # Halaman utama
├── css/
│   └── style.css      # Styling lengkap dengan dark mode
├── js/
│   └── main.js        # JavaScript untuk semua fitur
└── README.md          # Dokumentasi
```

## 🎯 Cara Menggunakan

### 1. Clone atau Download
```bash
git clone https://github.com/username/al-quran-digital.git
cd al-quran-digital
```

### 2. Buka di Browser
Cukup buka file `index.html` di browser favorit Anda. Tidak perlu instalasi atau setup tambahan!

### 3. Atau Gunakan Live Server
Jika menggunakan VS Code:
```bash
# Install Live Server extension
# Klik kanan pada index.html -> Open with Live Server
```

## 💡 Penggunaan Fitur

### Membaca Surah
1. Pilih surah dari daftar di halaman beranda
2. Scroll untuk membaca ayat demi ayat
3. Teks Arab dan terjemahan ditampilkan bersama

### Mendengarkan Audio
1. Klik tombol **Play Audio** di header surah
2. Gunakan kontrol audio untuk navigasi
3. Audio akan otomatis melanjutkan ke ayat berikutnya

### Menandai Ayat
1. Klik icon **bookmark** pada ayat yang ingin ditandai
2. Akses bookmark melalui menu **Bookmark**
3. Hapus bookmark dengan klik icon **trash**

### Mencari Surah
1. Gunakan search box di halaman beranda
2. Ketik nama surah, terjemahan, atau nomor
3. Hasil akan muncul secara real-time

### Mengubah Tema
1. Klik icon **moon/sun** di header
2. Tema akan berubah dan tersimpan otomatis

## 🌐 API yang Digunakan

Web ini menggunakan [AlQuran Cloud API](https://alquran.cloud/) yang menyediakan:
- Teks Al-Quran dalam berbagai edisi
- Terjemahan dalam berbagai bahasa
- Audio dari berbagai qari terkenal
- Gratis dan tidak memerlukan API key

### Endpoint yang Digunakan:
```javascript
// Daftar Surah
GET https://api.alquran.cloud/v1/surah

// Detail Surah (Arab)
GET https://api.alquran.cloud/v1/surah/{number}/quran-uthmani

// Terjemahan
GET https://api.alquran.cloud/v1/surah/{number}/id.indonesian

// Audio
GET https://api.alquran.cloud/v1/surah/{number}/ar.alafasy
```

## 🎨 Kustomisasi

### Mengubah Warna Tema
Edit CSS variables di `css/style.css`:
```css
:root {
    --primary-color: #1e7b5f;  /* Warna utama */
    --accent-color: #f39c12;   /* Warna aksen */
    /* ... dan lainnya */
}
```

### Mengubah Qari Audio
Edit konstanta di `js/main.js`:
```javascript
// Ganti dengan qari lain
const EDITION_AUDIO = 'ar.alafasy';  // Mishary Alafasy
// const EDITION_AUDIO = 'ar.abdulbasitmurattal';  // Abdul Basit
// const EDITION_AUDIO = 'ar.minshawi';  // Minshawi
```

### Mengubah Terjemahan
```javascript
const EDITION_TRANSLATION = 'id.indonesian';  // Indonesia
// const EDITION_TRANSLATION = 'en.sahih';  // English
```

## 📱 Responsive Design

Web ini fully responsive dengan breakpoint:
- **Desktop**: > 768px - Full featured layout
- **Tablet**: 481px - 768px - Optimized layout
- **Mobile**: < 480px - Mobile-first design

## 🔧 Browser Support

- ✅ Chrome (terbaru)
- ✅ Firefox (terbaru)
- ✅ Safari (terbaru)
- ✅ Edge (terbaru)
- ✅ Opera (terbaru)

## 🚧 Fitur yang Akan Datang

- [ ] Tafsir Al-Quran
- [ ] Asbabun Nuzul (sebab turunnya ayat)
- [ ] Tajwid color-coding
- [ ] Multiple qari selection
- [ ] Download audio untuk offline
- [ ] Sharing ke social media
- [ ] PWA (Progressive Web App)
- [ ] Multi-language support

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository ini
2. Buat branch untuk fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk umat Muslim di seluruh dunia

## 🙏 Credits

- **AlQuran Cloud API** - Data Al-Quran gratis
- **Font Awesome** - Icon set
- **Google Fonts** - Font Amiri & Inter
- **Mishary Alafasy** - Audio Al-Quran

## 📧 Kontak

Jika ada pertanyaan atau saran, silakan buat issue di repository ini.

---

**Jazakumullah Khairan** 🤲

*Semoga web ini bermanfaat dan memudahkan dalam mempelajari Al-Quran*
