"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gift from "/gift.png";
import { useNavigate } from "react-router-dom";

export default function TabContent({ activeTab, items, addToCart, cart, updateCartQuantity, user }) {
  const navigate = useNavigate();
  const [displayedTab, setDisplayedTab] = useState(activeTab);
  const [selectedRole, setSelectedRole] = useState(null);

  // Prevent drag, copy, and context menu for the whole container
  const preventActions = (e) => {
    e.preventDefault();
    return false;
  };

  // Update displayedTab when activeTab changes
  useEffect(() => {
    setDisplayedTab(activeTab);
  }, [activeTab]);

  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(item);
  };

  const handleIncrease = (item) => {
    updateCartQuantity(item.id, (getCartQuantity(item.id) || 0) + 1);
  };

  const handleDecrease = (item) => {
    const currentQty = getCartQuantity(item.id);
    if (currentQty > 1) {
      updateCartQuantity(item.id, currentQty - 1);
    } else if (currentQty === 1) {
      updateCartQuantity(item.id, 0); // Remove from cart, show Add to Cart
    }
  };

  const getCartQuantity = (itemId) => {
    const found = cart.items.find((i) => i.id === itemId);
    return found ? found.quantity || 1 : 0;
  };

  const parseDetails = (details, type) => {
    if (!details) return [];

    if (type === "premiumroles" || type === "boosters") {
      return details
        .replace("Benefits: ", "")
        .split(", ")
        .map((benefit) => {
          let text = benefit.trim();
          if (text.includes("XP")) {
            text = text.replace(/(\dx XP)/, "<strong>$1</strong>");
          }
          return {
            text,
            icon: type === "premiumroles" ? "👑" : "⭐",
          };
        });
    } else if (type === "giftcards") {
      const points = details.split(". ").filter((point) => point.trim() !== "");
      return points.map((point) => {
        let icon = "🎁";
        let text = point.trim();
        if (text.includes("Valid")) icon = "⏳";
        if (text.includes("bonus")) {
          icon = "💰";
          text = text.replace(/(\$\d+ credit)/, "<strong>$1</strong>");
        }
        return { text, icon };
      });
    }
    return [];
  };

  // Helper for card front
  const CardFront = ({ item, type }) => {
    const quantity = getCartQuantity(item.id);
    const totalPrice = (item.price * (quantity || 1)).toFixed(2);

    return (
      <div
        className="absolute w-full min-h-[450px] flex flex-col items-center justify-between p-4 rounded-3xl bg-[rgba(255,255,255,0.15)] backdrop-blur-[30px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_40px_rgba(100,200,255,0.18)] [backface-visibility:hidden] transition-transform duration-500 group/card z-10 select-none [will-change:transform]"
        style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none", transform: "translate3d(0,0,0)", WebkitTransform: "translate3d(0,0,0)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(100,200,255,0.13),rgba(200,150,255,0.13))] opacity-30 rounded-3xl pointer-events-none select-none" />
        <div
          className="p-4 rounded-full mb-4 border border-[rgba(255,255,255,0.1)] shadow-[0_0_20px_rgba(100,200,255,0.5)] transition-all duration-300 bg-white/10 select-none pointer-events-none"
        >
          {type === "giftcards" ? (
            <img
              src={gift || "/placeholder.svg"}
              alt="Gift Icon"
              className="h-22 w-22 object-contain select-none pointer-events-none"
              draggable={false}
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
          ) : (
            item.image && (
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="h-22 w-22 object-contain select-none pointer-events-none"
                draggable={false}
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
            )
          )}
        </div>
        <h3 className="font-bold text-base text-[rgba(255,255,255,0.95)] mb-2 tracking-wider [text-shadow:0_0_8px_rgba(100,200,255,0.5)] select-none" style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}>
          {item.name}
        </h3>
        <p className="text-[rgba(255,255,255,0.7)] text-center mb-4 select-none" style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}>
          {item.details}
        </p>
        <p className="font-extrabold text-lg text-green-500 mb-3 [text-shadow:0_0_8px_rgba(100,200,255,0.5)] select-none" style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}>
          ${totalPrice}
          {quantity > 1 && (
            <span className="ml-2 text-base text-white/70 font-normal select-none">{quantity}x</span>
          )}
        </p>
        {/* Add to Cart or Quantity Controls */}
        {quantity ? (
          <div className="flex items-center justify-center gap-3 w-full z-20 select-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDecrease(item);
              }}
              className="bg-[rgba(100,200,255,0.18)] text-white font-bold text-lg px-4 py-2 rounded-xl transition-all duration-300 border border-[rgba(255,255,255,0.18)] hover:bg-[rgba(100,200,255,0.28)] select-none"
              style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}
            >
              -
            </button>
            <span className="text-base font-bold select-none" style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}>
              {quantity}
            </span>
            {/* Plus button: disabled and greyed out for premiumroles */}
            <button
              onClick={(e) => {
                if (type !== "premiumroles") {
                  e.stopPropagation();
                  handleIncrease(item);
                }
              }}
              disabled={type === "premiumroles"}
              className={`bg-[rgba(100,200,255,0.18)] text-lg px-4 py-2 rounded-xl transition-all duration-300 border border-[rgba(255,255,255,0.18)] select-none font-bold ${type === "premiumroles" ? "text-gray-400 cursor-not-allowed opacity-50" : "text-white hover:bg-[rgba(100,200,255,0.28)]"}`}
              style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(item);
            }}
            className="w-full bg-[rgba(100,200,255,0.10)] backdrop-blur-[10px] text-white font-semibold px-4 py-2 rounded-xl transition-all duration-500 border border-[rgba(255,255,255,0.18)] shadow-[0_0_8px_rgba(100,200,255,0.15)] hover:shadow-[0_0_6px_rgba(100,200,255,0.1)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[rgba(100,200,255,0.4)] relative overflow-hidden cursor-pointer select-none"
            aria-label={`Add ${item.name} to cart`}
          >
            <span className="relative z-10 select-none" style={{ userSelect: "none" }}>
              Add to Cart
            </span>
          </button>
        )}
      {type === "premiumroles" && (
        <p style={{ textDecoration: "underline", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }} onClick={() => setSelectedRole(item)}>
          Details
        </p>
      )}
      </div>
    );
  };

  // Helper for card back
  const CardBack = ({ item, type }) => {
    const quantity = getCartQuantity(item.id);
    const totalPrice = (item.price * (quantity || 1)).toFixed(2);

    return (
      <div className="absolute w-full min-h-[450px] flex flex-col items-center justify-start p-6 rounded-3xl bg-[rgba(255,255,255,0.03)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.9)] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto shadow-[0_4px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 group select-none [will-change:transform]"
        style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(100,200,255,0.1),rgba(200,150,255,0.1))] opacity-20 select-none" />
        <h3 className="font-bold text-lg mb-3 tracking-wider [text-shadow:0_0_5px_rgba(100,200,255,0.3)] select-none" style={{ userSelect: "none" }}>
          {item.name}
        </h3>
        <div className="w-24 h-1 bg-[linear-gradient(90deg,rgba(100,200,255,0.5),rgba(200,150,255,0.5))] rounded-full mb-4 select-none"></div>
        <h4 className="text-base font-semibold text-[rgba(200,200,255,0.7)] mb-3 select-none" style={{ userSelect: "none" }}>
          {type === "giftcards" ? "Details" : "Benefits"}
        </h4>
        {parseDetails(item.details, type).length > 0 ? (
          <ul className="text-[rgba(255,255,255,0.9)] text-base mb-6 space-y-4 w-full select-none" style={{ userSelect: "none" }}>
            {parseDetails(item.details, type).map((detail, index) => (
              <li
                key={index}
                className="flex items-center gap-3 select-none"
              >
                <span className="text-xl text-[rgba(255,255,255,0.7)] flex-shrink-0 select-none" style={{ userSelect: "none" }}>
                  {detail.icon}
                </span>
                <span className="leading-relaxed select-none" style={{ userSelect: "none" }} dangerouslySetInnerHTML={{ __html: detail.text }} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[rgba(255,255,255,0.6)] mb-6 select-none" style={{ userSelect: "none" }}>
            No details available.
          </p>
        )}
        <p className="font-extrabold text-lg text-green-500 mb-3 [text-shadow:0_0_8px_rgba(100,200,255,0.5)] select-none" style={{ userSelect: "none" }}>
          ${totalPrice}
          {quantity > 1 && (
            <span className="ml-2 text-base text-white/70 font-normal select-none" style={{ userSelect: "none" }}>
              ({quantity}x)
            </span>
          )}
        </p>
        <div className="mt-auto w-full z-20 select-none">
          {quantity ? (
            <div className="flex items-center justify-center gap-3 w-full select-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrease(item);
                }}
                className="bg-[rgba(100,200,255,0.18)] text-white font-bold text-lg px-4 py-2 rounded-xl transition-all duration-300 border border-[rgba(255,255,255,0.18)] hover:bg-[rgba(100,200,255,0.28)] select-none"
                style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}
              >
                -
              </button>
              <span className="text-base font-bold select-none" style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}>
                {quantity}
              </span>
              {/* Plus button: disabled and greyed out for premiumroles */}
              <button
                onClick={(e) => {
                  if (type !== "premiumroles") {
                    e.stopPropagation();
                    handleIncrease(item);
                  }
                }}
                disabled={type === "premiumroles"}
                className={`bg-[rgba(100,200,255,0.18)] text-lg px-4 py-2 rounded-xl transition-all duration-300 border border-[rgba(255,255,255,0.18)] select-none font-bold ${type === "premiumroles" ? "text-gray-400 cursor-not-allowed opacity-50" : "text-white hover:bg-[rgba(100,200,255,0.28)]"}`}
                style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item);
              }}
              className="w-full bg-[rgba(100,200,255,0.08)] backdrop-blur-[5px] text-white font-semibold px-4 py-2 rounded-xl transition-all duration-500 border border-[rgba(255,255,255,0.1)] shadow-[0_0_4px_rgba(100,200,255,0.1)] hover:shadow-[0_0_8px_rgba(100,200,255,0.15)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[rgba(100,200,255,0.4)] relative overflow-hidden cursor-pointer select-none"
                          >
              <span className="relative z-10 select-none" style={{ userSelect: "none" }}>
                Add to Cart
              </span>
            </button>
          )}
        </div>
      </div>
    );
  };

  // Card grid logic
  const renderCards = (type) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 select-none" style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }} onDragStart={preventActions} onCopy={preventActions} onCut={preventActions} onContextMenu={preventActions}>
      {items
        .filter((item) => {
          if (type === "premiumroles") return item.type === "premiumroles";
          if (type === "boosters") return item.type === "boosters";
          if (type === "giftcards") return item.type === "giftcards";
          if (type === "cash") return item.type === "cash";
          return false;
        })
        .map((item, _idx) => (
          <div
            key={item.id}
            className="relative [perspective:1000px] transition-all duration-500 group/card select-none rounded-3xl hover:shadow-[0_0_25px_0px_var(--primary)] [will-change:transform]"
            style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}
            onDragStart={preventActions}
            onCopy={preventActions}
            onCut={preventActions}
            onContextMenu={preventActions}
          >
            <div className="relative w-full min-h-[450px] transition-transform duration-500 [transform-style:preserve-3d] select-none [will-change:transform]" style={{ userSelect: "none", transform: "translate3d(0,0,0)", WebkitTransform: "translate3d(0,0,0)" }}>
              <CardFront item={item} type={type} />
              <CardBack item={item} type={type === "giftcards" ? "giftcards" : type} />
            </div>
          </div>
        ))}
    </div>
  );

  // Heading color: 3D silver effect
  const headingClass = "text-4xl font-extrabold mb-2 tracking-widest text-transparent bg-gradient-to-r from-[#e3e3e3] via-[#bdbdbd] to-[#f8f8f8] bg-clip-text [text-shadow:0_2px_8px_rgba(180,180,180,0.7),0_0_24px_rgba(220,220,220,0.8)] drop-shadow-[0_2px_8px_rgba(180,180,180,0.7)]";

  return (
    <>
      <div className="md:col-span-4 bg-[rgba(255,255,255,0.02)] backdrop-blur-[30px] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 shadow-[0_4px_40px_rgba(100,200,255,0.3)] relative overflow-visible transition-all duration-500 group select-none" style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }} onDragStart={preventActions} onCopy={preventActions} onCut={preventActions} onContextMenu={preventActions}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(100,200,255,0.1),rgba(200,200,255,0.1))] opacity-20 select-none" />
        {displayedTab === "premiumroles" && (
          <div className="select-none">
            <h1 className={headingClass} style={{ userSelect: "none" }}>
              Premium Roles
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] select-none" style={{ userSelect: "none" }}>
              Welcome to our store!
            </h2>
            <p className="mb-4 text-white/80 select-none" style={{ userSelect: "none" }}>
              Get instant delivery of purchase. We deeply appreciate your love and kindness for donating !! 💖
            </p>
            {renderCards("premiumroles")}
          </div>
        )}
        {displayedTab === "boosters" && (
          <div className="select-none">
            <h1 className={headingClass} style={{ userSelect: "none" }}>
              Boosters
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] select-none" style={{ userSelect: "none" }}>
              Enhance your server experience!
            </h2>
            <p className="mb-4 text-white/80 select-none" style={{ userSelect: "none" }}>
              Power up your journey — unlock boosts and level up fast! 🚀
            </p>
            {renderCards("boosters")}
          </div>
        )}
        {displayedTab === "cash" && (
          <div className="select-none">
            <h1 className={headingClass} style={{ userSelect: "none" }}>
              Cash
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] select-none" style={{ userSelect: "none" }}>
              Buy in-game cash instantly!
            </h2>
            <p className="mb-4 text-white/80 select-none" style={{ userSelect: "none" }}>
              Get the cash you need to level up your game. Delivered instantly to your account! 💸
            </p>
            {renderCards("cash")}
          </div>
        )}
        {displayedTab === "giftcards" && (
          <div className="select-none">
            <h1 className={headingClass.replace("text-4xl", "text-3xl")} style={{ userSelect: "none" }}>
              Gift Cards
            </h1>
            <h2 className="text-xl font-semibold mb-4 text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] select-none" style={{ userSelect: "none" }}>
              Perfect gifts for your friends!
            </h2>
            <p className="mb-4 text-white/80 select-none" style={{ userSelect: "none" }}>
              Got a kind heart? Brighten someone's day with a gift card! 💝
            </p>
            {renderCards("giftcards")}
          </div>
        )}
      </div>

      {/* Modal rendered via Portal - outside DOM hierarchy */}
      {selectedRole && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelectedRole(null)} onDragStart={preventActions} onCopy={preventActions} onCut={preventActions} onContextMenu={preventActions}>
          <div style={{ position: 'relative', width: '60vw', height: '60vh', maxWidth: '600px', maxHeight: '600px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '20px', boxShadow: '0 0 40px rgba(100,200,255,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '30px', overflow: 'auto' }} onClick={e => e.stopPropagation()} onDragStart={preventActions} onCopy={preventActions} onCut={preventActions} onContextMenu={preventActions}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: "'Josefin Sans', sans-serif", userSelect: 'none', marginBottom: '20px' }}>
              {selectedRole.name}
            </h2>
            
            {/* Bigger 3D Separator Line with rounded edges - Glass color with grey background */}
            <div style={{ width: '140px', height: '10px', background: 'linear-gradient(90deg, rgba(100,150,200,0.3), rgba(150,180,220,0.7), rgba(150,180,220,0.7), rgba(100,150,200,0.3))', borderRadius: '25px', marginBottom: '25px', backgroundColor: 'rgba(120,120,120,0.4)' }} />

            {/* Benefits Label */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'rgba(200,200,255,0.85)', textAlign: 'center', fontFamily: "'Josefin Sans', sans-serif", userSelect: 'none', marginBottom: '25px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Benefits
            </h3>

            {/* Benefits List */}
            {parseDetails(selectedRole.details, "premiumroles").length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, width: '100%', textAlign: 'center', marginBottom: '30px' }}>
                {parseDetails(selectedRole.details, "premiumroles").map((detail, index) => (
                  <li key={index} style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{detail.icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', fontFamily: "'Josefin Sans', sans-serif" }} dangerouslySetInnerHTML={{ __html: detail.text }} />
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Josefin Sans', sans-serif", marginBottom: '30px' }}>No details available.</p>
            )}

            {/* Close Button - Underlined */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRole(null);
              }}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', cursor: 'pointer', fontFamily: "'Josefin Sans', sans-serif", userSelect: 'none', textDecoration: 'underline', transition: 'color 0.2s', fontWeight: '600', marginTop: '40px' }}
              onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}