'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import CheckoutModal from '@/components/CheckoutModal';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name)
        `)
        .eq('id', productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: 'var(--color-destaque)' }}></div>
        <p className="mt-4">Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 hover:opacity-80">
        <ArrowLeft size={20} className="mr-2" />
        Voltar para produtos
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagem do Produto */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={product.image_url || '/product-placeholder.jpg'}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Informações do Produto */}
        <div>
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--color-destaque)', color: 'white' }}>
              {product.categories?.name || 'Sem categoria'}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="text-4xl font-bold mb-6" style={{ color: 'var(--color-destaque)' }}>
            R$ {product.price.toFixed(2)}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Descrição</h2>
            <p className="opacity-90">{product.description || 'Sem descrição disponível.'}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Estoque</h2>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                <div 
                  className="h-4 rounded-full" 
                  style={{ 
                    width: `${(product.stock / 1000) * 100}%`,
                    backgroundColor: 'var(--color-destaque)'
                  }}
                ></div>
              </div>
              <span className="font-bold">{product.stock} unidades</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center"
            >
              <ShoppingBag size={24} className="mr-3" />
              Comprar Agora
            </button>

            <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-destaque)' }}>
              <p className="font-bold mb-2">🛡️ Garantia</p>
              <p className="text-sm">Entrega imediata após confirmação do pagamento. Suporte 24/7 via Discord.</p>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal 
          product={product} 
          onClose={() => setShowCheckout(false)} 
        />
      )}
    </div>
  );
}
