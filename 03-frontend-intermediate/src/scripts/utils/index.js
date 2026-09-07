export function showFormattedDate(date, locale = 'id-ID', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Membungkus pembaruan DOM dengan View Transition API bila tersedia.
 * Bila browser belum mendukung, callback tetap dijalankan (progressive enhancement).
 */
export function startViewTransition(callback) {
  if (!document.startViewTransition) {
    return Promise.resolve(callback());
  }
  return document.startViewTransition(callback).finished.catch(() => {});
}
