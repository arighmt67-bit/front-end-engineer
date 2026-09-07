import CONFIG from '../config';
import { subscribePushNotification, unsubscribePushNotification } from '../data/api';

/** Konversi VAPID public key (base64url) menjadi Uint8Array. */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export function isPushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

async function getRegistration() {
  return navigator.serviceWorker.ready;
}

export async function getCurrentSubscription() {
  if (!isPushSupported()) return null;
  const registration = await getRegistration();
  return registration.pushManager.getSubscription();
}

export async function isSubscribed() {
  return Boolean(await getCurrentSubscription());
}

export async function subscribe() {
  if (!isPushSupported()) {
    throw new Error('Browser Anda tidak mendukung push notification.');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Izin notifikasi ditolak. Aktifkan lewat pengaturan browser.');
  }

  const registration = await getRegistration();
  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY),
  });

  const { endpoint, keys } = subscription.toJSON();

  try {
    await subscribePushNotification({ endpoint, keys });
  } catch (error) {
    await subscription.unsubscribe();
    throw error;
  }

  return subscription;
}

export async function unsubscribe() {
  const subscription = await getCurrentSubscription();
  if (!subscription) return;

  const { endpoint } = subscription.toJSON();
  try {
    await unsubscribePushNotification({ endpoint });
  } catch (error) {
    // Tetap lepas langganan di sisi browser walau server menolak.
    console.warn('Gagal memberi tahu server:', error.message);
  }
  await subscription.unsubscribe();
}
