export const BACKEND_URL = String(import.meta.env.VITE_APP_BACKEND).trim();

export const BASE_URL = `${BACKEND_URL}/api/cms`;
export const NODE_ENV = String(import.meta.env.VITE_NODE_ENV).trim();

export const APP_EMAIL = String(import.meta.env.VITE_APP_EMAIL).trim();
export const APP_PASSWORD = String(import.meta.env.VITE_APP_PASSWORD).trim();
