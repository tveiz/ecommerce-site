'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Settings, LogOut } from 'lucide-react';

export default function Header() {
  const [user] = useState(null); // Simulação

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-600">
            🛒 E-commerce
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-orange-600">Início</Link>
            <Link href="/#products" className="hover:text-orange-600">Produtos</Link>
            <Link href="/#categories" className="hover:text-orange-600">Categorias</Link>
            <Link href="/admin/dashboard" className="text-red-600 font-bold">ADMIN</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="https://discord.gg/PtAw6gDg8k"
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              🎮 Discord
            </a>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>

            {user ? (
              <>
                <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full">
                  <User size={20} />
                </Link>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-orange-600 text-white px-4 py-2 rounded-lg">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
