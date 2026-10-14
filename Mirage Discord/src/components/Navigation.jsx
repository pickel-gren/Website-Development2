import React, { useCallback } from "react";

const roleIcon = new URL("/role.png", import.meta.url).href;
const giftIcon = new URL("/gifticon.png", import.meta.url).href;
const diamondIcon = new URL("/diamond.png", import.meta.url).href;

export default function Navigation({ activeTab, setActiveTab }) {
  const preventActions = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  const frostedGlassColor = "rgba(255,255,255,0.08)";
  const headingClass =
    "text-center text-2xl md:text-3xl font-extrabold mb-6 tracking-widest text-transparent bg-gradient-to-r from-[#ffffff] via-[#f0f0f0] to-[#ffffff] bg-clip-text";

  const flipTransition =
    "transition-[background-color,box-shadow,border-color,transform,backdrop-blur] duration-500 cubic-bezier(0.075, 0.82, 0.165, 1)";

  return (
    <div
      className="md:col-span-1 w-full h-full flex flex-col relative z-10 select-none"
      onDragStart={preventActions}
      onCopy={preventActions}
      onCut={preventActions}
      onContextMenu={preventActions}
    >
      <div
        className="relative flex flex-col w-full p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-[0_4px_32px_0_rgba(106,90,249,0.15)] overflow-hidden transition-all duration-500 font-['Josefin_Sans'] z-10 select-none"
        style={{ background: frostedGlassColor }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/15 rounded-full blur-2xl" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-40 animate-pulse" />

        <h2
          className={headingClass}
          style={{ textShadow: "0 0 8px rgba(255,255,255,0.9)" }}
        >
          Start Shopping
        </h2>

        <div className="flex flex-col w-full bg-transparent space-y-4 z-10">
          <button
            onClick={() => setActiveTab("roles")}
            className={`relative flex items-center gap-4 w-full justify-start p-4 text-left rounded-2xl ${flipTransition} cursor-pointer
              ${
                activeTab === "roles"
                  ? "bg-[rgba(255,255,255,0.12)] shadow-[0_0_20px_rgba(255,255,255,0.15)] border-[1px] border-[rgba(255,255,255,0.25)] backdrop-blur-[8px] transform scale-[1.02]"
                  : ""
              }
              hover:bg-[rgba(255,255,255,0.06)] focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-[12px]`}
            aria-label="View Roles"
            aria-current={activeTab === "roles" ? "true" : "false"}
          >
            <img
              src={roleIcon}
              alt="Roles Icon"
              className="h-8 w-8 flex-shrink-0 object-contain"
              draggable={false}
            />
            <span
              className={`${
                activeTab === "roles" ? "text-white" : "text-white/90"
              } text-lg md:text-xl font-bold`}
            >
              Roles
            </span>
          </button>

          <button
            onClick={() => setActiveTab("diamonds")}
            className={`relative flex items-center gap-4 w-full justify-start p-4 text-left rounded-2xl ${flipTransition} cursor-pointer
              ${
                activeTab === "diamonds"
                  ? "bg-[rgba(255,255,255,0.12)] shadow-[0_0_20px_rgba(255,255,255,0.15)] border-[1px] border-[rgba(255,255,255,0.25)] backdrop-blur-[8px] transform scale-[1.02]"
                  : ""
              }
              hover:bg-[rgba(255,255,255,0.06)] focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-[12px]`}
            aria-label="View Diamonds"
            aria-current={activeTab === "diamonds" ? "true" : "false"}
          >
            <img
              src={diamondIcon}
              alt="Diamonds Icon"
              className="h-8 w-8 flex-shrink-0 object-contain"
              draggable={false}
            />
            <span
              className={`${
                activeTab === "diamonds" ? "text-white" : "text-white/90"
              } text-lg md:text-xl font-bold`}
            >
              Diamonds
            </span>
          </button>

          <button
            onClick={() => setActiveTab("gift_cards")}
            className={`relative flex items-center gap-4 w-full justify-start p-4 text-left rounded-2xl ${flipTransition} cursor-pointer
              ${
                activeTab === "gift_cards"
                  ? "bg-[rgba(255,255,255,0.12)] shadow-[0_0_20px_rgba(255,255,255,0.15)] border-[1px] border-[rgba(255,255,255,0.25)] backdrop-blur-[8px] transform scale-[1.02]"
                  : ""
              }
              hover:bg-[rgba(255,255,255,0.06)] focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-[12px]`}
            aria-label="View Gift Cards"
            aria-current={activeTab === "gift_cards" ? "true" : "false"}
          >
            <img
              src={giftIcon}
              alt="Gift Cards Icon"
              className="h-8 w-8 flex-shrink-0 object-contain"
              draggable={false}
            />
            <span
              className={`${
                activeTab === "gift_cards" ? "text-white" : "text-white/90"
              } text-lg md:text-xl font-bold`}
            >
              Gift Cards
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
