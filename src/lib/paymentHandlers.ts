export async function generatePixCode(amount: number, pixKey: string) {
  // Implementação básica - em produção use uma lib como pix-utils
  const payload = {
    amount: amount.toFixed(2),
    key: pixKey,
    merchant: 'E-commerce Site',
    city: 'São Paulo',
  };
  
  return {
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(payload))}`,
    payload: JSON.stringify(payload),
    key: pixKey,
    amount,
  };
}

export function simulatePayment() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'SIM' + Date.now(),
        message: 'Pagamento simulado com sucesso!',
      });
    }, 1500);
  });
}
