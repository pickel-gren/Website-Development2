import {
  LogIn,
  LogOut,
  ShoppingCart,
  X,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { clearLocationPersistence } from "../hooks/useLocationPersistence";

export default function Header({
  cart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] =
    useState(false);

  const cartItems = cart?.items || [];
  const cartItemCount = cartItems.length;

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsCartOpen(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
    } finally {
      clearLocationPersistence();
      setShowLogoutConfirm(false);
      navigate("/login");
    }
  };

  const getItemId = (item) => item.productId || item.id;

  return (
    <>
      {/* Header */}
      <div className="relative z-[1000] mx-auto mt-4 w-[94vw] max-w-[1500px] rounded-3xl border border-white/25 bg-white/10 p-1 shadow-[0_0_30px_rgba(100,80,180,0.2)] backdrop-blur-2xl">
        <header className="flex min-h-[82px] w-full items-center justify-between gap-4 rounded-[22px] px-4 py-4 font-['Josefin_Sans'] sm:px-6 lg:px-8">
          {/* Logo and welcome text */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/15 p-1 sm:h-14 sm:w-14">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="h-full w-full rounded-full object-cover"
                  draggable={false}
                />
              ) : (
                <img
                  src="/house.png"
                  alt="Mirage Store"
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-wide text-white/60 sm:text-base">
                {user
                  ? `Welcome, ${user.username}`
                  : "Welcome To Mirage Store"}
              </p>

              <h1 className="truncate text-lg font-extrabold tracking-[0.12em] text-[#f5e7c6] sm:text-2xl">
                Mirage Store
              </h1>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {user ? (
              <button
                type="button"
                onClick={handleLogoutClick}
                className="header-design-button"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="header-design-button"
                aria-label="Login"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCartClick}
              className="header-design-button relative"
              aria-label={`View cart with ${cartItemCount} item${
                cartItemCount === 1 ? "" : "s"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />

              <span className="hidden sm:inline">Cart</span>

              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-3 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#d95c68] px-1.5 text-xs font-extrabold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Cart modal */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/25 bg-[#202033]/95 p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Cart heading */}
            <div className="mb-6 flex items-center justify-between border-b border-white/15 pb-4">
              <h2 className="text-2xl font-extrabold text-white">
                Your Cart
              </h2>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="py-12 text-center text-white/65">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemId = getItemId(item);
                    const quantity = item.quantity || 1;

                    return (
                      <div
                        key={itemId}
                        className="flex gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4"
                      >
                        {/* Product image */}
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 p-2">
                          <img
                            src={
                              item.image || "/placeholder.svg"
                            }
                            alt={item.name || "Product"}
                            className="h-full w-full object-contain"
                            draggable={false}
                          />
                        </div>

                        {/* Product information */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate font-bold text-white">
                                {item.name}
                              </h3>

                              <p className="mt-1 text-sm text-white/60">
                                $
                                {Number(item.price).toFixed(2)}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(itemId)
                              }
                              className="shrink-0 rounded-lg p-1 text-red-300 hover:bg-red-400/10 hover:text-red-200"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Quantity controls */}
                          <div className="mt-4 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(
                                  itemId,
                                  quantity - 1,
                                )
                              }
                              className="rounded-lg border border-white/15 bg-white/10 p-1.5 text-white hover:bg-white/20"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="min-w-6 text-center font-bold text-white">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(
                                  itemId,
                                  quantity + 1,
                                )
                              }
                              className="rounded-lg border border-white/15 bg-white/10 p-1.5 text-white hover:bg-white/20"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cart footer */}
                <div className="mt-7 border-t border-white/15 pt-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-lg text-white/65">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-white">
                      ${Number(cart?.total || 0).toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate("/cart");
                    }}
                    className="w-full rounded-xl border border-indigo-300/30 bg-indigo-500/80 px-4 py-3 font-bold text-white hover:bg-indigo-500"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      setIsCartOpen(false);
                    }}
                    className="mt-3 w-full rounded-xl border border-red-300/20 bg-red-500/15 px-4 py-3 font-semibold text-red-200 hover:bg-red-500/25"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout confirmation */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/95 p-7 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="mb-2 text-xl font-extrabold text-gray-900">
              Logout
            </h2>

            <p className="mb-6 text-gray-500">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 rounded-xl bg-[#c95563] px-4 py-2 font-semibold text-white hover:bg-[#b64956]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .header-design-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 42px;
          padding: 0.55rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.75rem;
          background: rgba(34, 34, 55, 0.58);
          color: rgba(255, 255, 255, 0.86);
          font-weight: 700;
          cursor: pointer;
        }

        .header-design-button:hover,
        .header-design-button:focus-visible {
          background: rgba(63, 63, 92, 0.8);
          color: #ffffff;
          outline: none;
        }

        @media (max-width: 640px) {
          .header-design-button {
            min-height: 40px;
            padding: 0.5rem 0.7rem;
          }
        }
      `}</style>
    </>
  );
}
