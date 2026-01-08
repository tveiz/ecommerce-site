# 🛒 E-commerce Site

Site de e-commerce completo com painel administrativo, múltiplas formas de pagamento e integração com Discord.

## 🚀 Tecnologias
- **Front-end**: Next.js 14 + React + TypeScript
- **Banco de Dados**: Supabase (PostgreSQL)
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel (Serverless)
- **Autenticação**: Supabase Auth
- **Pagamentos**: PIX (simulação e real)

## 📦 Funcionalidades

### Para Usuários
- ✅ Cadastro e login personalizado
- ✅ Navegação por categorias (com "Todos" fixo)
- ✅ Visualização de produtos com filtros
- ✅ Sistema de carrinho
- ✅ Múltiplas formas de pagamento
- ✅ Cupons de desconto
- ✅ Perfil do usuário com foto
- ✅ Temas personalizáveis (6 temas)
- ✅ Sistema de notificações próprio

### Para Administradores
- ✅ Painel administrativo completo
- ✅ Gerenciamento de categorias
- ✅ Criação/edição de produtos
- ✅ Controle de estoque (0-1000 unidades)
- ✅ Sistema de cupons
- ✅ Gerenciamento de atendentes
- ✅ Verificação de compras pendentes
- ✅ Configurações do site
- ✅ Webhooks Discord para logs

## 🛠️ Configuração

### 1. Variáveis de Ambiente
Copie `.env.local.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role

DISCORD_WEBHOOK_URL_LOGS_GERAL=webhook_geral
DISCORD_WEBHOOK_URL_LOGS_CONTAS=webhook_contas
DISCORD_WEBHOOK_URL_LOGS_PRODUTOS=webhook_produtos
