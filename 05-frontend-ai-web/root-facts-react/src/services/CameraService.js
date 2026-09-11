import { CAMERA_CONFIG } from '../utils/config.js';
import {
  getCameraConstraints,
  getCameraErrorMessage,
  logError
} from '../utils/common.js';

export class CameraService {
  constructor() {
    this.stream = null;
    this.video = null;
    this.canvas = null;
    this.config = CAMERA_CONFIG;
    this.fps = CAMERA_CONFIG.defaultFPS;
    this.cameras = [];
    this.selectedCameraId = null;
  }

  setVideoElement(videoElement) {
    this.video = videoElement;
  }

  setCanvasElement(canvasElement) {
    this.canvas = canvasElement;
  }

  // TODO [Basic] Tambahkan konfigurasi kamera untuk mendapatkan daftar perangkat input video
  // TODO [Basic] Dapatkan constraints kamera berdasarkan konfigurasi dan kamera yang dipilih
  async loadCameras() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        throw new Error('MediaDevices API tidak didukung pada browser ini');
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cameras = devices.filter((device) => device.kind === 'videoinput');

      return this.cameras;
    } catch (error) {
      logError('Gagal memuat daftar kamera', error);
      return [];
    }
  }

  // TODO [Basic] Memulai kamera dengan perangkat yang dipilih dan menampilkan pada elemen video
  async startCamera(selectedCameraId = null) {
    try {
      this.stopCamera();

      if (selectedCameraId) {
        this.selectedCameraId = selectedCameraId;
      }

      const constraints = getCameraConstraints(this.selectedCameraId, this.fps);
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.video) {
        this.video.srcObject = this.stream;

        await new Promise((resolve) => {
          if (this.video.readyState >= 2) {
            resolve();
          } else {
            this.video.onloadedmetadata = () => {
              this.video.play().then(resolve).catch(resolve);
            };
          }
        });

        await this.video.play().catch(() => {});
      }

      return this.stream;
    } catch (error) {
      logError('Gagal memulai kamera', error);
      const userFriendlyMessage = getCameraErrorMessage(error);
      throw new Error(userFriendlyMessage);
    }
  }

  // TODO [Basic] Menghentikan siaran kamera dan membersihkan sumber daya
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.video) {
      this.video.srcObject = null;
    }
  }

  // TODO [Skilled] Implementasikan metode untuk mengatur FPS kamera
  setFPS(fps) {
    const numericFps = Number(fps);
    if (numericFps >= this.config.fpsRange.min && numericFps <= this.config.fpsRange.max) {
      this.fps = numericFps;
    }
  }

  // TODO [Basic] Periksa apakah kamera sedang aktif
  isActive() {
    return !!(this.stream && this.stream.active && this.stream.getVideoTracks().length > 0);
  }

  // TODO [Basic] Periksa apakah elemen video siap untuk digunakan
  isReady() {
    return !!(
      this.video &&
      this.video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      this.video.videoWidth > 0 &&
      this.video.videoHeight > 0
    );
  }

  captureFrame() {
    if (!this.isReady()) {
      return null;
    }

    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
    }

    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    return this.canvas;
  }
}
