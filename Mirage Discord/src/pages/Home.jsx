import { useEffect, useState } from "react";

import Header from "../components/Header.jsx";
import LogoAndJoinSection from "../components/LogoAndJoinSection.jsx";
import MainContent from "../components/MainContent.jsx";
import Footer from "../components/Footer.jsx";
import Disclaimer from "../components/Disclaimer.jsx";

import { useLocationPersistence } from "../hooks/useLocationPersistence";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

import {
  categoriesApi,
  productsApi,
} from "../services/shopApi";

import {
  DEFAULT_CATEGORY,
} from "../utils/constants";

import "../index.css";
import styles1 from "../assets/style";

export default function Home() {
  const { user } = useAuth();

  const {
    cart,
    restoreCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  } = useCart(user);

  const [activeTab, setActiveTab] =
    useState(DEFAULT_CATEGORY);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useLocationPersistence(activeTab, setActiveTab);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles1;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    if (user) {
      restoreCart();
    }
  }, [user, restoreCart]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const categories =
          await categoriesApi.getCategories();

        const productLists = await Promise.all(
          categories.map((category) =>
            productsApi.getProducts(category.key),
          ),
        );

        const allProducts = productLists.flat();

        const normalizedProducts = allProducts.map((item) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          type: item.category,
          details: item.details || "",
          image: item.image || "",
        }));

        setItems(normalizedProducts);
      } catch (fetchError) {
        console.error(
          "Failed to load products:",
          fetchError,
        );

        setError(
          "Unable to load products. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const addItemToCart = (item) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    addToCart(item);
  };

  return (
    <div className="min-h-screen">
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        clearCart={clearCart}
      />

      <LogoAndJoinSection />

      {loading && (
        <p className="py-12 text-center text-white">
          Loading products...
        </p>
      )}

      {error && (
        <p className="py-12 text-center text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && (
        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          items={items}
          addToCart={addItemToCart}
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          user={user}
        />
      )}

      <Footer />
      <Disclaimer />
    </div>
  );
}

