export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sobre</h3>
            <p>Plataforma de e-commerce com múltiplas funcionalidades.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <div className="space-y-2">
              <a href="/" className="block hover:text-orange-400">Início</a>
              <a href="/#products" className="block hover:text-orange-400">Produtos</a>
              <a href="/profile" className="block hover:text-orange-400">Minha Conta</a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Suporte</h3>
            <a 
              href="https://discord.gg/PtAw6gDg8k" 
              target="_blank"
              className="inline-block bg-blue-600 px-4 py-2 rounded-lg"
            >
              🎮 Entrar no Discord
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} E-commerce Site. Demo.</p>
        </div>
      </div>
    </footer>
  );
}
