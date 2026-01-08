'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeName } from '@/lib/theme';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Cart Context
interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('normal');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Theme logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('siteTheme') as ThemeName;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Cart logic
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.productId === item.productId);
      let newItems;
      
      if (existingItem) {
        newItems = prev.map(i => 
          i.productId === item.productId 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newItems = [...prev, item];
      }
      
      localStorage.setItem('ecommerce_cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const newItems = prev.filter(item => item.productId !== productId);
      localStorage.setItem('ecommerce_cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ecommerce_cart');
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      <CartContext.Provider value={{
        items: cartItems,
        addItem: addToCart,
        removeItem: removeFromCart,
        clearCart,
        total: cartTotal,
      }}>
        {children}
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}
