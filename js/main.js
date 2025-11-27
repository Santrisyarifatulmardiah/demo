// ===========================
// Global Variables & Configuration
// ===========================
const API_BASE_URL = 'https://api.alquran.cloud/v1';
const EDITION_ARABIC = 'quran-uthmani';
const EDITION_TRANSLATION = 'id.indonesian';
const EDITION_AUDIO = 'ar.alafasy';

let surahData = [];
let currentSurah = null;
let currentAyahIndex = 0;
let audioElement = null;
let isPlaying = false;

// ===========================
// DOM Elements
// ===========================
const elements = {
    loadingScreen: document.getElementById('loading-screen'),
    searchInput: document.getElementById('search-input'),
    surahList: document.getElementById('surah-list'),
    homePage: document.getElementById('home-page'),
    surahPage: document.getElementById('surah-page'),
    bookmarksPage: document.getElementById('bookmarks-page'),
    themeToggle: document.getElementById('theme-toggle'),
    navBtns: document.querySelectorAll('.nav-btn'),
    backBtn: document.getElementById('back-to-home'),
    surahNameArabic: document.getElementById('surah-name-arabic'),
    surahName: document.getElementById('surah-name'),
    surahRevelation: document.getElementById('surah-revelation'),
    surahAyahCount: document.getElementById('surah-ayah-count'),
    ayatList: document.getElementById('ayat-list'),
    bismillah: document.getElementById('bismillah'),
    bookmarksList: document.getElementById('bookmarks-list'),
    bookmarkCount: document.getElementById('bookmark-count'),
    lastRead: document.getElementById('last-read'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message'),
    audioPlayer: document.getElementById('audio-player'),
    playAudioBtn: document.getElementById('play-audio-btn'),
    playPauseBtn: document.getElementById('play-pause'),
    prevAyahBtn: document.getElementById('prev-ayah'),
    nextAyahBtn: document.getElementById('next-ayah'),
    currentAyahSpan: document.getElementById('current-ayah'),
    progressFill: document.getElementById('progress-fill'),
    currentTime: document.getElementById('current-time'),
    duration: document.getElementById('duration')
};

// ===========================
// Initialization
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    try {
        // Load theme preference
        loadTheme();

        // Fetch surah list
        await fetchSurahList();

        // Setup event listeners
        setupEventListeners();

        // Load bookmark count
        updateBookmarkCount();

        // Load last read
        updateLastRead();

        // Hide loading screen
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
        }, 500);
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Gagal memuat data. Silakan refresh halaman.');
    }
}

// ===========================
// API Functions
// ===========================
async function fetchSurahList() {
    try {
        const response = await fetch(`${API_BASE_URL}/surah`);
        const data = await response.json();

        if (data.code === 200) {
            surahData = data.data;
            renderSurahList(surahData);
        } else {
            throw new Error('Failed to fetch surah list');
        }
    } catch (error) {
        console.error('Error fetching surah list:', error);
        throw error;
    }
}

async function fetchSurahDetail(surahNumber) {
    try {
        // Show loading
        elements.loadingScreen.classList.remove('hidden');

        // Fetch Arabic text
        const arabicResponse = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${EDITION_ARABIC}`);
        const arabicData = await arabicResponse.json();

        // Fetch translation
        const translationResponse = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${EDITION_TRANSLATION}`);
        const translationData = await translationResponse.json();

        // Fetch audio
        const audioResponse = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${EDITION_AUDIO}`);
        const audioData = await audioResponse.json();

        if (arabicData.code === 200 && translationData.code === 200) {
            currentSurah = {
                info: arabicData.data,
                ayahs: arabicData.data.ayahs.map((ayah, index) => ({
                    number: ayah.numberInSurah,
                    arabic: ayah.text,
                    translation: translationData.data.ayahs[index].text,
                    audio: audioData.data.ayahs[index].audio
                }))
            };

            renderSurahDetail();

            // Save last read
            saveLastRead(surahNumber);
            updateLastRead();
        } else {
            throw new Error('Failed to fetch surah detail');
        }

        // Hide loading
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
        }, 300);
    } catch (error) {
        console.error('Error fetching surah detail:', error);
        elements.loadingScreen.classList.add('hidden');
        showToast('Gagal memuat surah. Silakan coba lagi.');
    }
}

// ===========================
// Render Functions
// ===========================
function renderSurahList(surahs) {
    elements.surahList.innerHTML = '';

    surahs.forEach(surah => {
        const surahCard = document.createElement('div');
        surahCard.className = 'surah-card';
        surahCard.innerHTML = `
            <div class="surah-number">${surah.number}</div>
            <div class="surah-info-card">
                <div class="surah-names">
                    <span class="surah-name-latin">${surah.englishName}</span>
                    <span class="surah-name-arabic">${surah.name}</span>
                </div>
                <div class="surah-details">
                    <span>${surah.englishNameTranslation}</span>
                    <span class="separator">•</span>
                    <span>${surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</span>
                    <span class="separator">•</span>
                    <span>${surah.numberOfAyahs} Ayat</span>
                </div>
            </div>
        `;

        surahCard.addEventListener('click', () => {
            fetchSurahDetail(surah.number);
            showPage('surah');
        });

        elements.surahList.appendChild(surahCard);
    });
}

function renderSurahDetail() {
    if (!currentSurah) return;

    const info = currentSurah.info;

    // Update header
    elements.surahNameArabic.textContent = info.name;
    elements.surahName.textContent = info.englishName;
    elements.surahRevelation.textContent = info.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah';
    elements.surahAyahCount.textContent = `${info.numberOfAyahs} Ayat`;

    // Show/hide bismillah (not for Al-Fatihah and At-Taubah)
    if (info.number === 1 || info.number === 9) {
        elements.bismillah.style.display = 'none';
    } else {
        elements.bismillah.style.display = 'block';
    }

    // Render ayahs
    elements.ayatList.innerHTML = '';

    currentSurah.ayahs.forEach((ayah, index) => {
        const ayatCard = createAyahCard(ayah, index);
        elements.ayatList.appendChild(ayatCard);
    });

    // Reset audio player
    elements.audioPlayer.classList.add('hidden');
    currentAyahIndex = 0;
}

function createAyahCard(ayah, index) {
    const ayatCard = document.createElement('div');
    ayatCard.className = 'ayat-card';
    ayatCard.dataset.ayahIndex = index;

    const bookmarkId = `${currentSurah.info.number}-${ayah.number}`;
    const isBookmarked = isAyahBookmarked(bookmarkId);

    ayatCard.innerHTML = `
        <div class="ayat-header">
            <div class="ayat-number">${ayah.number}</div>
            <div class="ayat-actions">
                <button class="play-ayah-btn" title="Putar Ayat">
                    <i class="fas fa-play"></i>
                </button>
                <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" title="Tandai Ayat">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="copy-btn" title="Salin Ayat">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
        <p class="ayat-arabic">${ayah.arabic}</p>
        <p class="ayat-translation">${ayah.translation}</p>
    `;

    // Event listeners
    const playBtn = ayatCard.querySelector('.play-ayah-btn');
    playBtn.addEventListener('click', () => playAyah(index));

    const bookmarkBtn = ayatCard.querySelector('.bookmark-btn');
    bookmarkBtn.addEventListener('click', () => toggleBookmark(ayah, bookmarkBtn));

    const copyBtn = ayatCard.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => copyAyah(ayah));

    return ayatCard;
}

// ===========================
// Navigation Functions
// ===========================
function showPage(pageName) {
    const pages = {
        home: elements.homePage,
        surah: elements.surahPage,
        bookmarks: elements.bookmarksPage
    };

    // Hide all pages
    Object.values(pages).forEach(page => page.classList.remove('active'));

    // Show selected page
    if (pages[pageName]) {
        pages[pageName].classList.add('active');
    }

    // Update nav buttons
    elements.navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageName) {
            btn.classList.add('active');
        }
    });

    // Load bookmarks if bookmarks page
    if (pageName === 'bookmarks') {
        renderBookmarks();
    }
}

// ===========================
// Audio Functions
// ===========================
function playAyah(index) {
    if (!currentSurah || !currentSurah.ayahs[index]) return;

    currentAyahIndex = index;
    const ayah = currentSurah.ayahs[index];

    // Show audio player
    elements.audioPlayer.classList.remove('hidden');
    elements.currentAyahSpan.textContent = `Ayat ${ayah.number}`;

    // Initialize audio element if not exists
    if (!audioElement) {
        audioElement = document.getElementById('audio-element');
        setupAudioEvents();
    }

    // Load and play audio
    audioElement.src = ayah.audio;
    audioElement.play();
    isPlaying = true;
    updatePlayPauseBtn();
}

function togglePlayPause() {
    if (!audioElement || !audioElement.src) return;

    if (isPlaying) {
        audioElement.pause();
    } else {
        audioElement.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseBtn();
}

function playPrevAyah() {
    if (currentAyahIndex > 0) {
        playAyah(currentAyahIndex - 1);
    }
}

function playNextAyah() {
    if (currentAyahIndex < currentSurah.ayahs.length - 1) {
        playAyah(currentAyahIndex + 1);
    } else {
        // End of surah
        audioElement.pause();
        isPlaying = false;
        updatePlayPauseBtn();
        showToast('Akhir surah tercapai');
    }
}

function updatePlayPauseBtn() {
    const icon = elements.playPauseBtn.querySelector('i');
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

function setupAudioEvents() {
    audioElement.addEventListener('timeupdate', () => {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        elements.progressFill.style.width = `${progress}%`;
        elements.currentTime.textContent = formatTime(audioElement.currentTime);
    });

    audioElement.addEventListener('loadedmetadata', () => {
        elements.duration.textContent = formatTime(audioElement.duration);
    });

    audioElement.addEventListener('ended', () => {
        playNextAyah();
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===========================
// Bookmark Functions
// ===========================
function toggleBookmark(ayah, button) {
    const bookmarkId = `${currentSurah.info.number}-${ayah.number}`;
    const bookmarks = getBookmarks();

    if (isAyahBookmarked(bookmarkId)) {
        // Remove bookmark
        const index = bookmarks.findIndex(b => b.id === bookmarkId);
        bookmarks.splice(index, 1);
        button.classList.remove('active');
        showToast('Bookmark dihapus');
    } else {
        // Add bookmark
        bookmarks.push({
            id: bookmarkId,
            surahNumber: currentSurah.info.number,
            surahName: currentSurah.info.englishName,
            surahNameArabic: currentSurah.info.name,
            ayahNumber: ayah.number,
            arabic: ayah.arabic,
            translation: ayah.translation,
            audio: ayah.audio
        });
        button.classList.add('active');
        showToast('Bookmark ditambahkan');
    }

    saveBookmarks(bookmarks);
    updateBookmarkCount();
}

function isAyahBookmarked(bookmarkId) {
    const bookmarks = getBookmarks();
    return bookmarks.some(b => b.id === bookmarkId);
}

function getBookmarks() {
    const bookmarks = localStorage.getItem('quran_bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmarks(bookmarks) {
    localStorage.setItem('quran_bookmarks', JSON.stringify(bookmarks));
}

function updateBookmarkCount() {
    const bookmarks = getBookmarks();
    elements.bookmarkCount.textContent = bookmarks.length;
}

function renderBookmarks() {
    const bookmarks = getBookmarks();

    if (bookmarks.length === 0) {
        elements.bookmarksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>Belum ada ayat yang ditandai</p>
                <small>Tandai ayat favorit Anda untuk akses cepat</small>
            </div>
        `;
        return;
    }

    elements.bookmarksList.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const ayatCard = document.createElement('div');
        ayatCard.className = 'ayat-card';

        ayatCard.innerHTML = `
            <div class="ayat-header">
                <div class="ayat-number">${bookmark.surahName} - ${bookmark.ayahNumber}</div>
                <div class="ayat-actions">
                    <button class="remove-bookmark-btn" title="Hapus Bookmark">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="ayat-arabic">${bookmark.arabic}</p>
            <p class="ayat-translation">${bookmark.translation}</p>
        `;

        const removeBtn = ayatCard.querySelector('.remove-bookmark-btn');
        removeBtn.addEventListener('click', () => {
            bookmarks.splice(index, 1);
            saveBookmarks(bookmarks);
            updateBookmarkCount();
            renderBookmarks();
            showToast('Bookmark dihapus');
        });

        elements.bookmarksList.appendChild(ayatCard);
    });
}

// ===========================
// Search Function
// ===========================
function setupSearch() {
    elements.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query === '') {
            renderSurahList(surahData);
            return;
        }

        const filtered = surahData.filter(surah =>
            surah.englishName.toLowerCase().includes(query) ||
            surah.englishNameTranslation.toLowerCase().includes(query) ||
            surah.number.toString().includes(query)
        );

        renderSurahList(filtered);
    });
}

// ===========================
// Theme Functions
// ===========================
function loadTheme() {
    const theme = localStorage.getItem('quran_theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('quran_theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = elements.themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===========================
// Last Read Functions
// ===========================
function saveLastRead(surahNumber) {
    const surah = surahData.find(s => s.number === surahNumber);
    if (surah) {
        localStorage.setItem('quran_last_read', JSON.stringify({
            number: surah.number,
            name: surah.englishName
        }));
    }
}

function updateLastRead() {
    const lastRead = localStorage.getItem('quran_last_read');
    if (lastRead) {
        const data = JSON.parse(lastRead);
        elements.lastRead.textContent = data.name;
    } else {
        elements.lastRead.textContent = '-';
    }
}

// ===========================
// Utility Functions
// ===========================
function copyAyah(ayah) {
    const text = `${ayah.arabic}\n\n${ayah.translation}\n\n(QS. ${currentSurah.info.englishName}: ${ayah.number})`;

    navigator.clipboard.writeText(text).then(() => {
        showToast('Ayat berhasil disalin');
    }).catch(() => {
        showToast('Gagal menyalin ayat');
    });
}

function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ===========================
// Event Listeners
// ===========================
function setupEventListeners() {
    // Navigation
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showPage(btn.dataset.page);
        });
    });

    elements.backBtn.addEventListener('click', () => {
        showPage('home');
    });

    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);

    // Search
    setupSearch();

    // Audio controls
    elements.playAudioBtn.addEventListener('click', () => playAyah(0));
    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.prevAyahBtn.addEventListener('click', playPrevAyah);
    elements.nextAyahBtn.addEventListener('click', playNextAyah);

    // Progress bar click
    document.querySelector('.progress-bar')?.addEventListener('click', (e) => {
        if (!audioElement || !audioElement.duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioElement.currentTime = percent * audioElement.duration;
    });
}
