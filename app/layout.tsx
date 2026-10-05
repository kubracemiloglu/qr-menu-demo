import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "QR Menü Demo", description: "Sentetik verilerle mobil kategori ve ürün menüsü." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="tr"><body className="antialiased">{children}</body></html>; }
