import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patas4Land - Fetish for Forest",
  description: "Agent-powered feet pic marketplace on Monad. 10% to reforestation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {/* Navigation */}
          <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-red-900/20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Patas4Land" className="h-12 w-12 rounded-lg" />
                <span className="text-2xl font-bold text-white">
                  Patas<span className="text-red-500">4</span>Land
                </span>
              </div>
              <div className="flex gap-6 text-sm items-center">
                <a href="/" className="text-gray-300 hover:text-red-400 transition">Home</a>
                <a href="/marketplace" className="text-gray-300 hover:text-red-400 transition">Marketplace</a>
                <a href="/login" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition">Connect Wallet</a>
              </div>
            </div>
          </nav>
          <div className="pt-20">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
