import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Inter } from "next/font/google";
import AuthProvider from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";

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
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
