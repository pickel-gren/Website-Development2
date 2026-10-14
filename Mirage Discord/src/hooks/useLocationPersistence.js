import { useEffect } from "react";

export const useLocationPersistence = (activeTab, setActiveTab) => {
  // Save activeTab and scroll position to localStorage whenever they change
  useEffect(() => {
    const scrollPosition = window.scrollY;
    localStorage.setItem("lastActiveTab", activeTab);
    localStorage.setItem("lastScrollPosition", scrollPosition.toString());
  }, [activeTab]);

  // Restore activeTab and scroll position on mount
  useEffect(() => {
    const savedTab = localStorage.getItem("lastActiveTab");
    const savedScroll = localStorage.getItem("lastScrollPosition");

    if (savedTab) {
      setActiveTab(savedTab);
    }

    // Restore scroll position after a short delay (let DOM render first)
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll));
      }, 100);
    }
  }, []); // Only run on mount
};

export const clearLocationPersistence = () => {
  localStorage.removeItem("lastActiveTab");
  localStorage.removeItem("lastScrollPosition");
};