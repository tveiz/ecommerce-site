'use client';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { themes, ThemeName } from '@/lib/theme';

interface ThemeSelectorProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  onClose: () => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange, onClose }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(currentTheme);

  const handleSave = () => {
    onThemeChange(selectedTheme);
    localStorage.setItem('siteTheme', selectedTheme);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ 
          backgroundColor: 'var(--color-secundario)',
          color: 'var(--color-texto)',
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🎨 Selecione o Tema</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setSelectedTheme(key as ThemeName)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTheme === key ? 'ring-4 ring-opacity-50' : ''
                }`}
                style={{
                  borderColor: selectedTheme === key ? theme.colors.primary : 'transparent',
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {key === 'christmas' && '🎄'}
                    {key === 'carnival' && '🎭'}
                    {key === 'sao-joao' && '🎆'}
                    {key === 'new-year' && '🎉'}
                    {key === 'dark' && '🌙'}
                    {key === 'normal' && '☀️'}
                  </div>
                  <div className="font-semibold">{theme.name}</div>
                  {selectedTheme === key && (
                    <div className="mt-2">
                      <Check className="mx-auto" size={20} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border font-medium"
              style={{ 
                borderColor: 'var(--color-destaque)',
                color: 'var(--color-destaque)',
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: 'var(--color-destaque)' }}
            >
              Aplicar Tema
            </button>
          </div>

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
            <p className="text-sm opacity-80">
              <strong>💡 Dica:</strong> Temas festivos (Natal, Carnaval, etc.) incluem animações especiais de fundo 
              que não interferem na navegação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
