"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-wide">💰 Simple Bank</h1>
      <ConnectButton showBalance={false} chainStatus="icon" />
    </header>
  );
}
