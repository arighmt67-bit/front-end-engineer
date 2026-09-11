import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgpu';
import { TENSORFLOW_CONFIG } from '../utils/config.js';
import { validateModelMetadata, logError, isWebGPUSupported } from '../utils/common.js';

export class DetectionService {
  constructor() {
    this.model = null;
    this.labels = [];
    this.config = TENSORFLOW_CONFIG;
    this.backendName = null;
  }

  // TODO [Basic] Muat model dan metadata secara bersamaan, lalu simpan ke instance
  // TODO [Advance] Implementasikan strategi Backend Adaptive
  async loadModel() {
    try {
      // Strategi backend adaptif: prioritas WebGPU jika tersedia, fallback ke WebGL / WASM / CPU
      if (isWebGPUSupported()) {
        try {
          await tf.setBackend('webgpu');
          this.backendName = 'webgpu';
        } catch (gpuError) {
          console.warn('WebGPU gagal diinisialisasi, fallback ke webgl:', gpuError);
          await tf.setBackend('webgl');
          this.backendName = 'webgl';
        }
      } else {
        await tf.setBackend('webgl');
        this.backendName = 'webgl';
      }

      await tf.ready();

      const [metadata, model] = await Promise.all([
        fetch(this.config.metadataPath).then((r) => {
          if (!r.ok) throw new Error(`HTTP error ${r.status} fetching metadata`);
          return r.json();
        }),
        tf.loadLayersModel(this.config.modelPath)
      ]);

      if (!validateModelMetadata(metadata)) {
        throw new Error('Metadata tidak valid: array label tidak ditemukan');
      }

      this.labels = metadata.labels;
      this.model = model;

      return {
        success: true,
        labels: this.labels,
        backend: this.backendName || tf.getBackend()
      };
    } catch (error) {
      logError('Gagal memuat model TensorFlow.js', error);
      throw new Error(`Gagal memuat model: ${error.message}`);
    }
  }

  // TODO [Basic] Lakukan prediksi pada elemen gambar yang diberikan dan kembalikan hasilnya
  // [Advance] Manajemen memori konsisten menggunakan tf.tidy() dan dispose()
  async predict(imageElement) {
    if (!this.model) {
      throw new Error('Model belum dimuat. Panggil loadModel() terlebih dahulu.');
    }

    if (!imageElement) {
      throw new Error('Elemen gambar diperlukan untuk prediksi');
    }

    let tensor = null;
    let predictions = null;

    try {
      tensor = tf.tidy(() => {
        return tf.browser
          .fromPixels(imageElement)
          .resizeBilinear(this.config.inputSize)
          .div(this.config.normalizationFactor)
          .expandDims(0);
      });

      predictions = this.model.predict(tensor);
      const values = await predictions.data();

      const maxIndex = values.indexOf(Math.max(...values));
      const confidence = Math.round(values[maxIndex] * 100);
      const className = this.labels[maxIndex] || 'Unknown';
      const isValid = confidence >= (this.config.confidenceThreshold * 100);

      return {
        className,
        confidence,
        score: values[maxIndex],
        isValid,
        backend: tf.getBackend()
      };
    } catch (error) {
      logError('Kesalahan prediksi', error);
      throw new Error(`Prediksi gagal: ${error.message}`);
    } finally {
      if (tensor) tensor.dispose();
      if (predictions) predictions.dispose();
    }
  }

  // TODO [Basic] Periksa apakah model sudah dimuat dan siap digunakan
  isLoaded() {
    return !!this.model && this.labels.length > 0;
  }
}
