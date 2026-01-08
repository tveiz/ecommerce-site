'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Settings, LogOut } from 'lucide-react';

export default function Header() {
  const [user] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
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
              
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
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

      {/* Configurações Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Configurações</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Tema</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Normal</option>
                  <option>Escuro</option>
                  <option>Natal</option>
                  <option>Carnaval</option>
                </select>
              </div>
              
              <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
