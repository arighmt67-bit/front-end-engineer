// Modular Localization Controller for Lit Components & Application
const translations = {
  id: {
    appTitle: 'Story App',
    dashboard: 'Dasbor Cerita',
    addStory: 'Tambah Cerita',
    about: 'Tentang Aplikasi',
    heroTitle: 'Bagikan Cerita Nyata dari Sudut Duniamu',
    heroSubtitle: 'Platform visual tempat Anda menjelajahi ragam pengalaman, potret kehidupan, dan kisah inspiratif.',
    latestStories: 'Kisah Terkini',
    newStoryTitle: 'Bagikan Cerita Baru',
    newStorySubtitle: 'Unggah foto momen terbaik Anda dan sertakan deskripsi cerita yang mendalam.',
    formPhoto: 'Unggah Foto Momen',
    formPhotoHelp: 'Format JPG, PNG, atau WebP (maks 5MB).',
    formPhotoInvalid: 'Harap pilih berkas foto untuk cerita Anda.',
    formDescription: 'Deskripsi Cerita',
    formDescriptionPlaceholder: 'Tuliskan pengalaman atau narasi di balik momen ini...',
    formDescriptionInvalid: 'Harap isi deskripsi cerita (minimal 10 karakter).',
    submitButton: 'Publikasikan Cerita',
    cancelButton: 'Batal',
    createdBy: 'Dibuat oleh',
    publishedOn: 'Diterbitkan pada',
    footerRights: 'Seluruh hak cipta dilindungi.',
    footerTagline: 'Membangun ekosistem web modern dengan Web Components & Lit.',
    languageSelect: 'Bahasa',
    emptyState: 'Belum ada cerita yang tersedia.',
    successAlert: 'Cerita berhasil ditambahkan ke daftar!',
    previewText: 'Pratinjau Foto Momen'
  },
  en: {
    appTitle: 'Story App',
    dashboard: 'Story Dashboard',
    addStory: 'Share Story',
    about: 'About App',
    heroTitle: 'Share Authentic Stories Across the Globe',
    heroSubtitle: 'A visual platform where you discover diverse experiences, life portraits, and inspiring moments.',
    latestStories: 'Latest Stories',
    newStoryTitle: 'Post a New Story',
    newStorySubtitle: 'Upload your best visual capture and write down the story behind it.',
    formPhoto: 'Upload Story Photo',
    formPhotoHelp: 'JPG, PNG, or WebP format (max 5MB).',
    formPhotoInvalid: 'Please provide a valid image for your story.',
    formDescription: 'Story Narrative',
    formDescriptionPlaceholder: 'Write down your thoughts or narrative behind this moment...',
    formDescriptionInvalid: 'Please enter a description (at least 10 characters).',
    submitButton: 'Publish Story',
    cancelButton: 'Cancel',
    createdBy: 'Shared by',
    publishedOn: 'Published on',
    footerRights: 'All rights reserved.',
    footerTagline: 'Building modern web experiences using Lit & Web Components.',
    languageSelect: 'Language',
    emptyState: 'No stories available yet.',
    successAlert: 'Story successfully posted to list!',
    previewText: 'Photo Preview'
  }
};

let currentLocale = localStorage.getItem('story_app_locale') || 'id';

export function getLocale() {
  return currentLocale;
}

export function setLocale(locale) {
  if (translations[locale]) {
    currentLocale = locale;
    localStorage.setItem('story_app_locale', locale);
    window.dispatchEvent(new CustomEvent('locale-changed', { detail: { locale } }));
  }
}

export function t(key) {
  return (translations[currentLocale] && translations[currentLocale][key]) || key;
}
