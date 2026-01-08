'use client';
import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Exemplo de uso global (pode ser chamado de qualquer lugar)
  useEffect(() => {
    // Expor a função globalmente para uso em outros componentes
    (window as any).showNotification = showNotification;
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': return <CheckCircle size={24} />;
      case 'error': return <AlertCircle size={24} />;
      case 'warning': return <AlertCircle size={24} />;
      case 'info': return <Info size={24} />;
      default: return <Info size={24} />;
    }
  };

  const getColor = (type: NotificationType) => {
    switch (type) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return 'var(--color-destaque)';
      default: return 'var(--color-destaque)';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="relative p-4 rounded-xl shadow-2xl max-w-sm animate-slideIn"
          style={{
            backgroundColor: 'var(--color-secundario)',
            color: 'var(--color-texto)',
            borderLeft: `4px solid ${getColor(notification.type)}`,
          }}
        >
          <div className="flex items-start">
            <div className="mr-3 mt-1" style={{ color: getColor(notification.type) }}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold mb-1">{notification.title}</h4>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                backgroundColor: getColor(notification.type),
                animation: `shrink ${notification.duration || 5000}ms linear forwards`
              }}
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes shrink {
          from { width: 100% }
          to { width: 0% }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
