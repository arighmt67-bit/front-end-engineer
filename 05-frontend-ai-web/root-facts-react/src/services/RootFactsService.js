import { pipeline, env } from '@huggingface/transformers';
import { TRANSFORMERS_CONFIG, TONE_CONFIG } from '../utils/config.js';
import {
  createDelay,
  isWebGPUSupported,
  logError,
  createModelProgressCallback
} from '../utils/common.js';

env.allowLocalModels = false;
env.useBrowserCache = true;

export class RootFactsService {
  constructor(onProgress = null) {
    this.generator = null;
    this.isModelLoaded = false;
    this.isGenerating = false;
    this.config = TRANSFORMERS_CONFIG;
    this.currentBackend = null;
    this.currentTone = TONE_CONFIG.defaultTone;
    this.onProgress = onProgress;
  }

  // TODO [Basic] Muat model dan inisialisasi pipeline text2text-generation
  // TODO [Advance] Implementasikan strategi Backend Adaptive
  async loadModel() {
    try {
      // Backend adaptif: WebGPU jika didukung browser/GPU, fallback otomatis ke WASM
      const device = isWebGPUSupported() ? 'webgpu' : 'wasm';

      this.generator = await pipeline(
        'text2text-generation',
        this.config.modelName,
        {
          dtype: 'q4',
          device,
          progress_callback: createModelProgressCallback(this.onProgress)
        }
      );

      this.isModelLoaded = true;
      this.currentBackend = device;

      return {
        success: true,
        model: this.config.modelName,
        backend: this.currentBackend
      };
    } catch (error) {
      logError('Kesalahan memuat model Transformers.js', error);
      throw new Error(`Gagal memuat model generasi konten: ${error.message}`);
    }
  }

  // TODO [Advance] Konfigurasi tone fakta yang dihasilkan
  setTone(tone) {
    if (TONE_CONFIG.availableTones.some((t) => t.value === tone)) {
      this.currentTone = tone;
    }
  }

  // TODO [Basic] Lakukan prediksi pada elemen gambar yang diberikan dan kembalikan hasilnya
  // TODO [Skilled] Konfigurasikan parameter generasi berdasarkan kebutuhan
  // TODO [Advance] Implemenasikan parameter tone untuk mengatur nada fakta yang dihasilkan
  async generateFacts(vegetableName) {
    if (!this.isModelLoaded || this.isGenerating) {
      throw new Error('Model belum siap atau sedang menghasilkan konten');
    }

    if (!vegetableName || typeof vegetableName !== 'string') {
      throw new Error('Nama sayuran yang valid diperlukan');
    }

    // Pembersihan input untuk sanitasi prompt
    const cleanedName = vegetableName.trim().slice(0, 50).replace(/[^\w\s-]/gi, '');

    try {
      this.isGenerating = true;

      await createDelay(this.config.generationDelay);

      const tonePromptBuilder = TONE_CONFIG.prompts[this.currentTone] || TONE_CONFIG.prompts.normal;
      const prompt = tonePromptBuilder(cleanedName);

      const result = await this.generator(prompt, {
        max_new_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        do_sample: true,
        top_p: this.config.topP
      });

      const generatedText = result[0]?.generated_text || '';

      return {
        fact: generatedText.trim(),
        vegetable: cleanedName,
        tone: this.currentTone,
        backend: this.currentBackend
      };
    } catch (error) {
      logError('Kesalahan menghasilkan fakta sayuran', error);
      throw new Error(`Gagal menghasilkan fakta sayuran: ${error.message}`);
    } finally {
      this.isGenerating = false;
    }
  }

  // TODO [Basic] Periksa apakah model sudah dimuat dan siap digunakan
  isReady() {
    return this.isModelLoaded && !this.isGenerating;
  }
}
