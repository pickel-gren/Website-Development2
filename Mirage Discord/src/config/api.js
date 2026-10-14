const API_BASE = import.meta.env.VITE_PORT_URL || "http://localhost:3000/api";

export const API_ENDPOINTS = {
  DISCORD_LOGIN: `${API_BASE}/user/auth/discord`,
  AUTH_ME: `${API_BASE}/user/auth/me`,
  AUTH_LOGOUT: `${API_BASE}/user/auth/logout`,
  AUTH_REFRESH: `${API_BASE}/user/auth/refresh`,

  CATEGORIES: `${API_BASE}/categories`,
  PRODUCTS: `${API_BASE}/products`,

  CART: `${API_BASE}/cart`,
  CART_ITEM: (productId) => `${API_BASE}/cart/items/${productId}`,
};

export default API_ENDPOINTS;
