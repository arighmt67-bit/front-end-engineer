import { CAMERA_CONFIG } from './config.js';

export const logError = (context, error) => {
  console.error(`❌ ${context}:`, error);
};

export const isWebGPUSupported = () => {
  return typeof navigator !== 'undefined' && 'gpu' in navigator;
};

export const isMobileDevice = () => {
  return navigator.userAgentData?.mobile ?? /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const createDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const validateModelMetadata = (metadata) => {
  return metadata && metadata.labels && Array.isArray(metadata.labels);
};

export const getCameraErrorMessage = (error) => {
  const errorMessages = {
    NotAllowedError: 'Izin kamera ditolak. Harap izinkan akses kamera.',
    NotFoundError: 'Tidak ada kamera ditemukan pada perangkat ini.',
    NotReadableError: 'Kamera sedang digunakan oleh aplikasi lain.'
  };

  return errorMessages[error.name] || 'Gagal memulai kamera';
};

export const getCameraConfig = () => {
  const mobile = isMobileDevice();
  return {
    defaultFPS: CAMERA_CONFIG.defaultFPS,
    fpsRange: CAMERA_CONFIG.fpsRange,
    resolution: mobile
      ? CAMERA_CONFIG.mobileResolution
      : CAMERA_CONFIG.desktopResolution,
    facingMode: mobile
      ? CAMERA_CONFIG.mobileFacingMode
      : CAMERA_CONFIG.desktopFacingMode
  };
};

export const getCameraConstraints = (selectedCameraId, currentFPS = CAMERA_CONFIG.defaultFPS) => {
  const config = getCameraConfig();
  return {
    video: {
      deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
      width: { ideal: config.resolution.width },
      height: { ideal: config.resolution.height },
      facingMode: selectedCameraId ? undefined : config.facingMode,
      frameRate: { ideal: currentFPS, max: 60 }
    }
  };
};

export const createModelProgressCallback = (onProgress, throttleMs = 150) => {
  const fileProgress = {};
  let lastMessage = '';
  let lastCallTime = 0;

  return (progress) => {
    if (progress.status !== 'progress' || !progress.file) return;

    fileProgress[progress.file] = Math.round(progress.progress || 0);

    const values = Object.values(fileProgress);
    const totalPercentage = values.length > 0
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0;

    const message = `Mengunduh model AI... (${totalPercentage}%)`;

    const now = Date.now();
    if (message === lastMessage && now - lastCallTime < throttleMs) return;
    lastCallTime = now;
    lastMessage = message;

    if (onProgress && typeof onProgress === 'function') {
      onProgress({
        percentage: totalPercentage,
        message
      });
    }
  };
};
