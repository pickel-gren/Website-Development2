import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import LogoAndJoinSection from "../components/LogoAndJoinSection.jsx";
import MainContent from "../components/MainContent.jsx";
import Footer from "../components/Footer";
import Disclaimer from "../components/Disclaimer";
import { useLocationPersistence } from "../hooks/useLocationPersistence";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { categoriesApi, productsApi } from "../services/shopApi";
import { DEFAULT_CATEGORY } from "../utils/constants";
import "../index.css";
import styles1 from "../assets/style";

export default function Home() {
  const { user, loading: userLoading } = useAuth();
  const { cart, restoreCart, addToCart, removeFromCart, updateCartQuantity, clearCart } =
    useCart(user);

  const [activeTab, setActiveTab] = useState(DEFAULT_CATEGORY);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const categories = await categoriesApi.getCategories();
        const allProducts = [];

        for (const category of categories) {
          const products = await productsApi.getProducts(category.key);
          allProducts.push(...products);
        }

        const normalized = allProducts.map((item) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          type: item.category,
          details: item.details || "",
          image: item.image || "",
        }));

        setItems(normalized);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

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
    <div className="min-h-screen w-full flex flex-col bg-transparent text-white font-sans relative overflow-hidden">
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        clearCart={clearCart}
      />
      <LogoAndJoinSection />
      <MainContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        items={items}
        addToCart={addItemToCart}
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        user={user}
        loading={loading}
      />
      <Footer />
      <Disclaimer />
    </div>
  );
}
