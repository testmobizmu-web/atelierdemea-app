"use client";

const OWNER_WHATSAPP = "23059117549";

export default function FloatingWhatsApp() {
  const handleClick = () => {
    const text = encodeURIComponent(
      "Bonjour 👋, j'aimerais en savoir plus sur vos produits Atelier de Méa."
    );
    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center text-white text-2xl"
      aria-label="WhatsApp chat"
    >
      {/* Simple WhatsApp icon substitute */}
      🟢
    </button>
  );
}
