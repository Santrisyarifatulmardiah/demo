// ===========================
// Global Variables & Configuration
// ===========================
const API_BASE_URL = 'https://api.alquran.cloud/v1';
const EDITION_ARABIC = 'quran-uthmani';
let EDITION_TRANSLATION = 'id.indonesian';
let EDITION_AUDIO = 'ar.alafasy';

let surahData = [];
let juzData = [];
let currentSurah = null;
let currentAyahIndex = 0;
let audioElement = null;
let isPlaying = false;
let arabicFontSize = 28;
let currentNoteAyah = null;
let readingStartTime = null;

// Juz mapping data
const JUZ_MAPPING = [
    {juz: 1, start: {surah: 1, ayah: 1}, end: {surah: 2, ayah: 141}},
    {juz: 2, start: {surah: 2, ayah: 142}, end: {surah: 2, ayah: 252}},
    {juz: 3, start: {surah: 2, ayah: 253}, end: {surah: 3, ayah: 92}},
    {juz: 4, start: {surah: 3, ayah: 93}, end: {surah: 4, ayah: 23}},
    {juz: 5, start: {surah: 4, ayah: 24}, end: {surah: 4, ayah: 147}},
    {juz: 6, start: {surah: 4, ayah: 148}, end: {surah: 5, ayah: 81}},
    {juz: 7, start: {surah: 5, ayah: 82}, end: {surah: 6, ayah: 110}},
    {juz: 8, start: {surah: 6, ayah: 111}, end: {surah: 7, ayah: 87}},
    {juz: 9, start: {surah: 7, ayah: 88}, end: {surah: 8, ayah: 40}},
    {juz: 10, start: {surah: 8, ayah: 41}, end: {surah: 9, ayah: 92}},
    {juz: 11, start: {surah: 9, ayah: 93}, end: {surah: 11, ayah: 5}},
    {juz: 12, start: {surah: 11, ayah: 6}, end: {surah: 12, ayah: 52}},
    {juz: 13, start: {surah: 12, ayah: 53}, end: {surah: 14, ayah: 52}},
    {juz: 14, start: {surah: 15, ayah: 1}, end: {surah: 16, ayah: 128}},
    {juz: 15, start: {surah: 17, ayah: 1}, end: {surah: 18, ayah: 74}},
    {juz: 16, start: {surah: 18, ayah: 75}, end: {surah: 20, ayah: 135}},
    {juz: 17, start: {surah: 21, ayah: 1}, end: {surah: 22, ayah: 78}},
    {juz: 18, start: {surah: 23, ayah: 1}, end: {surah: 25, ayah: 20}},
    {juz: 19, start: {surah: 25, ayah: 21}, end: {surah: 27, ayah: 55}},
    {juz: 20, start: {surah: 27, ayah: 56}, end: {surah: 29, ayah: 45}},
    {juz: 21, start: {surah: 29, ayah: 46}, end: {surah: 33, ayah: 30}},
    {juz: 22, start: {surah: 33, ayah: 31}, end: {surah: 36, ayah: 27}},
    {juz: 23, start: {surah: 36, ayah: 28}, end: {surah: 39, ayah: 31}},
    {juz: 24, start: {surah: 39, ayah: 32}, end: {surah: 41, ayah: 46}},
    {juz: 25, start: {surah: 41, ayah: 47}, end: {surah: 45, ayah: 37}},
    {juz: 26, start: {surah: 46, ayah: 1}, end: {surah: 51, ayah: 30}},
    {juz: 27, start: {surah: 51, ayah: 31}, end: {surah: 57, ayah: 29}},
    {juz: 28, start: {surah: 58, ayah: 1}, end: {surah: 66, ayah: 12}},
    {juz: 29, start: {surah: 67, ayah: 1}, end: {surah: 77, ayah: 50}},
    {juz: 30, start: {surah: 78, ayah: 1}, end: {surah: 114, ayah: 6}}
];

// ===========================
// DOM Elements
// ===========================
const elements = {
    loadingScreen: document.getElementById('loading-screen'),
    searchInput: document.getElementById('search-input'),
    surahList: document.getElementById('surah-list'),
    juzList: document.getElementById('juz-list'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebar-toggle'),
    sidebarClose: document.getElementById('sidebar-close'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    sidebarTabs: document.querySelectorAll('.sidebar-tab'),
    homePage: document.getElementById('home-page'),
    surahPage: document.getElementById('surah-page'),
    bookmarksPage: document.getElementById('bookmarks-page'),
    notesPage: document.getElementById('notes-page'),
    statsPage: document.getElementById('stats-page'),
    themeToggle: document.getElementById('theme-toggle'),
    navBtns: document.querySelectorAll('.nav-btn'),
    mobileNavItems: document.querySelectorAll('.mobile-nav-item'),
    backBtn: document.getElementById('back-to-home'),
    surahNameArabic: document.getElementById('surah-name-arabic'),
    surahName: document.getElementById('surah-name'),
    surahRevelation: document.getElementById('surah-revelation'),
    surahAyahCount: document.getElementById('surah-ayah-count'),
    ayatList: document.getElementById('ayat-list'),
    bismillah: document.getElementById('bismillah'),
    bookmarksList: document.getElementById('bookmarks-list'),
    bookmarkCount: document.getElementById('bookmark-count'),
    notesCount: document.getElementById('notes-count'),
    notesList: document.getElementById('notes-list'),
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
    duration: document.getElementById('duration'),
    dailyVerse: document.getElementById('daily-verse'),
    continueReadingBtn: document.getElementById('continue-reading'),
    randomSurahBtn: document.getElementById('random-surah'),
    searchAyahBtn: document.getElementById('search-ayah'),
    settingsBtn: document.getElementById('settings-btn'),
    settingsModal: document.getElementById('settings-modal'),
    closeSettings: document.getElementById('close-settings'),
    translationLanguage: document.getElementById('translation-language'),
    audioReciter: document.getElementById('audio-reciter'),
    noteModal: document.getElementById('note-modal'),
    closeNoteModal: document.getElementById('close-note-modal'),
    cancelNote: document.getElementById('cancel-note'),
    saveNote: document.getElementById('save-note'),
    noteAyahInfo: document.getElementById('note-ayah-info'),
    noteTextarea: document.getElementById('note-textarea'),
    searchModal: document.getElementById('search-modal'),
    closeSearchModal: document.getElementById('close-search-modal'),
    ayahSearchInput: document.getElementById('ayah-search-input'),
    searchResults: document.getElementById('search-results'),
    tafsirPanel: document.getElementById('tafsir-panel'),
    closeTafsir: document.getElementById('close-tafsir'),
    tafsirContent: document.getElementById('tafsir-content'),
    showTafsirPanel: document.getElementById('show-tafsir-panel'),
    increaseFontBtn: document.getElementById('increase-font'),
    decreaseFontBtn: document.getElementById('decrease-font'),
    fontSizeDisplay: document.getElementById('font-size-display'),
    toggleTranslation: document.getElementById('toggle-translation'),
    toggleReadingMode: document.getElementById('toggle-reading-mode'),
    surahReadCount: document.getElementById('surah-read-count'),
    surahProgress: document.getElementById('surah-progress'),
    surahPercentage: document.getElementById('surah-percentage'),
    readingTime: document.getElementById('reading-time'),
    streakDays: document.getElementById('streak-days'),
    readingHistoryList: document.getElementById('reading-history-list')
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

        // Load settings
        loadSettings();

        // Fetch surah list
        await fetchSurahList();

        // Load juz list
        loadJuzList();

        // Setup event listeners
        setupEventListeners();

        // Load bookmark count
        updateBookmarkCount();

        // Load notes count
        updateNotesCount();

        // Load last read
        updateLastRead();

        // Load daily verse
        loadDailyVerse();

        // Load statistics
        loadStatistics();

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

        // Start reading timer
        startReadingTimer();

        // Fetch Arabic text
        const arabicResponse = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${EDITION_ARABIC}`);
        const arabicData = await arabicResponse.json();

        // Fetch translation
        const translationResponse = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${EDITION_TRANSLATION}`);
        const translationData = await translationResponse.json();

        // Fetch audio
        const audioResponse = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${EDITION_AUDIO}`);
        const audioData = await audioResponse.json();

        // Fetch transliteration (Latin)
        const transliterationResponse = await fetch(`${API_BASE_URL}/surah/${surahNumber}/en.transliteration`);
        const transliterationData = await transliterationResponse.json();

        if (arabicData.code === 200 && translationData.code === 200) {
            currentSurah = {
                info: arabicData.data,
                ayahs: arabicData.data.ayahs.map((ayah, index) => ({
                    number: ayah.numberInSurah,
                    arabic: ayah.text,
                    transliteration: transliterationData.code === 200 ? transliterationData.data.ayahs[index].text : '',
                    translation: translationData.data.ayahs[index].text,
                    audio: audioData.data.ayahs[index].audio
                }))
            };

            renderSurahDetail();

            // Save last read
            saveLastRead(surahNumber);
            updateLastRead();

            // Track reading
            trackReading(surahNumber);
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

async function fetchJuzDetail(juzNumber) {
    try {
        elements.loadingScreen.classList.remove('hidden');

        const juzInfo = JUZ_MAPPING[juzNumber - 1];
        showToast(`Memuat Juz ${juzNumber}...`);

        // For simplicity, load the first surah of the juz
        await fetchSurahDetail(juzInfo.start.surah);

        elements.loadingScreen.classList.add('hidden');
    } catch (error) {
        console.error('Error fetching juz:', error);
        elements.loadingScreen.classList.add('hidden');
        showToast('Gagal memuat juz.');
    }
}

// ===========================
// Render Functions
// ===========================
function renderSurahList(surahs) {
    elements.surahList.innerHTML = '';

    surahs.forEach(surah => {
        const surahItem = document.createElement('div');
        surahItem.className = 'sidebar-surah-item';
        surahItem.dataset.surahNumber = surah.number;
        surahItem.innerHTML = `
            <div class="sidebar-surah-number">${surah.number}</div>
            <div class="sidebar-surah-info">
                <div class="sidebar-surah-name">${surah.englishName}</div>
                <div class="sidebar-surah-meta">${surah.englishNameTranslation} • ${surah.numberOfAyahs} Ayat</div>
            </div>
            <div class="sidebar-surah-arabic">${surah.name}</div>
        `;

        surahItem.addEventListener('click', () => {
            // Remove active class from all items
            document.querySelectorAll('.sidebar-surah-item').forEach(item => {
                item.classList.remove('active');
            });
            // Add active class to clicked item
            surahItem.classList.add('active');

            fetchSurahDetail(surah.number);
            showPage('surah');

            // Close sidebar on mobile
            closeSidebar();
        });

        elements.surahList.appendChild(surahItem);
    });
}

function loadJuzList() {
    elements.juzList.innerHTML = '';

    JUZ_MAPPING.forEach((juz, index) => {
        const juzItem = document.createElement('div');
        juzItem.className = 'sidebar-juz-item';
        juzItem.innerHTML = `
            <h4>Juz ${juz.juz}</h4>
            <p>Surah ${juz.start.surah} Ayat ${juz.start.ayah} - Surah ${juz.end.surah} Ayat ${juz.end.ayah}</p>
        `;

        juzItem.addEventListener('click', () => {
            fetchJuzDetail(juz.juz);
            showPage('surah');
            closeSidebar();
        });

        elements.juzList.appendChild(juzItem);
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

    // Apply font size
    updateArabicFontSize();
}

function createAyahCard(ayah, index) {
    const ayatCard = document.createElement('div');
    ayatCard.className = 'ayat-card';
    ayatCard.dataset.ayahIndex = index;

    const bookmarkId = `${currentSurah.info.number}-${ayah.number}`;
    const isBookmarked = isAyahBookmarked(bookmarkId);
    const highlight = getAyahHighlight(bookmarkId);

    if (highlight) {
        ayatCard.classList.add(`highlight-${highlight}`);
    }

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
                <button class="note-btn" title="Tambah Catatan">
                    <i class="fas fa-note-sticky"></i>
                </button>
                <button class="tafsir-btn" title="Lihat Tafsir">
                    <i class="fas fa-book-open"></i>
                </button>
                <button class="copy-btn" title="Salin Ayat">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="share-btn" title="Bagikan">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        </div>
        <p class="ayat-arabic">${ayah.arabic}</p>
        ${ayah.transliteration ? `<p class="ayat-transliteration">${ayah.transliteration}</p>` : ''}
        <p class="ayat-translation">${ayah.translation}</p>
    `;

    // Event listeners
    const playBtn = ayatCard.querySelector('.play-ayah-btn');
    playBtn.addEventListener('click', () => playAyah(index));

    const bookmarkBtn = ayatCard.querySelector('.bookmark-btn');
    bookmarkBtn.addEventListener('click', () => toggleBookmark(ayah, bookmarkBtn));

    const noteBtn = ayatCard.querySelector('.note-btn');
    noteBtn.addEventListener('click', () => openNoteModal(ayah));

    const tafsirBtn = ayatCard.querySelector('.tafsir-btn');
    tafsirBtn.addEventListener('click', () => showTafsir(ayah));

    const copyBtn = ayatCard.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => copyAyah(ayah));

    const shareBtn = ayatCard.querySelector('.share-btn');
    shareBtn.addEventListener('click', () => shareAyah(ayah));

    return ayatCard;
}

// ===========================
// Navigation Functions
// ===========================
function showPage(pageName) {
    const pages = {
        home: elements.homePage,
        surah: elements.surahPage,
        bookmarks: elements.bookmarksPage,
        notes: elements.notesPage,
        stats: elements.statsPage
    };

    // Hide all pages
    Object.values(pages).forEach(page => page.classList.remove('active'));

    // Show selected page
    if (pages[pageName]) {
        pages[pageName].classList.add('active');
    }

    // Update nav buttons (desktop)
    elements.navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageName) {
            btn.classList.add('active');
        }
    });

    // Update mobile nav buttons
    elements.mobileNavItems.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageName) {
            btn.classList.add('active');
        }
    });

    // Load content for specific pages
    if (pageName === 'bookmarks') {
        renderBookmarks();
    } else if (pageName === 'notes') {
        renderNotes();
    } else if (pageName === 'stats') {
        loadStatistics();
    }
}

// ===========================
// Audio Functions
// ===========================
function playAyah(index) {
    if (!currentSurah || !currentSurah.ayahs[index]) return;

    currentAyahIndex = index;
    const ayah = currentSurah.ayahs[index];

    // Show audio player with smooth transition
    elements.audioPlayer.classList.remove('hidden');
    elements.currentAyahSpan.textContent = `Ayat ${ayah.number}`;

    // Initialize audio element if not exists
    if (!audioElement) {
        audioElement = document.getElementById('audio-element');
        setupAudioEvents();
    }

    // Remove previous active ayah highlight
    document.querySelectorAll('.ayat-card.playing').forEach(card => {
        card.classList.remove('playing');
    });

    // Add active class to current ayah
    const ayahCard = document.querySelector(`.ayat-card[data-ayah-index="${index}"]`);
    if (ayahCard) {
        ayahCard.classList.add('playing');
        // Scroll to current ayah card smoothly with offset for audio player
        setTimeout(() => {
            ayahCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    // Load and play audio
    audioElement.src = ayah.audio;
    audioElement.play().catch(err => {
        console.error('Error playing audio:', err);
        showToast('Gagal memutar audio. Silakan coba lagi.');
        isPlaying = false;
        updatePlayPauseBtn();
    });
    isPlaying = true;
    updatePlayPauseBtn();
}

function togglePlayPause() {
    if (!audioElement || !audioElement.src) {
        showToast('Tidak ada audio yang dimuat');
        return;
    }

    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
    } else {
        audioElement.play().catch(err => {
            console.error('Error playing audio:', err);
            showToast('Gagal memutar audio. Silakan coba lagi.');
            isPlaying = false;
        });
        isPlaying = true;
    }
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
            audio: ayah.audio,
            date: new Date().toISOString()
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
// Notes Functions
// ===========================
function openNoteModal(ayah) {
    currentNoteAyah = ayah;
    elements.noteAyahInfo.innerHTML = `<strong>QS. ${currentSurah.info.englishName}: ${ayah.number}</strong>`;
    elements.noteTextarea.value = '';
    elements.noteModal.classList.add('active');
}

function closeNoteModalFn() {
    elements.noteModal.classList.remove('active');
    currentNoteAyah = null;
    elements.noteTextarea.value = '';
}

function saveNoteFunction() {
    const noteText = elements.noteTextarea.value.trim();
    if (!noteText || !currentNoteAyah) return;

    const notes = getNotes();
    const noteId = `${currentSurah.info.number}-${currentNoteAyah.number}-${Date.now()}`;

    notes.push({
        id: noteId,
        surahNumber: currentSurah.info.number,
        surahName: currentSurah.info.englishName,
        ayahNumber: currentNoteAyah.number,
        arabic: currentNoteAyah.arabic,
        note: noteText,
        date: new Date().toISOString()
    });

    saveNotes(notes);
    updateNotesCount();
    closeNoteModalFn();
    showToast('Catatan disimpan');
}

function getNotes() {
    const notes = localStorage.getItem('quran_notes');
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem('quran_notes', JSON.stringify(notes));
}

function updateNotesCount() {
    const notes = getNotes();
    elements.notesCount.textContent = notes.length;
}

function renderNotes() {
    const notes = getNotes();

    if (notes.length === 0) {
        elements.notesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-note-sticky"></i>
                <p>Belum ada catatan</p>
                <small>Tambahkan catatan pribadi untuk ayat yang Anda pelajari</small>
            </div>
        `;
        return;
    }

    elements.notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const noteDate = new Date(note.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        noteCard.innerHTML = `
            <div class="note-header">
                <div class="note-reference">QS. ${note.surahName}: ${note.ayahNumber}</div>
                <div class="note-actions">
                    <button class="delete-note-btn" title="Hapus Catatan">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="note-text">${note.note}</div>
            <div class="note-date">${noteDate}</div>
        `;

        const deleteBtn = noteCard.querySelector('.delete-note-btn');
        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            saveNotes(notes);
            updateNotesCount();
            renderNotes();
            showToast('Catatan dihapus');
        });

        elements.notesList.appendChild(noteCard);
    });
}

// ===========================
// Search Functions
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

function openSearchModal() {
    elements.searchModal.classList.add('active');
    elements.ayahSearchInput.focus();
}

function closeSearchModalFn() {
    elements.searchModal.classList.remove('active');
    elements.ayahSearchInput.value = '';
    elements.searchResults.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-search"></i>
            <p>Masukkan kata kunci untuk mencari ayat</p>
        </div>
    `;
}

// ===========================
// Tafsir Functions
// ===========================
function showTafsir(ayah) {
    elements.tafsirPanel.classList.add('active');

    // Simple tafsir placeholder (in real app, fetch from API)
    elements.tafsirContent.innerHTML = `
        <div class="tafsir-ayah-info">
            <p class="ayat-arabic">${ayah.arabic}</p>
            <p class="ayat-reference">QS. ${currentSurah.info.englishName}: ${ayah.number}</p>
        </div>
        <div class="tafsir-text">
            <h4>Tafsir</h4>
            <p>Fitur tafsir sedang dalam pengembangan. Untuk sementara, Anda dapat membaca terjemahan ayat di atas.</p>
            <p>Tafsir lengkap akan segera tersedia dengan penjelasan mendalam tentang makna dan konteks ayat ini.</p>
        </div>
    `;
}

function closeTafsirPanel() {
    elements.tafsirPanel.classList.remove('active');
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
// Settings Functions
// ===========================
function loadSettings() {
    const settings = getSettings();
    EDITION_TRANSLATION = settings.translationLanguage;
    EDITION_AUDIO = settings.audioReciter;

    if (elements.translationLanguage) {
        elements.translationLanguage.value = settings.translationLanguage;
    }
    if (elements.audioReciter) {
        elements.audioReciter.value = settings.audioReciter;
    }
}

function getSettings() {
    const settings = localStorage.getItem('quran_settings');
    return settings ? JSON.parse(settings) : {
        translationLanguage: 'id.indonesian',
        audioReciter: 'ar.alafasy',
        autoScroll: true,
        showTranslationDefault: true
    };
}

function saveSettings(settings) {
    localStorage.setItem('quran_settings', JSON.stringify(settings));
}

function openSettingsModal() {
    elements.settingsModal.classList.add('active');
}

function closeSettingsModal() {
    elements.settingsModal.classList.remove('active');

    // Save settings
    const settings = {
        translationLanguage: elements.translationLanguage.value,
        audioReciter: elements.audioReciter.value,
        autoScroll: document.getElementById('auto-scroll').checked,
        showTranslationDefault: document.getElementById('show-translation-default').checked
    };

    saveSettings(settings);
    EDITION_TRANSLATION = settings.translationLanguage;
    EDITION_AUDIO = settings.audioReciter;

    showToast('Pengaturan disimpan');
}

// ===========================
// Font Size Controls
// ===========================
function increaseFontSize() {
    if (arabicFontSize < 48) {
        arabicFontSize += 2;
        updateArabicFontSize();
    }
}

function decreaseFontSize() {
    if (arabicFontSize > 16) {
        arabicFontSize -= 2;
        updateArabicFontSize();
    }
}

function updateArabicFontSize() {
    const arabicTexts = document.querySelectorAll('.ayat-arabic');
    arabicTexts.forEach(text => {
        text.style.fontSize = `${arabicFontSize}px`;
    });
    elements.fontSizeDisplay.textContent = `${arabicFontSize}px`;
    localStorage.setItem('quran_font_size', arabicFontSize);
}

function loadFontSize() {
    const savedSize = localStorage.getItem('quran_font_size');
    if (savedSize) {
        arabicFontSize = parseInt(savedSize);
        elements.fontSizeDisplay.textContent = `${arabicFontSize}px`;
    }
}

// ===========================
// Reading Mode
// ===========================
function toggleReadingMode() {
    document.body.classList.toggle('reading-mode');
    elements.toggleReadingMode.classList.toggle('active');
}

function toggleTranslationVisibility() {
    elements.ayatList.classList.toggle('hide-translation');
    elements.toggleTranslation.classList.toggle('active');
}

// ===========================
// Highlight Functions
// ===========================
function getAyahHighlight(ayahId) {
    const highlights = getHighlights();
    return highlights[ayahId] || null;
}

function getHighlights() {
    const highlights = localStorage.getItem('quran_highlights');
    return highlights ? JSON.parse(highlights) : {};
}

// ===========================
// Daily Verse
// ===========================
function loadDailyVerse() {
    // Get random ayah for today (based on date seed)
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const surahNum = (seed % 114) + 1;

    fetch(`${API_BASE_URL}/surah/${surahNum}/${EDITION_ARABIC}`)
        .then(res => res.json())
        .then(arabicData => {
            return Promise.all([
                Promise.resolve(arabicData),
                fetch(`${API_BASE_URL}/surah/${surahNum}/${EDITION_TRANSLATION}`).then(res => res.json()),
                fetch(`${API_BASE_URL}/surah/${surahNum}/en.transliteration`).then(res => res.json())
            ]);
        })
        .then(([arabic, trans, translit]) => {
            const ayahIndex = seed % arabic.data.numberOfAyahs;
            const ayah = arabic.data.ayahs[ayahIndex];
            const translation = trans.data.ayahs[ayahIndex];
            const transliteration = translit.code === 200 ? translit.data.ayahs[ayahIndex] : null;

            elements.dailyVerse.innerHTML = `
                <p class="ayat-arabic">${ayah.text}</p>
                ${transliteration ? `<p class="ayat-transliteration" style="color: rgba(255,255,255,0.8);">${transliteration.text}</p>` : ''}
                <p class="ayat-translation">${translation.text}</p>
                <p class="ayat-reference">QS. ${arabic.data.englishName}: ${ayah.numberInSurah}</p>
            `;
        })
        .catch(err => {
            console.error('Error loading daily verse:', err);
            elements.dailyVerse.innerHTML = '<p>Gagal memuat ayat hari ini</p>';
        });
}

// ===========================
// Statistics & Tracking
// ===========================
function trackReading(surahNumber) {
    const readSurahs = getReadSurahs();
    if (!readSurahs.includes(surahNumber)) {
        readSurahs.push(surahNumber);
        localStorage.setItem('quran_read_surahs', JSON.stringify(readSurahs));
    }

    // Track reading history
    const history = getReadingHistory();
    history.unshift({
        surahNumber: surahNumber,
        surahName: surahData.find(s => s.number === surahNumber)?.englishName || 'Unknown',
        date: new Date().toISOString()
    });

    // Keep only last 20 entries
    if (history.length > 20) {
        history.length = 20;
    }

    localStorage.setItem('quran_reading_history', JSON.stringify(history));

    updateStreak();
}

function getReadSurahs() {
    const surahs = localStorage.getItem('quran_read_surahs');
    return surahs ? JSON.parse(surahs) : [];
}

function getReadingHistory() {
    const history = localStorage.getItem('quran_reading_history');
    return history ? JSON.parse(history) : [];
}

function startReadingTimer() {
    readingStartTime = Date.now();
}

function stopReadingTimer() {
    if (readingStartTime) {
        const duration = Math.floor((Date.now() - readingStartTime) / 60000); // minutes
        const totalTime = parseInt(localStorage.getItem('quran_reading_time') || '0');
        localStorage.setItem('quran_reading_time', totalTime + duration);
        readingStartTime = null;
    }
}

function updateStreak() {
    const history = getReadingHistory();
    if (history.length === 0) {
        localStorage.setItem('quran_streak', '0');
        return;
    }

    let streak = 1;
    const today = new Date().setHours(0, 0, 0, 0);
    const lastRead = new Date(history[0].date).setHours(0, 0, 0, 0);

    if (today === lastRead) {
        // Check previous days
        for (let i = 1; i < history.length; i++) {
            const prevDate = new Date(history[i].date).setHours(0, 0, 0, 0);
            const expectedDate = lastRead - (i * 86400000); // i days before

            if (prevDate === expectedDate) {
                streak++;
            } else {
                break;
            }
        }
    } else {
        streak = 0;
    }

    localStorage.setItem('quran_streak', streak.toString());
}

function loadStatistics() {
    const readSurahs = getReadSurahs();
    const totalTime = parseInt(localStorage.getItem('quran_reading_time') || '0');
    const streak = parseInt(localStorage.getItem('quran_streak') || '0');
    const history = getReadingHistory();

    elements.surahReadCount.textContent = readSurahs.length;
    elements.readingTime.textContent = totalTime;
    elements.streakDays.textContent = streak;

    const percentage = Math.round((readSurahs.length / 114) * 100);
    elements.surahPercentage.textContent = `${percentage}%`;
    elements.surahProgress.style.width = `${percentage}%`;

    // Render history
    if (history.length === 0) {
        elements.readingHistoryList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <p>Belum ada riwayat bacaan</p>
            </div>
        `;
    } else {
        elements.readingHistoryList.innerHTML = '';
        history.slice(0, 10).forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';

            const date = new Date(item.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });

            historyItem.innerHTML = `
                <div class="history-info">
                    <h4>${item.surahName}</h4>
                    <p>Surah ${item.surahNumber}</p>
                </div>
                <div class="history-date">${date}</div>
            `;

            elements.readingHistoryList.appendChild(historyItem);
        });
    }
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

function continueReading() {
    const lastRead = localStorage.getItem('quran_last_read');
    if (lastRead) {
        const data = JSON.parse(lastRead);
        fetchSurahDetail(data.number);
        showPage('surah');
    } else {
        showToast('Belum ada bacaan terakhir');
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

function shareAyah(ayah) {
    const text = `${ayah.arabic}\n\n${ayah.translation}\n\n(QS. ${currentSurah.info.englishName}: ${ayah.number})`;

    if (navigator.share) {
        navigator.share({
            title: `QS. ${currentSurah.info.englishName}: ${ayah.number}`,
            text: text
        }).catch(err => console.log('Error sharing:', err));
    } else {
        copyAyah(ayah);
        showToast('Link disalin ke clipboard');
    }
}

function randomSurah() {
    const randomNum = Math.floor(Math.random() * 114) + 1;
    fetchSurahDetail(randomNum);
    showPage('surah');
}

function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ===========================
// Sidebar Functions
// ===========================
function openSidebar() {
    elements.sidebar.classList.add('active');
    elements.sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    elements.sidebar.classList.remove('active');
    elements.sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleSidebar() {
    if (elements.sidebar.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// ===========================
// Event Listeners
// ===========================
function setupEventListeners() {
    // Sidebar toggle
    elements.sidebarToggle.addEventListener('click', toggleSidebar);
    elements.sidebarClose.addEventListener('click', closeSidebar);
    elements.sidebarOverlay.addEventListener('click', closeSidebar);

    // Sidebar tabs
    elements.sidebarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            elements.sidebarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding content
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.sidebar-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`.sidebar-content[data-content="${tabName}"]`).classList.add('active');

            // Update search placeholder
            if (tabName === 'juz') {
                elements.searchInput.placeholder = 'Cari juz...';
            } else {
                elements.searchInput.placeholder = 'Cari surah...';
            }
        });
    });

    // Navigation (Desktop)
    elements.navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showPage(btn.dataset.page);
        });
    });

    // Navigation (Mobile)
    elements.mobileNavItems.forEach(btn => {
        btn.addEventListener('click', () => {
            showPage(btn.dataset.page);
        });
    });

    elements.backBtn.addEventListener('click', () => {
        showPage('home');
        stopReadingTimer();
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

    // Quick access buttons
    elements.continueReadingBtn.addEventListener('click', continueReading);
    elements.randomSurahBtn.addEventListener('click', randomSurah);
    elements.searchAyahBtn.addEventListener('click', openSearchModal);

    // Settings
    elements.settingsBtn.addEventListener('click', openSettingsModal);
    elements.closeSettings.addEventListener('click', closeSettingsModal);
    elements.settingsModal.addEventListener('click', (e) => {
        if (e.target === elements.settingsModal) {
            closeSettingsModal();
        }
    });

    // Notes modal
    elements.closeNoteModal.addEventListener('click', closeNoteModalFn);
    elements.cancelNote.addEventListener('click', closeNoteModalFn);
    elements.saveNote.addEventListener('click', saveNoteFunction);
    elements.noteModal.addEventListener('click', (e) => {
        if (e.target === elements.noteModal) {
            closeNoteModalFn();
        }
    });

    // Search modal
    elements.closeSearchModal.addEventListener('click', closeSearchModalFn);
    elements.searchModal.addEventListener('click', (e) => {
        if (e.target === elements.searchModal) {
            closeSearchModalFn();
        }
    });

    // Tafsir panel
    elements.showTafsirPanel?.addEventListener('click', () => {
        if (currentSurah && currentSurah.ayahs.length > 0) {
            showTafsir(currentSurah.ayahs[0]);
        }
    });
    elements.closeTafsir.addEventListener('click', closeTafsirPanel);

    // Font size controls
    elements.increaseFontBtn.addEventListener('click', increaseFontSize);
    elements.decreaseFontBtn.addEventListener('click', decreaseFontSize);

    // Reading controls
    elements.toggleTranslation.addEventListener('click', toggleTranslationVisibility);
    elements.toggleReadingMode.addEventListener('click', toggleReadingMode);

    // Load font size
    loadFontSize();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopReadingTimer();
});

// ===========================
// Reading Progress Indicator
// ===========================
function updateReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
}

window.addEventListener('scroll', updateReadingProgress);
window.addEventListener('resize', updateReadingProgress);

// ===========================
// Floating Action Buttons
// ===========================
function setupFAB() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const quickSearchBtn = document.getElementById('quick-search-fab');
    const fabContainer = document.getElementById('fab-container');

    // Scroll to top functionality
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Quick search FAB
    if (quickSearchBtn) {
        quickSearchBtn.addEventListener('click', openSearchModal);
    }

    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            fabContainer.style.opacity = '1';
            fabContainer.style.visibility = 'visible';
            fabContainer.style.transform = 'translateY(0)';
        } else {
            fabContainer.style.opacity = '0';
            fabContainer.style.visibility = 'hidden';
            fabContainer.style.transform = 'translateY(20px)';
        }
    });

    // Initialize FAB state
    fabContainer.style.transition = 'all 0.3s ease';
    fabContainer.style.opacity = '0';
    fabContainer.style.visibility = 'hidden';
    fabContainer.style.transform = 'translateY(20px)';
}

// Initialize FAB when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFAB);
} else {
    setupFAB();
}
