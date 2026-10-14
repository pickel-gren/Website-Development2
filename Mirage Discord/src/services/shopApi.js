import { API_ENDPOINTS } from "../config/api";

class ApiError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.message || data.error || "API request failed",
      data.error || "REQUEST_FAILED",
    );
  }

  return data;
}

export const categoriesApi = {
  async getCategories() {
    const response = await fetch(API_ENDPOINTS.CATEGORIES, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await handleResponse(response);
    return data.categories || [];
  },
};

export const productsApi = {
  async getProducts(category) {
    const url = category
      ? `${API_ENDPOINTS.PRODUCTS}?category=${encodeURIComponent(category)}`
      : API_ENDPOINTS.PRODUCTS;

    const response = await fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await handleResponse(response);
    return data.products || [];
  },
};

export const cartApi = {
  async getCart() {
    const response = await fetch(API_ENDPOINTS.CART, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
    }

    return handleResponse(response);
  },

  async updateCartItem(productId, quantity) {
    const response = await fetch(API_ENDPOINTS.CART_ITEM(productId), {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    if (response.status === 401) {
      throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
    }

    return handleResponse(response);
  },

  async deleteCartItem(productId) {
    const response = await fetch(API_ENDPOINTS.CART_ITEM(productId), {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
    }

    return handleResponse(response);
  },

  async deleteCart() {
    const response = await fetch(API_ENDPOINTS.CART, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
    }

    return handleResponse(response);
  },
};

export { ApiError };
