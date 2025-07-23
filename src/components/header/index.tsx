"use client";

import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";
export function Header() {
  function handleLogout() {
    alert("clicou");
  }
  return (
    <header className="w-full flex items-center px-2 py-4 h-20  shadow-sm">
      <div className="w-full max-w-7xl flex items-center justify-between m-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-wider duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>
        <div className="flex gap-4 items-center justify-center">
          <Link href="/dashboard">
            <FiUser size={24} color="#121212" className="cursor-pointer" />
          </Link>
          <button onClick={handleLogout}>
            <FiLogOut size={24} color="#121212" className="cursor-pointer" />
          </button>
        </div>
      </div>
    </header>
  );
}
