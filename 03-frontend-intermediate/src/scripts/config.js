const CONFIG = {
  BASE_URL: 'https://story-api.dicoding.dev/v1',
  ACCESS_TOKEN_KEY: 'storyapp_token',
  USER_NAME_KEY: 'storyapp_name',
  DEFAULT_LOCATION: [-2.5489, 118.0149],
  // VAPID public key resmi dari dokumentasi Dicoding Story API.
  VAPID_PUBLIC_KEY:
    'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk',
  DATABASE_NAME: 'storyapp-db',
  DATABASE_VERSION: 1,
  STORE_SAVED: 'saved-stories',
  STORE_OUTBOX: 'outbox',
};

export default CONFIG;
