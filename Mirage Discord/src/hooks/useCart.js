import { useCallback, useState } from "react";
import { cartApi } from "../services/shopApi";

export function useCart(user) {
  const [cart, setCart] = useState({ items: [], total: "0.00" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const restoreCart = useCallback(async () => {
    if (!user) {
      setCart({ items: [], total: "0.00" });
      return;
    }

    setIsLoading(true);

    try {
      const data = await cartApi.getCart();
      setCart(data.cart || { items: [], total: "0.00" });
      setError(null);
    } catch (err) {
      console.error("Failed to restore cart:", err);
      setError(err.message || "Cart restore failed");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const updateCartQuantity = useCallback(
    async (productId, quantity) => {
      if (!user) return;

      const previousCart = cart;

      const safeQuantity = Math.max(0, Number(quantity) || 0);

      if (safeQuantity === 0) {
        try {
          const data = await cartApi.deleteCartItem(productId);
          setCart(data.cart || { items: [], total: "0.00" });
          setError(null);
          return;
        } catch (err) {
          setCart(previousCart);
          setError(err.message || "Failed to remove item from cart");
          return;
        }
      }

      const optimisticItems = (cart.items || []).map((item) =>
        item.productId === productId
          ? { ...item, quantity: safeQuantity }
          : item,
      );

      const newTotal = optimisticItems
        .reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
        .toFixed(2);

      setCart({
        items: optimisticItems,
        total: newTotal,
      });

      try {
        const data = await cartApi.updateCartItem(productId, safeQuantity);
        setCart(data.cart || { items: [], total: "0.00" });
        setError(null);
      } catch (err) {
        console.error("Failed to update cart quantity:", err);
        setCart(previousCart);
        setError(err.message || "Failed to update cart quantity");
      }
    },
    [user, cart],
  );

  const addToCart = useCallback(
    (item) => {
      if (!user) return;

      const existingItem = (cart.items || []).find(
        (cartItem) => cartItem.productId === item.id,
      );

      const nextQuantity = (existingItem?.quantity || 0) + 1;

      updateCartQuantity(item.id, nextQuantity);
    },
    [user, cart.items, updateCartQuantity],
  );

  const removeFromCart = useCallback(
    async (productId) => {
      if (!user) return;

      const previousCart = cart;

      try {
        const data = await cartApi.deleteCartItem(productId);
        setCart(data.cart || { items: [], total: "0.00" });
        setError(null);
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
        setCart(previousCart);
        setError(err.message || "Failed to remove item from cart");
      }
    },
    [user, cart],
  );

  const clearCart = useCallback(async () => {
    if (!user) return;

    const previousCart = cart;

    try {
      const data = await cartApi.deleteCart();
      setCart(data.cart || { items: [], total: "0.00" });
      setError(null);
    } catch (err) {
      console.error("Failed to clear cart:", err);
      setCart(previousCart);
      setError(err.message || "Failed to clear cart");
    }
  }, [user, cart]);

  return {
    cart,
    setCart,
    isLoading,
    error,
    restoreCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  };
}
