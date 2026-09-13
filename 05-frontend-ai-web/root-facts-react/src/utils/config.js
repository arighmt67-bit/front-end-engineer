export const APP_CONFIG = {
  detectionConfidenceThreshold: 70,
  analyzingDelay: 2000,
  factsGenerationDelay: 1500,
  detectionRetryInterval: 100,
  cameraStartDelay: 500
};

export const TENSORFLOW_CONFIG = {
  modelPath: '/model/model.json',
  metadataPath: '/model/metadata.json',
  inputSize: [224, 224],
  normalizationFactor: 255.0,
  confidenceThreshold: 0.70
};

export const TRANSFORMERS_CONFIG = {
  modelName: 'Xenova/LaMini-Flan-T5-77M',
  maxTokens: 100,
  temperature: 0.7, // Set 0.7 with sampling to produce creative, diverse outputs per reviewer suggestion
  topP: 0.9,
  generationDelay: 300
};

export const TONE_CONFIG = {
  availableTones: [
    { value: 'normal', label: 'Normal' },
    { value: 'funny', label: 'Fun & Playful' },
    { value: 'professional', label: 'Scientific / Professional' },
    { value: 'casual', label: 'Casual & Friendly' }
  ],
  defaultTone: 'normal',
  prompts: {
    normal: (vegetable, context = '') =>
      context
        ? `describe vegetable ${vegetable} in informative way with one sentences. Context: ${context}`
        : `describe vegetable ${vegetable} in informative way with one sentences`,
    funny: (vegetable, context = '') =>
      context
        ? `describe vegetable ${vegetable} in humorous and fun way with one sentences. Context: ${context}`
        : `describe vegetable ${vegetable} in humorous and fun way with one sentences`,
    professional: (vegetable, context = '') =>
      context
        ? `describe vegetable ${vegetable} in scientific and nutritional way with one sentences. Context: ${context}`
        : `describe vegetable ${vegetable} in scientific and nutritional way with one sentences`,
    casual: (vegetable, context = '') =>
      context
        ? `describe vegetable ${vegetable} in casual and friendly way with one sentences. Context: ${context}`
        : `describe vegetable ${vegetable} in casual and friendly way with one sentences`
  }
};

export const CAMERA_CONFIG = {
  defaultFPS: 30,
  fpsRange: { min: 15, max: 60 },
  desktopResolution: { width: 640, height: 480 },
  mobileResolution: { width: 480, height: 640 },
  desktopFacingMode: 'user',
  mobileFacingMode: 'environment'
};

export const isValidDetection = (result) => {
  const { detectionConfidenceThreshold } = APP_CONFIG;
  return result && result.isValid && result.confidence >= detectionConfidenceThreshold;
};
