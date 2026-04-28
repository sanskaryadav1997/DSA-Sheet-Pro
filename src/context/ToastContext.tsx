import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import type { Toast } from '@/types';

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutMap = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Date.now().toString(36) + Math.random().toString(36).slice(2);
    
    setToasts(prev => [...prev, { id, type, message }]);
    
    const timeoutId = setTimeout(() => {
      removeToast(id);
    }, 4000);
    
    timeoutMap.current.set(id, timeoutId);
  }, []);

  const removeToast = useCallback((id: string) => {
    const timeoutId = timeoutMap.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutMap.current.delete(id);
    }
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      // Clear all pending timers on unmount
      timeoutMap.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      timeoutMap.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
