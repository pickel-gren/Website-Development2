import Navigation from "./Navigation";
import TabContent from "./TabContent";

export default function MainContent({
    activeTab,
    setActiveTab,
    items,
    addToCart,
    cart,
    updateCartQuantity,
    user
}) {
    return (
        <div
            className="
                w-[90%]
                min-h-[80vh]
                mx-auto
                grid md:grid-cols-5
                gap-6
                p-0
                border border-white/20
                rounded-3xl
                shadow-[0_8px_48px_0_rgba(106,90,249,0.18)]
                transition-all duration-500
                relative
                overflow-hidden
                backdrop-blur-2xl
            "
        >
            {/* Glassy floating shapes */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#a78bfa]/20 rounded-full blur-2xl" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(54,179,232,0.15)_0%,transparent_70%)] opacity-40 animate-pulse pointer-events-none" />
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContent
                activeTab={activeTab}
                items={items}
                addToCart={addToCart}
                cart={cart}
                updateCartQuantity={updateCartQuantity}
                user={user}
            />
        </div>
    );
}