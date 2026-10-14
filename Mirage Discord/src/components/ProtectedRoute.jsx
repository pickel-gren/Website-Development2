import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  CATEGORY_INFO,
  CATEGORY_KEYS,
} from "../utils/constants";

const getCartItemId = (item) =>
  item.productId ?? item.id;

function parseDetails(details = "", category) {
  if (!details) return [];

  if (category === CATEGORY_KEYS.ROLES) {
    return details
      .replace(/^Benefits:\s*/i, "")
      .split(",")
      .map((detail) => detail.trim())
      .filter(Boolean);
  }

  return details
    .split(".")
    .map((detail) => detail.trim())
    .filter(Boolean);
}

export default function TabContent({
  activeTab,
  items = [],
  addToCart,
  cart = { items: [] },
  updateCartQuantity,
  user,
}) {
  const navigate = useNavigate();
  const [flippedCard, setFlippedCard] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const cartItems = cart.items || [];
  const category = CATEGORY_INFO[activeTab];

  const getCartQuantity = (productId) => {
    const cartItem = cartItems.find(
      (item) => getCartItemId(item) === productId,
    );

    return cartItem?.quantity || 0;
  };

  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(item);
  };

  const updateQuantity = (item, quantity) => {
    updateCartQuantity(item.id, Math.max(quantity, 0));
  };

  const categoryItems = items.filter(
    (item) => item.type === activeTab,
  );

  if (!category) {
    return null;
  }

  return (
    <>
      <section className="w-full px-4 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-3 text-4xl font-extrabold tracking-widest text-white">
            {category.heading}
          </h1>

          <h2 className="mb-2 text-xl font-semibold text-white/90">
            {category.subheading}
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-white/70">
            {category.description}
          </p>

          {categoryItems.length === 0 ? (
            <p className="py-12 text-lg text-white/70">
              No products are available in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryItems.map((item) => {
                const quantity = getCartQuantity(item.id);
                const isFlipped = flippedCard === item.id;
                const details = parseDetails(
                  item.details,
                  activeTab,
                );

                return (
                  <div
                    key={item.id}
                    className="relative h-[460px] cursor-pointer"
                    style={{ perspective: "1200px" }}
                    onClick={() =>
                      setFlippedCard(
                        isFlipped ? null : item.id,
                      )
                    }
                  >
                    <div
                      className="relative h-full w-full transition-transform duration-500"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      }}
                    >
                      <div
                        className="absolute inset-0 flex h-full flex-col items-center rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl"
                        style={{
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 p-4">
                          <img
                            src={
                              item.image || "/placeholder.svg"
                            }
                            alt={item.name}
                            className="h-full w-full object-contain"
                            draggable={false}
                          />
                        </div>

                        <h3 className="mb-4 text-xl font-bold text-white">
                          {item.name}
                        </h3>

                        <p className="mb-6 min-h-16 text-center text-white/70">
                          {item.details || "No details available."}
                        </p>

                        <p className="mb-6 text-2xl font-extrabold text-green-400">
                          ${Number(item.price).toFixed(2)}
                        </p>

                        <div
                          className="mt-auto w-full"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          {quantity > 0 ? (
                            <div className="flex items-center justify-center gap-5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item,
                                    quantity - 1,
                                  )
                                }
                                className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xl font-bold text-white"
                              >
                                -
                              </button>

                              <span className="font-bold text-white">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item,
                                    quantity + 1,
                                  )
                                }
                                className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xl font-bold text-white"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                handleAddToCart(item)
                              }
                              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/20"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>

                        <p className="mt-5 text-sm text-white/60">
                          Click for details
                        </p>
                      </div>

                      <div
                        className="absolute inset-0 flex h-full flex-col rounded-3xl border border-white/20 bg-black/30 p-6 text-left text-white shadow-xl backdrop-blur-xl"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <h3 className="mb-4 text-center text-xl font-bold">
                          {item.name}
                        </h3>

                        <div className="mb-5 h-1 rounded-full bg-white/30" />

                        <h4 className="mb-4 text-center font-semibold text-white/80">
                          {activeTab === CATEGORY_KEYS.ROLES
                            ? "Benefits"
                            : "Details"}
                        </h4>

                        <ul className="flex-1 space-y-4 overflow-y-auto text-white/90">
                          {details.length > 0 ? (
                            details.map((detail, index) => (
                              <li
                                key={`${item.id}-${index}`}
                                className="flex gap-3"
                              >
                                <span>
                                  {activeTab ===
                                  CATEGORY_KEYS.ROLES
                                    ? "👑"
                                    : activeTab ===
                                        CATEGORY_KEYS.DIAMONDS
                                      ? "💎"
                                      : "🎁"}
                                </span>

                                <span>{detail}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-white/60">
                              No details available.
                            </li>
                          )}
                        </ul>

                        <p className="mb-5 text-center text-2xl font-extrabold text-green-400">
                          ${Number(item.price).toFixed(2)}
                        </p>

                        <p className="text-center text-sm text-white/60">
                          Click to return
                        </p>
                      </div>
                    </div>

                    {activeTab === CATEGORY_KEYS.ROLES && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedRole(item);
                        }}
                        className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-sm text-white/70 underline"
                      >
                        View benefits
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedRole &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            onClick={() => setSelectedRole(null)}
          >
            <div
              className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-8 text-white backdrop-blur-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="mb-6 text-center text-3xl font-bold">
                {selectedRole.name}
              </h2>

              <h3 className="mb-5 text-center text-lg font-semibold text-white/80">
                Benefits
              </h3>

              <ul className="space-y-4">
                {parseDetails(
                  selectedRole.details,
                  CATEGORY_KEYS.ROLES,
                ).map((detail, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-white/90"
                  >
                    <span>👑</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="mt-8 w-full text-white/70 underline"
              >
                Close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
