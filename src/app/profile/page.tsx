'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      router.push('/');
      return;
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    setUser(profile);

    // Buscar pedidos do usuário
    const { data: userOrders } = await supabase
      .from('orders')
      .select('*, products(name, image_url)')
      .eq('user_id', authUser.id)
      .order('created_at', { ascending: false });

    setOrders(userOrders || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: 'var(--color-destaque)' }}></div>
        <p className="mt-4">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho do Perfil */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="relative">
            <img
              src={user.photo_url || '/default-avatar.png'}
              alt={user.username}
              className="w-32 h-32 rounded-full border-4"
              style={{ borderColor: 'var(--color-destaque)' }}
            />
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg">
              <Settings size={20} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
            <p className="opacity-80 mb-4">{user.email}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="text-sm opacity-70">ID</div>
                <div className="font-mono text-sm">{user.id.substring(0, 8)}...</div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="text-sm opacity-70">HWID</div>
                <div className="font-mono text-sm">{user.hwid?.substring(0, 10)}...</div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="text-sm opacity-70">Membro desde</div>
                <div>{new Date(user.created_at).toLocaleDateString('pt-BR')}</div>
              </div>
            </div>

            <div className="flex gap-4">
              {user.is_admin && (
                <button
                  onClick={() => router.push('/admin/dashboard')}
                  className="px-6 py-2 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700"
                >
                  👑 Painel Admin
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg border flex items-center"
              >
                <LogOut size={18} className="mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Histórico de Compras */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ShoppingBag size={24} className="mr-3" />
            Meus Pedidos
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={64} className="mx-auto mb-4 opacity-30" />
              <p className="text-xl opacity-70">Nenhum pedido encontrado</p>
              <p className="opacity-60 mt-2">Quando você fizer uma compra, ela aparecerá aqui.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 rounded-xl border hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <img
                      src={order.products?.image_url || '/product-placeholder.jpg'}
                      alt={order.products?.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{order.products?.name}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm">
                        <div>
                          <span className="opacity-70">Pedido #:</span>
                          <span className="font-mono ml-2">{order.id.substring(0, 8)}...</span>
                        </div>
                        <div>
                          <span className="opacity-70">Valor:</span>
                          <span className="font-bold ml-2">R$ {order.total_paid}</span>
                        </div>
                        <div>
                          <span className="opacity-70">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            order.payment_status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.payment_status === 'completed' ? 'Concluído' : 'Pendente'}
                          </span>
                        </div>
                        <div>
                          <span className="opacity-70">Data:</span>
                          <span className="ml-2">{new Date(order.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg border">Detalhes</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
