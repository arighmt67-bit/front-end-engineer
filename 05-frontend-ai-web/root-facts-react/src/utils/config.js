export const APP_CONFIG = {
  detectionConfidenceThreshold: 70,
  analyzingDelay: 2000,
  factsGenerationDelay: 2000,
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
  temperature: 0.3,
  topP: 0.8,
  generationDelay: 500
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
    normal: (vegetable) =>
      `Tell an interesting and educational fun fact about ${vegetable} in 1-2 concise sentences.`,
    funny: (vegetable) =>
      `Tell a funny, humorous, and entertaining joke or fun fact about ${vegetable} in 1-2 sentences.`,
    professional: (vegetable) =>
      `Provide a professional, scientifically accurate nutritional fact about ${vegetable} in 1-2 formal sentences.`,
    casual: (vegetable) =>
      `Share a casual, cool, and easy-to-understand fun fact about ${vegetable} like talking to a friend.`
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
