import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Leandro Perdomo Spínola - Cronista de Canarias",
    description: "Portal dedicado al escritor y periodista canario Leandro Perdomo Spínola (1921-1993), cronista de la realidad lanzaroteña.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
