# S2Moments - Landing Page Undangan Digital Premium

Landing page undangan digital premium dengan desain responsive, SEO-friendly, dan mudah diedit.

## 🌟 Fitur Utama

- ✅ **SEO Optimized** - Meta tags lengkap, structured data, Open Graph
- ✅ **Fully Responsive** - Desktop, Tablet, Mobile (Android & iOS)
- ✅ **Fast Loading** - Optimized assets dan lazy loading
- ✅ **Easy to Edit** - Struktur data katalog yang terorganisir
- ✅ **Modern Design** - UI/UX yang clean dan elegan
- ✅ **Interactive** - Smooth animations dan transitions
- ✅ **Accessible** - Keyboard navigation dan ARIA labels

## 📁 Struktur File

```
demo/
├── index.html          # File HTML utama
├── css/
│   └── style.css       # Styling responsive
├── js/
│   ├── catalog-data.js # Data katalog (MUDAH DIEDIT!)
│   └── main.js         # JavaScript interaktivity
└── README.md           # Dokumentasi
```

## 🎨 Cara Mengedit Katalog

### 1. Buka File `js/catalog-data.js`

File ini berisi semua data katalog tema yang terstruktur dengan baik.

### 2. Format Data Tema

Setiap tema memiliki format:
```javascript
{
    name: "Nama Tema",
    image: "URL Gambar",
    demo: "URL Demo"
}
```

### 3. Menambah Tema Baru

Contoh menambah tema Luxee baru:

```javascript
// Di dalam catalogData.wedding.luxee array
luxee: [
    // ... tema existing
    {
        name: "Luxee 18",
        image: "https://example.com/image.webp",
        demo: "https://example.com/demo/"
    }
]
```

### 4. Menghapus Tema

Hapus objek tema yang tidak diinginkan:

```javascript
// SEBELUM
luxee: [
    { name: "Luxee 01", image: "...", demo: "..." },
    { name: "Luxee 02", image: "...", demo: "..." }, // Hapus ini
    { name: "Luxee 03", image: "...", demo: "..." }
]

// SETELAH
luxee: [
    { name: "Luxee 01", image: "...", demo: "..." },
    { name: "Luxee 03", image: "...", demo: "..." }
]
```

### 5. Mengedit Tema

Ubah nilai `name`, `image`, atau `demo`:

```javascript
{
    name: "Luxee 01 - UPDATED", // Ubah nama
    image: "https://new-image-url.com/image.webp", // Ubah gambar
    demo: "https://new-demo-url.com/" // Ubah link demo
}
```

## 📝 Mengedit Konten Lainnya

### Testimoni
Edit langsung di `index.html`, cari section `testimonials`:
```html
<div class="testimonial-card">
    <div class="testimonial-header">
        <img src="URL_AVATAR" alt="Nama">
        <div class="testimonial-info">
            <h4>Nama Lengkap</h4>
            <!-- Rating tetap 5 bintang -->
        </div>
    </div>
    <p class="testimonial-text">
        "Testimoni di sini..."
    </p>
</div>
```

### FAQ
Edit langsung di `index.html`, cari section `faq`:
```html
<div class="faq-item">
    <button class="faq-question">
        <span>Pertanyaan?</span>
        <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
        <p>Jawaban di sini...</p>
    </div>
</div>
```

### Kontak
Edit di `index.html`, cari section `contact`:
```html
<a href="https://wa.me/NOMOR_BARU" target="_blank">+62 XXX-XXXX-XXXX</a>
<a href="mailto:EMAIL_BARU">EMAIL_BARU</a>
```

## 🎯 Mengganti Warna Brand

Edit di `css/style.css`, cari `:root`:
```css
:root {
    --brand-gold: #D4AF37;        /* Warna utama */
    --brand-gold-light: #E8D4A8;  /* Warna terang */
    --brand-gold-dark: #B8941F;   /* Warna gelap */
}
```

## 📱 Testing Responsive

### Desktop
- Buka di browser (Chrome, Firefox, Safari)
- Lebar minimum: 1200px

### Tablet
- Gunakan Chrome DevTools (F12)
- Pilih device: iPad, iPad Pro
- Lebar: 768px - 992px

### Mobile
- Gunakan Chrome DevTools (F12)
- Pilih device: iPhone, Samsung Galaxy
- Lebar: 320px - 767px

### iOS Specific
- Testing di Safari (Mac) dengan iOS Simulator
- Atau langsung di iPhone/iPad

## 🚀 Cara Deploy

### 1. Hosting Sederhana
Upload semua file ke hosting (cPanel, FTP):
- Pastikan struktur folder tetap sama
- Upload ke public_html atau root directory

### 2. GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

Aktifkan GitHub Pages di Settings > Pages

### 3. Netlify / Vercel
- Drag & drop folder `demo` ke Netlify/Vercel
- Atau connect dengan GitHub repository

## 🔧 Optimasi Performance

### 1. Kompress Gambar
- Gunakan TinyPNG atau ImageOptim
- Format WebP untuk gambar modern
- Ukuran maksimal: 200KB per gambar

### 2. Minify CSS & JS
```bash
# Install terlebih dahulu
npm install -g csso-cli uglify-js

# Minify CSS
csso css/style.css -o css/style.min.css

# Minify JS
uglifyjs js/main.js -o js/main.min.js
uglifyjs js/catalog-data.js -o js/catalog-data.min.js
```

Lalu update di `index.html`:
```html
<link rel="stylesheet" href="css/style.min.css">
<script src="js/catalog-data.min.js"></script>
<script src="js/main.min.js"></script>
```

### 3. Enable Caching
Tambahkan `.htaccess` untuk Apache hosting:
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 📊 SEO Checklist

- ✅ Meta title dan description
- ✅ Open Graph tags (Facebook, WhatsApp)
- ✅ Twitter Card tags
- ✅ Structured Data (JSON-LD)
- ✅ Canonical URL
- ✅ Alt text pada gambar
- ✅ Semantic HTML (h1, h2, section)
- ✅ Mobile-friendly
- ✅ Fast loading speed

## 🐛 Troubleshooting

### Katalog tidak muncul
1. Periksa console browser (F12)
2. Pastikan `catalog-data.js` loaded
3. Cek syntax JavaScript (koma, kurung kurawal)

### Mobile menu tidak berfungsi
1. Pastikan `main.js` loaded dengan benar
2. Cek console untuk error JavaScript

### Gambar tidak loading
1. Periksa URL gambar valid
2. Pastikan CORS enabled di server gambar
3. Gunakan `https://` bukan `http://`

### Stats tidak animasi
1. Scroll ke section hero
2. Reload halaman
3. Pastikan JavaScript tidak error

## 📞 Support

Jika ada pertanyaan atau masalah:
- Email: admin@s2moments.id
- WhatsApp: +62 812-1111-4522

## 📄 License

© 2025 S2Moments. All rights reserved.

---

**Dibuat dengan ❤️ untuk S2Moments**

**Versi:** 1.0.0
**Terakhir Update:** November 2025
