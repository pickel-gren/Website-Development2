import Navigation from "./Navigation";
import TabContent from "./TabContent";

export default function MainContent({
  activeTab,
  setActiveTab,
  items,
  addToCart,
  cart,
  updateCartQuantity,
  user,
}) {
  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <section className="min-w-0 rounded-3xl border border-white/20 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-6 lg:p-8">
          <TabContent
            activeTab={activeTab}
            items={items}
            addToCart={addToCart}
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            user={user}
          />
        </section>
      </div>
    </main>
  );
}
