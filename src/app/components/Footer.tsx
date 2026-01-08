'use client';

export default function Footer() {
  return (
    <footer className="mt-16 border-t pt-8" style={{ borderColor: 'var(--color-destaque)' }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-destaque)' }}>Sobre</h3>
            <p className="text-sm opacity-80">
              Plataforma de e-commerce segura com múltiplas formas de pagamento e suporte 24/7.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-destaque)' }}>Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#products" className="hover:underline">Produtos</a></li>
              <li><a href="/#categories" className="hover:underline">Categorias</a></li>
              <li><a href="/profile" className="hover:underline">Minha Conta</a></li>
              <li><a href="https://discord.gg/PtAw6gDg8k" target="_blank" className="hover:underline">Suporte Discord</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-destaque)' }}>Pagamento</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs">PIX</span>
              <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs">Simulação</span>
              <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs">Confiavel</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-destaque)' }}>Contato</h3>
            <p className="text-sm opacity-80">
              Dúvidas? Entre no nosso Discord ou envie um email para suporte.
            </p>
            <div className="mt-4">
              <a 
                href="https://discord.gg/PtAw6gDg8k" 
                target="_blank"
                className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: '#5865F2' }}
              >
                🎮 Discord
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} E-commerce Site. Todos os direitos reservados.</p>
          <p className="mt-1">Este é um projeto demonstrativo.</p>
          <p className="mt-2 text-xs">⚠️ Não compre produtos reais. Esta é uma demonstração técnica.</p>
        </div>
      </div>
    </footer>
  );
}
