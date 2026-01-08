export const themes = {
  normal: {
    name: 'Normal',
    colors: {
      background: '#F5F5DC',
      text: '#121212',
      primary: '#FF9800',
      secondary: '#FFFFFF',
      accent: '#FF5722',
    },
    animations: [],
  },
  dark: {
    name: 'Escuro',
    colors: {
      background: '#121212',
      text: '#F5F5DC',
      primary: '#FF6B35',
      secondary: '#1E1E1E',
      accent: '#FF8A65',
    },
    animations: [],
  },
  christmas: {
    name: 'Natal',
    colors: {
      background: '#1B5E20',
      text: '#FFFFFF',
      primary: '#F44336',
      secondary: '#C8E6C9',
      accent: '#FFEB3B',
    },
    animations: ['snow', 'sparkle'],
  },
  carnival: {
    name: 'Carnaval',
    colors: {
      background: '#4A148C',
      text: '#FFEB3B',
      primary: '#E91E63',
      secondary: '#9C27B0',
      accent: '#00BCD4',
    },
    animations: ['confetti', 'pulse'],
  },
  'sao-joao': {
    name: 'São João',
    colors: {
      background: '#FF9800',
      text: '#1A237E',
      primary: '#F44336',
      secondary: '#4CAF50',
      accent: '#FFEB3B',
    },
    animations: ['fireworks', 'bounce'],
  },
  'new-year': {
    name: 'Ano Novo',
    colors: {
      background: '#0D47A1',
      text: '#FFFFFF',
      primary: '#FFD700',
      secondary: '#B71C1C',
      accent: '#00E5FF',
    },
    animations: ['fireworks', 'countdown'],
  },
};

export type ThemeName = keyof typeof themes;
