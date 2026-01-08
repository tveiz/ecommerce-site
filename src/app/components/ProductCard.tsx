'use client';
import { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';
import CheckoutModal from './CheckoutModal';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    description: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow p-4">
        <div className="relative h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={product.image_url || '/product-placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            R$ {product.price.toFixed(2)}
          </div>
        </div>

        <div className="p-2">
          <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
          <p className="text-sm opacity-75 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between">
            <Link
              href={`/products/${product.id}`}
              className="flex items-center justify-center px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 flex-1 mr-2"
            >
              <Eye size={18} className="mr-2" />
              Detalhes
            </Link>
            <button
              onClick={() => setShowCheckout(true)}
              className="flex items-center justify-center px-4 py-2 rounded-lg flex-1 bg-orange-600 text-white"
            >
              <ShoppingBag size={18} className="mr-2" />
              Comprar
            </button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal 
          product={product} 
          onClose={() => setShowCheckout(false)} 
        />
      )}
    </>
  );
}
