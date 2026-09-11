import { pipeline, env } from '@huggingface/transformers';
import { TRANSFORMERS_CONFIG, TONE_CONFIG } from '../utils/config.js';
import {
  createDelay,
  logError,
  checkWebGPUAvailability,
  createModelProgressCallback
} from '../utils/common.js';

// Pengaturan Transformers.js client-side
env.allowLocalModels = false;
env.useBrowserCache = true;

// Optimasi backend WASM threading
if (env.backends?.onnx?.wasm) {
  env.backends.onnx.wasm.proxy = false;
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
    env.backends.onnx.wasm.numThreads = Math.min(navigator.hardwareConcurrency, 4);
  }
}

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

  // Muat model dan inisialisasi pipeline text2text-generation
  // Implementasikan strategi Backend Adaptive: WebGPU -> Fallback WASM
  async loadModel() {
    try {
      const hasWebGPU = await checkWebGPUAvailability();
      let device = 'wasm';

      if (hasWebGPU) {
        try {
          this.generator = await pipeline(
            'text2text-generation',
            this.config.modelName,
            {
              dtype: 'q4',
              device: 'webgpu',
              progress_callback: createModelProgressCallback(this.onProgress)
            }
          );
          device = 'webgpu';
        } catch (gpuPipelineError) {
          console.warn('Pipeline Transformers.js gagal pada WebGPU, fallback ke wasm:', gpuPipelineError);
          this.generator = null;
        }
      }

      if (!this.generator) {
        this.generator = await pipeline(
          'text2text-generation',
          this.config.modelName,
          {
            dtype: 'q4',
            device: 'wasm',
            progress_callback: createModelProgressCallback(this.onProgress)
          }
        );
        device = 'wasm';
      }

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

  // Konfigurasi tone fakta yang dihasilkan
  setTone(tone) {
    if (TONE_CONFIG.availableTones.some((t) => t.value === tone)) {
      this.currentTone = tone;
    }
  }

  // Lakukan generasi konten fakta sayuran dengan prompt tone dinamis
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

  // Periksa apakah model sudah dimuat dan siap digunakan
  isReady() {
    return this.isModelLoaded && !this.isGenerating;
  }
}
