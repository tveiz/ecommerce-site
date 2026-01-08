'use client';
import { useState } from 'react';
import { X, Tag, CreditCard, Shield } from 'lucide-react';

interface CheckoutModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    description: string;
  };
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'simulacao' | 'pix_automatico' | 'pix_confiavel'>('simulacao');

  const finalPrice = product.price * (1 - discount / 100);

  const handleApplyCoupon = () => {
    // Simulação de validação de cupom
    if (coupon.toLowerCase() === 'desconto10') {
      setDiscount(10);
      alert('Cupom aplicado: 10% de desconto!');
    } else {
      alert('Cupom inválido ou expirado.');
    }
  };

  const handleCheckout = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Processar pagamento
      alert(`Compra realizada com sucesso! Método: ${paymentMethod}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {step === 1 ? 'Finalizar Compra' : 'Confirmar Pagamento'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Coluna da Esquerda: Produto */}
            <div>
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Preço original:</span>
                  <span className="font-bold">R$ {product.price.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto ({discount}%):</span>
                    <span>-R$ {(product.price * discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-3 border-t">
                  <span>Total:</span>
                  <span>R$ {finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Passos */}
            <div>
              {step === 1 ? (
                <>
                  {/* Cupom */}
                  <div className="mb-6">
                    <label className="block font-medium mb-2 flex items-center">
                      <Tag size={18} className="mr-2" />
                      Cupom de Desconto
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Digite seu cupom"
                        className="flex-1 px-4 py-2 border rounded-lg"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 rounded-lg font-medium"
                        style={{ backgroundColor: 'var(--color-destaque)', color: 'white' }}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>

                  {/* Método de Pagamento */}
                  <div className="mb-6">
                    <label className="block font-medium mb-2 flex items-center">
                      <CreditCard size={18} className="mr-2" />
                      Método de Pagamento
                    </label>
                    <div className="space-y-3">
                      <button
                        onClick={() => setPaymentMethod('simulacao')}
                        className={`w-full p-4 rounded-lg border-2 text-left ${
                          paymentMethod === 'simulacao' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : ''
                        }`}
                      >
                        <div className="font-bold">💳 Simulação</div>
                        <div className="text-sm opacity-80">Pagamento simulado para testes</div>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('pix_automatico')}
                        className={`w-full p-4 rounded-lg border-2 text-left ${
                          paymentMethod === 'pix_automatico' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : ''
                        }`}
                      >
                        <div className="font-bold">🏦 PIX Automático</div>
                        <div className="text-sm opacity-80">QR Code gerado automaticamente</div>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('pix_confiavel')}
                        className={`w-full p-4 rounded-lg border-2 text-left ${
                          paymentMethod === 'pix_confiavel' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : ''
                        }`}
                      >
                        <div className="font-bold">🛡️ PIX Confiável</div>
                        <div className="text-sm opacity-80">Verificação manual do pagamento</div>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Etapa 2: Confirmação */}
                  <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: 'var(--color-destaque)' }}>
                    <h3 className="font-bold mb-2 flex items-center">
                      <Shield size={18} className="mr-2" />
                      Informações do Pagamento
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Método:</span>
                        <span className="font-medium">{paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valor:</span>
                        <span className="font-bold">R$ {finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Aviso para PIX Confiável */}
                  {paymentMethod === 'pix_confiavel' && (
                    <div className="mb-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200">
                      <p className="font-bold text-yellow-800 dark:text-yellow-200">⚠️ ATENÇÃO</p>
                      <p className="text-sm mt-1">
                        Após realizar o PIX, sua compra ficará como <strong>PENDENTE</strong> até nossa verificação manual.
                        Um chat privado será criado para atendimento e um ticket será aberto no nosso Discord.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Botões de Navegação */}
              <div className="flex gap-4 pt-6">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-lg border font-medium"
                  >
                    Voltar
                  </button>
                )}
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-3 rounded-lg font-bold text-white"
                  style={{ backgroundColor: 'var(--color-destaque)' }}
                >
                  {step === 1 ? 'Continuar para Pagamento' : 'Confirmar Compra'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
