import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeoTaste",
  description: "Restaurant discovery & deals",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {/* Phone frame — centres the 393px mobile viewport on desktop */}
        <div className="min-h-screen flex items-start justify-center bg-[#f0f0f0] md:py-8">
          <div
            className="relative w-[393px] min-h-dvh bg-white overflow-hidden"
            style={{ maxWidth: "100vw" }}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
