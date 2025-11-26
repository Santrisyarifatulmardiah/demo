# 📝 Cara Mengedit Harga Tema

## Struktur Harga per Kategori

Setiap tema sekarang memiliki harga yang dapat dikustomisasi sesuai kategorinya. Berikut harga default per kategori:

### Wedding Themes
- **Luxee & Adat** (Premium): Rp 500.000 → Rp 150.000
- **Floral & Watercolor** (Mid-range): Rp 400.000 → Rp 120.000
- **Minimalist** (Standard): Rp 350.000 → Rp 100.000

### Non-Wedding Themes
- **Semua kategori**: Rp 300.000 → Rp 90.000

## 📌 Cara Mengedit Harga

### 1. Buka File Data Tema
```bash
/home/user/demo/js/catalog-data.js
```

### 2. Cari Tema yang Ingin Diedit

Contoh struktur tema:
```javascript
{
    name: "Luxee 01",
    image: "https://...",
    demo: "https://...",
    priceOriginal: 500000,  // Harga asli (dicoret)
    priceCurrent: 150000    // Harga promo (ditampilkan besar)
}
```

### 3. Edit Harga

**Contoh 1: Mengubah harga tema Luxee 01**
```javascript
// SEBELUM
{ name: "Luxee 01", ..., priceOriginal: 500000, priceCurrent: 150000 }

// SESUDAH (misalnya ingin promo lebih besar)
{ name: "Luxee 01", ..., priceOriginal: 500000, priceCurrent: 99000 }
```

**Contoh 2: Mengubah harga untuk kategori tertentu**

Misalnya, semua tema Floral dinaikkan menjadi Rp 450.000 → Rp 135.000:

```javascript
// TEMA FLORAL - Mid-Range Package
floral: [
    { name: "Luxee Floral - 01", image: "...", demo: "...", priceOriginal: 450000, priceCurrent: 135000 },
    { name: "Luxee Floral - 03", image: "...", demo: "...", priceOriginal: 450000, priceCurrent: 135000 },
    // ... dan seterusnya
]
```

### 4. Format Harga

⚠️ **PENTING:**
- Tulis harga dalam format **ANGKA** saja (tanpa "Rp" atau pemisah ribuan)
- ✅ Benar: `priceOriginal: 500000`
- ❌ Salah: `priceOriginal: "Rp 500.000"`

Sistem akan otomatis memformat angka menjadi format Rupiah dengan pemisah ribuan.

## 🎯 Tips Edit Harga

### Edit Satu Tema Saja
```javascript
// Cari nama tema yang diinginkan, lalu edit harganya
{ name: "Adat - Minang", ..., priceOriginal: 600000, priceCurrent: 180000 }
```

### Edit Semua Tema dalam Satu Kategori
Gunakan Find & Replace (Ctrl+H) di text editor:
- Find: `priceOriginal: 400000, priceCurrent: 120000`
- Replace: `priceOriginal: 450000, priceCurrent: 135000`

### Membuat Harga Khusus untuk Tema Tertentu
```javascript
// Tema premium special edition
{ name: "Luxee 01", ..., priceOriginal: 750000, priceCurrent: 200000 }

// Tema murah untuk promo
{ name: "Luxee 02", ..., priceOriginal: 500000, priceCurrent: 50000 }
```

## 🔍 Lokasi Kategori di File

Di file `catalog-data.js`, kategori diorganisir sebagai berikut:

```
├── wedding
│   ├── luxee (line ~24)
│   ├── adat (line ~45)
│   ├── floral (line ~60)
│   ├── watercolor (line ~72)
│   └── minimalist (line ~80)
└── nonWedding
    ├── engagement (line ~101)
    ├── anniversary (line ~109)
    ├── aqiqah (line ~115)
    ├── khitan (line ~121)
    ├── birthday (line ~128)
    └── others (line ~136)
```

## 📊 Contoh Use Cases

### Use Case 1: Flash Sale
Semua tema wedding diskon jadi Rp 50.000:
```javascript
{ name: "Luxee 01", ..., priceOriginal: 500000, priceCurrent: 50000 }
```

### Use Case 2: Paket Premium Naik Harga
Luxee dan Adat jadi Rp 600.000 → Rp 180.000:
```javascript
{ name: "Luxee 01", ..., priceOriginal: 600000, priceCurrent: 180000 }
{ name: "Adat - Minang", ..., priceOriginal: 600000, priceCurrent: 180000 }
```

### Use Case 3: Tema Tanpa Diskon
Hilangkan kesan diskon dengan harga sama:
```javascript
{ name: "Luxee 01", ..., priceOriginal: 150000, priceCurrent: 150000 }
```

## 📂 File-File Terkait

- **Data Tema**: `/js/catalog-data.js` - Edit harga di sini
- **Render Logic**: `/js/main.js` - Fungsi `formatPrice()` dan `renderThemes()`
- **Styling**: `/css/style.css` - Style untuk tampilan harga

## ✅ Verifikasi Perubahan

Setelah edit harga:
1. Simpan file `catalog-data.js`
2. Refresh browser (Ctrl+F5)
3. Periksa harga di website

---

**Total Tema**: 81 tema
**Semua tema**: Sudah memiliki harga yang dapat diedit

Jika ada pertanyaan, hubungi developer atau lihat commit: `e9c8916`
