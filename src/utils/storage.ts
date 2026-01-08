const PREFIX = 'ecommerce_';

export const storage = {
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      return false;
    }
  },

  get: (key: string) => {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return null;
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(PREFIX + key);
  },

  clear: () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  },
};

// Chaves específicas
export const STORAGE_KEYS = {
  THEME: 'theme',
  CART: 'cart',
  USER_PREFS: 'user_preferences',
  RECENT_VIEWS: 'recent_views',
};
