// src/app/layout.tsx
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ... header etc ... */}
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

