"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }
  return (
    <header className="w-full flex items-center px-2 py-4 h-20  shadow-sm">
      <div className="w-full max-w-7xl flex items-center justify-between m-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-wider duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={24} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={24} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex gap-4 items-center justify-center">
            <Link href="/dashboard">
              <FiUser size={24} color="#4b5563" />
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut size={24} color="#4b5563" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
