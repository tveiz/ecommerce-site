'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  Package, Tag, Users, Settings, ShoppingCart, 
  PlusCircle, BarChart3, AlertCircle 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
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

    if (!profile?.is_admin) {
      router.push('/');
      return;
    }

    setUser(profile);
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Produtos', icon: Package },
    { id: 'categories', name: 'Categorias', icon: Tag },
    { id: 'coupons', name: 'Cupons', icon: Tag },
    { id: 'attendants', name: 'Atendentes', icon: Users },
    { id: 'pending', name: 'Pendentes', icon: ShoppingCart },
    { id: 'settings', name: 'Configurações', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'products':
        return <ProductsManagement />;
      case 'categories':
        return <CategoriesManagement />;
      case 'coupons':
        return <CouponsManagement />;
      case 'attendants':
        return <AttendantsManagement />;
      case 'pending':
        return <PendingOrders />;
      case 'settings':
        return <SiteSettings />;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: 'var(--color-destaque)' }}></div>
        <p className="mt-4">Verificando permissões...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-fundo)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">👑 Painel Administrativo</h1>
          <p className="opacity-80">Bem-vindo, {user.username}! Gerencie todo o site aqui.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'font-bold shadow-lg'
                    : 'opacity-80 hover:opacity-100 hover:shadow'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--color-destaque)' : 'var(--color-secundario)',
                  color: activeTab === tab.id ? 'white' : 'var(--color-texto)',
                }}
              >
                <Icon size={20} className="mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Conteúdo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Componentes de cada tab (implementações básicas)

function DashboardStats() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 Estatísticas do Site</h2>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Produtos" value="24" icon={Package} color="blue" />
        <StatCard title="Categorias" value="8" icon={Tag} color="green" />
        <StatCard title="Usuários" value="156" icon={Users} color="purple" />
        <StatCard title="Vendas Hoje" value="R$ 1.245" icon={ShoppingCart} color="orange" />
      </div>
    </div>
  );
}

function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📦 Gerenciar Produtos</h2>
        <button className="btn-primary flex items-center">
          <PlusCircle size={20} className="mr-2" />
          Novo Produto
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Produto</th>
              <th className="text-left py-3">Preço</th>
              <th className="text-left py-3">Estoque</th>
              <th className="text-left py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-3">
                  <div className="flex items-center">
                    <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded mr-3 object-cover" />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm opacity-70">{product.description?.substring(0, 50)}...</div>
                    </div>
                  </div>
                </td>
                <td className="py-3">R$ {product.price}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock} unidades
                  </span>
                </td>
                <td className="py-3">
                  <button className="px-3 py-1 mr-2 rounded border">Editar</button>
                  <button className="px-3 py-1 rounded bg-red-100 text-red-700">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoriesManagement() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🏷️ Gerenciar Categorias</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nome da nova categoria"
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg mr-4"
        />
        <button className="btn-primary mt-4 md:mt-0">Criar Categoria</button>
      </div>
      <p className="opacity-70">Funcionalidade em desenvolvimento...</p>
    </div>
  );
}

function CouponsManagement() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🎫 Gerenciar Cupons</h2>
      <p className="opacity-70">Funcionalidade em desenvolvimento...</p>
    </div>
  );
}

function AttendantsManagement() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">👥 Gerenciar Atendentes</h2>
      <p className="opacity-70">Funcionalidade em desenvolvimento...</p>
    </div>
  );
}

function PendingOrders() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">⏳ Comandas Pendentes</h2>
      <p className="opacity-70">Funcionalidade em desenvolvimento...</p>
    </div>
  );
}

function SiteSettings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">⚙️ Configurações do Site</h2>
      <p className="opacity-70">Funcionalidade em desenvolvimento...</p>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="p-4 rounded-xl border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-70">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
