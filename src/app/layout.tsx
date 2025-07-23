import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Inter } from "next/font/google";
import AuthProvider from "@/providers/auth";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Controle Tech",
  description: "Gerencie seus clientes de forma simples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
