"use client";

import Image from "next/image";

const WHATSAPP_NUMBER = "23059117549"; // your number

export default function WhatsAppFloatingButton() {
  const message = encodeURIComponent(
    "Bonjour Atelier de Méa 😊 Je souhaite plus d'infos sur vos turbans."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg hover:scale-105 transition transform"
    >
      <Image
        src="/icons/whatsapp.png"
        alt="WhatsApp Atelier de Méa"
        width={64}
        height={64}
      />
    </a>
  );
}
