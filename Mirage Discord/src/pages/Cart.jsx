import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, removeFromCart, updateCartQuantity, clearCart, closeCart }) {
  const [clearConfirmExiting, setClearConfirmExiting] = useState(false);
  const prevTotalRef = useRef(cart.total);
  const cartRef = useRef(null);
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const preventActions = (e) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    prevTotalRef.current = cart.total;
  }, [cart.total]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !(event.target.classList && event.target.classList.contains("cart-scrollbar"))
      ) {
        closeCart();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeCart]);

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const cancelClearCart = () => {
    setClearConfirmExiting(true);
    setTimeout(() => {
      setClearConfirmExiting(false);
      setShowClearConfirm(false);
    }, 250);
  };

  const handleCheckout = () => {
    alert("Checkout is a placeholder. Payment processing coming soon!");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const header = document.querySelector("[data-header]");
    if (header) header.style.visibility = "hidden";

    return () => {
      document.body.style.overflow = "";
      if (header) header.style.visibility = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 backdrop-blur-[4px] animate-fade-in-cart"
      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      data-cart-backdrop
      onContextMenu={preventActions}
      onDragStart={preventActions}
      onCopy={preventActions}
      onCut={preventActions}
    >
      <div
        ref={cartRef}
        className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-[rgba(255,255,255,0.18)] shadow-2xl backdrop-blur-[24px] transition-all duration-200"
        style={{ boxShadow: "0 12px 48px 0 #FAF3E1" }}
        onContextMenu={preventActions}
        onDragStart={preventActions}
        onCopy={preventActions}
        onCut={preventActions}
      >
        <div className="p-8 pt-6">
          <h1 className="mb-8 text-center text-3xl font-extrabold tracking-widest text-white [text-shadow:_0_2px_8px_rgba(80,80,80,0.18)]" style={{ background: "rgba(255,255,255,0.18)", borderRadius: "1rem", boxShadow: "0 2px 12px 0 rgba(80,80,80,0.10)", padding: "0.5rem 0" }}>
            Shopping Cart
          </h1>

          {cart.items.length === 0 ? (
            <div className="rounded-2xl border border-white/20 bg-[rgba(255,255,255,0.18)] p-8 text-center shadow-[0_0_24px_rgba(80,80,80,0.10)] transition-all duration-300">
              <p className="mb-4 text-lg text-white/80">Your cart is empty.</p>
              <button
                type="button"
                onClick={closeCart}
                className="inline-block cursor-pointer rounded-xl bg-[rgba(255,255,255,0.22)] px-6 py-3 font-semibold text-white shadow transition-all duration-200 hover:scale-100 hover:bg-white/10"
                aria-label="Continue Shopping"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div
                className="cart-scrollbar max-h-[45vh] space-y-4 overflow-y-auto pr-1 transition-all duration-300"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(255,255,255,0.25) rgba(255,255,255,0.10)",
                  scrollBehavior: "smooth",
                }}
              >
                {cart.items.map((item) => (
                  <div
                    key={item.productId || item.id}
                    className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 shadow-[0_0_24px_rgba(80,80,80,0.10)] backdrop-blur-md"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/20 p-2 shadow-lg backdrop-blur-md">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={`${item.name} Icon`}
                          className="h-12 w-12 rounded-xl object-contain"
                          draggable={false}
                        />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9 text-white" aria-hidden="true">
                          <circle cx="9" cy="20" r="1" />
                          <circle cx="19" cy="20" r="1" />
                          <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6" />
                        </svg>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-bold text-white">{item.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-lg font-extrabold text-green-500">
                          ${Number(item.price * (item.quantity || 1)).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-white/60">
                            ({item.quantity}x)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(
                            item.productId || item.id,
                            Math.max(1, (item.quantity || 1) - 1),
                          )
                        }
                        className="rounded-lg border border-white/20 bg-[rgba(255,255,255,0.22)] px-2 py-1 text-white shadow transition-all duration-200 hover:scale-105 hover:bg-white/25"
                      >
                        −
                      </button>

                      <span className="text-sm text-white">{item.quantity || 1}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(
                            item.productId || item.id,
                            (item.quantity || 1) + 1,
                          )
                        }
                        className="rounded-lg border border-white/20 bg-[rgba(255,255,255,0.22)] px-2 py-1 text-lg font-bold shadow transition-all duration-200 hover:scale-105 hover:bg-white/25 text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId || item.id)}
                      className="ml-2 rounded-full p-2 text-white/70 transition-all duration-200 hover:scale-105 hover:bg-white/8 hover:text-red-400"
                    >
                      <span role="img" aria-label="Remove">✕</span>
                    </button>
                  </div>
                ))}

                <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/20 pt-6">
                  <p className="text-xl font-extrabold text-green-500 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                    Total: ${Number(cart.total || 0).toFixed(2)}
                  </p>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleClearCart}
                      className="rounded-xl border border-white/20 bg-[rgba(255,255,255,0.22)] px-6 py-2 font-semibold text-white shadow backdrop-blur-[10px] transition-all duration-200 hover:scale-100 hover:bg-white/10"
                    >
                      Clear Cart
                    </button>

                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="rounded-xl bg-amber-400/80 px-6 py-2 font-semibold text-white shadow transition-all duration-300 hover:scale-105 hover:bg-amber-500/80 hover:shadow-[0_0_24px_rgba(245,158,11,0.4)]"
                    >
                      Proceed to Checkout
                    </button>
                  </div>

                  {showClearConfirm && (
                    <div
                      className={`fixed inset-0 z-[100001] flex items-center justify-center bg-black/40 ${
                        clearConfirmExiting ? "animate-fade-out-cart" : "animate-fade-in-cart"
                      }`}
                    >
                      <div
                        className={`mx-auto flex w-full max-w-sm flex-col items-center rounded-3xl bg-white p-0 shadow-2xl ${
                          clearConfirmExiting ? "animate-popup-exit" : "animate-popup-enter"
                        }`}
                        style={{ minWidth: 340 }}
                      >
                        <div className="flex w-full flex-col items-center px-8 pb-4 pt-8">
                          <h2
                            className="mb-2 text-center text-xl font-extrabold text-gray-900"
                            style={{ fontFamily: "'Josefin Sans',sans-serif" }}
                          >
                            Clear Cart
                          </h2>
                          <p
                            className="mb-2 text-center text-base text-gray-500"
                            style={{ fontFamily: "'Josefin Sans',sans-serif" }}
                          >
                            Are you sure you want to clear your cart? This action cannot be undone.
                          </p>
                        </div>

                        <div className="w-full border-t border-gray-200" />

                        <div className="flex w-full justify-center gap-3 rounded-b-3xl bg-white px-8 py-5">
                          <button
                            type="button"
                            onClick={cancelClearCart}
                            className="rounded-3xl border border-gray-300 px-7 py-2 font-semibold text-gray-700 transition-all duration-150 hover:bg-gray-100 hover:scale-105"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={confirmClearCart}
                            className="rounded-3xl bg-[#F53049] px-7 py-2 font-semibold text-white transition-all duration-150 hover:bg-[#c81c2b] hover:scale-105"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-out-cart {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes popup-enter {
          0% { transform: translateY(40px) scale(0.98); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes popup-exit {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(40px) scale(0.98); opacity: 0; }
        }

        .animate-fade-out-cart {
          animation: fade-out-cart 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        .animate-popup-enter {
          animation: popup-enter 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        .animate-popup-exit {
          animation: popup-exit 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        @keyframes fadeInCart {
          0% { opacity: 0; transform: scale(0.95) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-fade-in-cart {
          animation: fadeInCart 0.45s cubic-bezier(.68,-0.55,.27,1.55) both;
        }

        .cart-scrollbar::-webkit-scrollbar {
          width: 12px;
          background: rgba(255,255,255,0.10);
          border-radius: 12px;
          -webkit-appearance: none;
        }

        .cart-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.10);
          border-radius: 12px;
        }

        .cart-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.30);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          border: 2px solid rgba(255,255,255,0.18);
          transition: background 0.3s;
          -webkit-appearance: none;
        }

        .cart-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.45);
          -webkit-appearance: none;
        }

        .cart-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.30) rgba(255,255,255,0.10);
          scroll-behavior: smooth;
          transition: all 0.2s;
        }

        .fixed[data-cart-backdrop] ~ .fixed[data-cart-backdrop] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
