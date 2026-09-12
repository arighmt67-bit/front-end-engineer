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
  maxTokens: 80,
  temperature: 0.1, // Turunkan dari 0.3 ke 0.1 agar tidak berhalusinasi / random
  topP: 0.7,
  generationDelay: 300
};

export const TONE_CONFIG = {
  availableTones: [
    { value: 'normal', label: 'Normal' },
    { value: 'funny', label: 'Lucu' },
    { value: 'professional', label: 'Profesional' },
    { value: 'casual', label: 'Santai' }
  ],
  defaultTone: 'normal',
  prompts: {
    normal: (vegetable, context = '') =>
      context
        ? `Context: ${context}\nQuestion: What is a key nutritional benefit of ${vegetable}?\nAnswer in one concise sentence:`
        : `State a factual nutritional benefit about ${vegetable} in 1 concise sentence:`,
    funny: (vegetable, context = '') =>
      context
        ? `Context: ${context}\nTell a fun and playful fact about ${vegetable} in 1 friendly sentence:`
        : `Tell a fun and playful fact about ${vegetable} in 1 friendly sentence:`,
    professional: (vegetable, context = '') =>
      context
        ? `Scientific Data: ${context}\nProvide a concise, scientifically accurate statement regarding the nutritional properties of ${vegetable}:`
        : `Provide a concise, scientifically accurate statement regarding the nutritional properties of ${vegetable}:`,
    casual: (vegetable, context = '') =>
      context
        ? `Fact: ${context}\nShare this cool fact about ${vegetable} like chatting with a friend in one sentence:`
        : `Share a cool fact about ${vegetable} like chatting with a friend in one sentence:`
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
