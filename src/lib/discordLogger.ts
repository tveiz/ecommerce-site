export async function sendDiscordLog(webhookUrl: string, embed: any) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar log para Discord:', error);
    return false;
  }
}

export function createAccountEmbed(userData: any, ip: string, hwid: string) {
  return {
    title: "📝 NOVA CONTA CRIADA",
    color: 3066993,
    fields: [
      { name: "👤 Nome", value: userData.username || "Não informado", inline: true },
      { name: "📧 Email", value: userData.email || "Não informado", inline: true },
      { name: "🆔 ID", value: userData.id || "N/A", inline: true },
      { name: "🔧 HWID", value: hwid || "N/A", inline: true },
      { name: "🌐 IP", value: ip || "N/A", inline: true },
      { name: "📅 Data", value: new Date().toLocaleString('pt-BR'), inline: true },
      { name: "🖼️ Foto", value: userData.photo_url ? "Sim" : "Não", inline: true },
      { name: "👑 Admin", value: userData.is_admin ? "Sim" : "Não", inline: true },
      { name: "💼 Atendente", value: userData.is_attendant ? "Sim" : "Não", inline: true },
      { name: "🔗 User Agent", value: navigator.userAgent.substring(0, 100) || "N/A", inline: false },
    ],
    timestamp: new Date().toISOString(),
  };
}

export function createProductEmbed(productData: any, user: any, paymentMethod: string) {
  return {
    title: "🛒 PRODUTO CRIADO",
    color: 15105570,
    fields: [
      { name: "📦 Nome do Produto", value: productData.name || "N/A", inline: true },
      { name: "💰 Valor", value: `R$ ${productData.price || 0}`, inline: true },
      { name: "📊 Estoque", value: productData.stock?.toString() || "0", inline: true },
      { name: "👤 Criado por", value: user?.email || "N/A", inline: true },
      { name: "🆔 ID Produto", value: productData.id || "N/A", inline: true },
      { name: "💳 Método Pagamento", value: paymentMethod || "N/A", inline: true },
      { name: "📅 Data", value: new Date().toLocaleString('pt-BR'), inline: true },
      { name: "📝 Descrição", value: productData.description?.substring(0, 100) + "..." || "Sem descrição", inline: false },
    ],
    timestamp: new Date().toISOString(),
  };
}
