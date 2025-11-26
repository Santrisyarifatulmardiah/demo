// ========================================
// CATALOG DATA - MUDAH DIEDIT
// ========================================
// Untuk menambah/menghapus/mengedit tema:
// 1. Cari kategori yang sesuai (luxee, adat, floral, dll)
// 2. Tambah/hapus/edit objek tema dengan format:
//    { name: "Nama Tema", image: "URL Gambar", demo: "URL Demo" }
// ========================================

const catalogData = {
    // ====================================
    // WEDDING CATALOG
    // ====================================
    wedding: {
        // TEMA LUXEE
        luxee: [
            { name: "Luxee 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1001.webp", demo: "https://luxee.net/premium/tema-01/" },
            { name: "Luxee 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1005.webp", demo: "https://luxee.net/premium/tema-05/" },
            { name: "Luxee 03", image: "https://s2moments.id/wp-content/uploads/2025/11/1007.webp", demo: "https://luxee.net/premium/tema-07/" },
            { name: "Luxee 04", image: "https://s2moments.id/wp-content/uploads/2025/11/1002.webp", demo: "https://luxee.net/premium/tema-02/" },
            { name: "Luxee 05", image: "https://s2moments.id/wp-content/uploads/2025/11/1003.webp", demo: "https://luxee.net/premium/tema-03/" },
            { name: "Luxee 06", image: "https://s2moments.id/wp-content/uploads/2025/11/1004.webp", demo: "https://luxee.net/premium/tema-04/" },
            { name: "Luxee 07", image: "https://s2moments.id/wp-content/uploads/2025/11/1006.webp", demo: "https://luxee.net/premium/tema-06/" },
            { name: "Luxee 08", image: "https://s2moments.id/wp-content/uploads/2025/11/1008.webp", demo: "https://luxee.net/premium/tema-08/" },
            { name: "Luxee 09", image: "https://s2moments.id/wp-content/uploads/2025/11/1009.webp", demo: "https://luxee.net/premium/tema-09/" },
            { name: "Luxee 10", image: "https://s2moments.id/wp-content/uploads/2025/11/1010.webp", demo: "https://luxee.net/premium/tema-10/" },
            { name: "Luxee 11", image: "https://s2moments.id/wp-content/uploads/2025/11/1011.webp", demo: "https://luxee.net/premium/tema-11/" },
            { name: "Luxee 12", image: "https://s2moments.id/wp-content/uploads/2025/11/1012.webp", demo: "https://luxee.net/premium/tema-12/" },
            { name: "Luxee 13", image: "https://s2moments.id/wp-content/uploads/2025/11/1013.webp", demo: "https://luxee.net/premium/tema-13/" },
            { name: "Luxee 14", image: "https://s2moments.id/wp-content/uploads/2025/11/1014.webp", demo: "https://luxee.net/premium/tema-14/" },
            { name: "Luxee 15", image: "https://s2moments.id/wp-content/uploads/2025/11/1015.webp", demo: "https://luxee.net/premium/tema-15/" },
            { name: "Luxee 16", image: "https://s2moments.id/wp-content/uploads/2025/11/1016.webp", demo: "https://luxee.net/premium/tema-16/" },
            { name: "Luxee 17", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee-premium-17.png", demo: "https://luxee.net/premium/tema-17/" }
        ],

        // TEMA ADAT
        adat: [
            { name: "Adat - Minang", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minang.webp", demo: "https://luxee.net/premium/adat-minang/" },
            { name: "Adat - Bali", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Bali.webp", demo: "https://luxee.net/premium/adat-bali/" },
            { name: "Adat - Jawa", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Jawa.webp", demo: "https://luxee.net/premium/adat-jawa/" },
            { name: "Adat - Jawa (Batik)", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Jawa_Batik.webp", demo: "https://luxee.net/premium/adat-jawa-batik/" },
            { name: "Adat - Sunda", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Sunda.webp", demo: "https://luxee.net/premium/adat-sunda/" },
            { name: "Adat - Batak", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Batak.webp", demo: "https://luxee.net/premium/adat-batak/" },
            { name: "Adat - Banjar", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Banjar.webp", demo: "https://luxee.net/premium/adat-banjar/" },
            { name: "Adat - Betawi", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Betawi.webp", demo: "https://luxee.net/premium/adat-betawi/" },
            { name: "Adat - Bugis", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Bugis.webp", demo: "https://luxee.net/premium/adat-bugis/" },
            { name: "Adat - Kalimantan", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Kalimantan.webp", demo: "https://luxee.net/premium/adat-kalimantan/" },
            { name: "Adat - Papua", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Papua.webp", demo: "https://luxee.net/premium/adat-papua/" }
        ],

        // TEMA FLORAL
        floral: [
            { name: "Luxee Floral - 01", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-01.jpg", demo: "https://luxee.net/tema/demo-floral-01/" },
            { name: "Luxee Floral - 03", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-03.jpg", demo: "https://luxee.net/tema/demo-floral-03/" },
            { name: "Luxee Floral - 05", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-05.jpg", demo: "https://luxee.net/tema/demo-floral-05/" },
            { name: "Luxee Floral - 06", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-06.jpg", demo: "https://luxee.net/tema/demo-floral-06/" },
            { name: "Luxee Floral - 07", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-07.jpg", demo: "https://luxee.net/tema/demo-floral-07/" },
            { name: "Luxee Floral - 08", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-08.jpg", demo: "https://luxee.net/tema/demo-floral-08/" },
            { name: "Luxee Floral - 09", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-09.jpg", demo: "https://luxee.net/tema/demo-floral-09/" },
            { name: "Luxee Floral - 10", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Luxee-Floral-10.jpg", demo: "https://luxee.net/tema/demo-floral-10/" }
        ],

        // TEMA WATERCOLOR
        watercolor: [
            { name: "Luxee Watercolor - 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1028.webp", demo: "https://luxee.net/tema/watercolor-04/" },
            { name: "Luxee Watercolor - 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1026.webp", demo: "https://luxee.net/tema/watercolor-02/" },
            { name: "Luxee Watercolor - 03", image: "https://s2moments.id/wp-content/uploads/2025/11/1027.webp", demo: "https://luxee.net/tema/watercolor-03/" },
            { name: "Luxee Watercolor - 04", image: "https://s2moments.id/wp-content/uploads/2025/11/1025.webp", demo: "https://luxee.net/tema/watercolor-01/" }
        ],

        // TEMA MINIMALIST
        minimalist: [
            { name: "Luxee Minimalist - 01", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_01.webp", demo: "https://luxee.net/premium/minimalist-01/" },
            { name: "Luxee Minimalist - 02", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_02.webp", demo: "https://luxee.net/premium/minimalist-02/" },
            { name: "Luxee Minimalist - 03", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_03.webp", demo: "https://luxee.net/premium/minimalist-03/" },
            { name: "Luxee Minimalist - 04", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_04.webp", demo: "https://luxee.net/premium/minimalist-04/" },
            { name: "Luxee Minimalist - 05", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_05.webp", demo: "https://luxee.net/premium/minimalist-05/" },
            { name: "Luxee Minimalist - 06", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_06.webp", demo: "https://luxee.net/premium/minimalist-06/" },
            { name: "Luxee Minimalist - 07", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_07.webp", demo: "https://luxee.net/premium/minimalist-07/" },
            { name: "Luxee Minimalist - 08", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_08.webp", demo: "https://luxee.net/premium/minimalist-08/" },
            { name: "Luxee Minimalist - 09", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_09.webp", demo: "https://luxee.net/premium/minimalist-09/" },
            { name: "Luxee Minimalist - 10", image: "https://s2moments.id/wp-content/uploads/2025/11/Luxee_Minimalist_10.webp", demo: "https://luxee.net/premium/minimalist-10/" },
            { name: "Luxee Overlay Shadow", image: "https://s2moments.id/wp-content/uploads/2025/11/Mockup-Overlay-Shadow.png", demo: "https://luxee.net/tema/overlay-shadow-01/" },
            { name: "Luxee Elegant 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1029.webp", demo: "https://luxee.net/tema/elegant-02/" }
        ]
    },

    // ====================================
    // NON-WEDDING CATALOG
    // ====================================
    nonWedding: {
        // TEMA ENGAGEMENT
        engagement: [
            { name: "Engagement Day - 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1056.webp", demo: "https://luxee.net/premium/engagement-day/" },
            { name: "Engagement Day - 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1057.webp", demo: "https://luxee.net/premium/engagement-day-02/" },
            { name: "Engagement Day - 03", image: "https://s2moments.id/wp-content/uploads/2025/11/1058.webp", demo: "https://luxee.net/premium/engagement-floral-01/" },
            { name: "Engagement Day - 04", image: "https://s2moments.id/wp-content/uploads/2025/11/1059.webp", demo: "https://luxee.net/premium/engagement-floral-02/" }
        ],

        // TEMA ANNIVERSARY
        anniversary: [
            { name: "Anniversary 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1060.webp", demo: "https://luxee.net/premium/anniversary-inv-01/" },
            { name: "Anniversary 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1061.webp", demo: "https://luxee.net/premium/anniversary-inv-02/" }
        ],

        // TEMA AQIQAH
        aqiqah: [
            { name: "Aqiqah 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1054.webp", demo: "https://luxee.net/premium/undangan-tasmiyah-aqiqah-01/" },
            { name: "Aqiqah 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1055.webp", demo: "https://luxee.net/premium/undangan-tasmiyah-aqiqah-02/" }
        ],

        // TEMA KHITAN
        khitan: [
            { name: "Khitan 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1051.webp", demo: "https://luxee.net/premium/khitan-01/" },
            { name: "Khitan 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1052.webp", demo: "https://luxee.net/premium/khitan-02/" },
            { name: "Khitan 03", image: "https://s2moments.id/wp-content/uploads/2025/11/1053.webp", demo: "https://luxee.net/premium/khitan-03/" }
        ],

        // TEMA BIRTHDAY
        birthday: [
            { name: "Birthday 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1062.webp", demo: "https://luxee.net/premium/undangan-birthday-17-girl/" },
            { name: "Birthday 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1063.webp", demo: "https://luxee.net/premium/undangan-birthday-17-boy/" },
            { name: "Birthday 03", image: "https://s2moments.id/wp-content/uploads/2025/11/1064.webp", demo: "https://luxee.net/premium/undangan-birthday-perempuan/" },
            { name: "Birthday 04", image: "https://s2moments.id/wp-content/uploads/2025/11/1065.webp", demo: "https://luxee.net/premium/undangan-birthday-pria/" }
        ],

        // TEMA OTHERS
        others: [
            { name: "Bridal Shower", image: "https://s2moments.id/wp-content/uploads/2025/11/1078.png", demo: "https://luxee.net/premium/bridal-shower/" },
            { name: "Walimatussafar", image: "https://s2moments.id/wp-content/uploads/2025/11/1066.webp", demo: "https://luxee.net/premium/undangan-walimatussafar/" },
            { name: "Kajian Islami", image: "https://s2moments.id/wp-content/uploads/2025/11/1067.webp", demo: "https://luxee.net/premium/undangan-kajian-islami/" },
            { name: "Pengukuhan Guru Besar", image: "https://s2moments.id/wp-content/uploads/2025/11/1068.webp", demo: "https://luxee.net/premium/undangan-pengukuhan-guru-besar/" },
            { name: "Wisuda (Mahasiswa)", image: "https://s2moments.id/wp-content/uploads/2025/11/1069.webp", demo: "https://luxee.net/premium/undangan-wisuda-mahasiswa/" },
            { name: "Wisuda (Kampus)", image: "https://s2moments.id/wp-content/uploads/2025/11/1070.webp", demo: "https://luxee.net/premium/undangan-wisuda-kampus/" },
            { name: "Kelulusan Sekolah", image: "https://s2moments.id/wp-content/uploads/2025/11/1071.webp", demo: "https://luxee.net/premium/undangan-kelulusan-sekolah/" },
            { name: "Reuni", image: "https://s2moments.id/wp-content/uploads/2025/11/1072.webp", demo: "https://luxee.net/premium/reunion-invitation/" },
            { name: "Kantor - Formal", image: "https://s2moments.id/wp-content/uploads/2025/11/1073.webp", demo: "https://luxee.net/premium/undangan-kantor-formal/" },
            { name: "Rapat - Formal", image: "https://s2moments.id/wp-content/uploads/2025/11/1074.webp", demo: "https://luxee.net/premium/undangan-rapat-formal/" },
            { name: "Event - Formal", image: "https://s2moments.id/wp-content/uploads/2025/11/1075.webp", demo: "https://luxee.net/premium/undangan-event-formal/" },
            { name: "Event 01", image: "https://s2moments.id/wp-content/uploads/2025/11/1076.webp", demo: "https://luxee.net/premium/event-invitation-01/" },
            { name: "Event 02", image: "https://s2moments.id/wp-content/uploads/2025/11/1077.webp", demo: "https://luxee.net/premium/event-invitation-02/" }
        ]
    }
};
