import CONFIG from '../config';

export function getAccessToken() {
  try {
    return localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function putAccessToken(token, name = '') {
  try {
    localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token);
    if (name) localStorage.setItem(CONFIG.USER_NAME_KEY, name);
    return true;
  } catch {
    return false;
  }
}

export function getUserName() {
  try {
    return localStorage.getItem(CONFIG.USER_NAME_KEY) || '';
  } catch {
    return '';
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
    localStorage.removeItem(CONFIG.USER_NAME_KEY);
    return true;
  } catch {
    return false;
  }
}

export function isLoggedIn() {
  return Boolean(getAccessToken());
}
