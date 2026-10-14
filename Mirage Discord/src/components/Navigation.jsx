import { useCallback } from "react";
import { CATEGORY_KEYS } from "../utils/constants";

const roleIcon = "/role.png";
const giftIcon = "/gifticon.png";
const diamondIcon = "/diamond.png";

export default function Navigation({
  activeTab,
  setActiveTab,
}) {
  const preventActions = useCallback((event) => {
    event.preventDefault();
  }, []);

  const tabs = [
    {
      key: CATEGORY_KEYS.ROLES,
      label: "Roles",
      icon: roleIcon,
    },
    {
      key: CATEGORY_KEYS.DIAMONDS,
      label: "Diamonds",
      icon: diamondIcon,
    },
    {
      key: CATEGORY_KEYS.GIFTCARDS,
      label: "Gift Cards",
      icon: giftIcon,
    },
  ];

  return (
    <aside className="relative w-full lg:w-72">
      <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-40 blur-2xl" />

      <div className="relative rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="mb-6 text-center text-2xl font-extrabold tracking-widest text-white">
          Start Shopping
        </h2>

        <div className="flex flex-col gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                onContextMenu={preventActions}
                className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all ${
                  isActive
                    ? "scale-[1.02] border border-white/30 bg-white/15 shadow-lg"
                    : "border border-transparent hover:bg-white/10"
                }`}
                aria-label={`View ${tab.label}`}
                aria-current={isActive ? "true" : "false"}
              >
                <img
                  src={tab.icon}
                  alt={`${tab.label} icon`}
                  className="h-8 w-8 object-contain"
                  draggable={false}
                />

                <span className="text-lg font-bold text-white">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
