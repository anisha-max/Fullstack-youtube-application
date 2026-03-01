"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback((message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => removeNotification(id), 4000);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* Stack Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-[380px] pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`
              pointer-events-auto relative overflow-hidden flex items-start gap-4 p-4 
              rounded-xl border shadow-2xl backdrop-blur-md bg-white/90 dark:bg-slate-900/90
              ${getThemeClasses(n.type)}
              animate-[slideIn_0.3s_ease-out_forwards]
            `}
          >
            {/* Lucide Icon */}
            <div className="mt-0.5">
              <NotificationIcon type={n.type} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                {n.type}
              </span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                {n.message}
              </p>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => removeNotification(n.id)}
              className="opacity-40 hover:opacity-100 transition-opacity p-1 -mr-1"
            >
              <X size={16} />
            </button>

            {/* Animated Progress Bar */}
            <div 
              className={`absolute bottom-0 left-0 h-1 bg-current opacity-20 
              animate-[shrink_4s_linear_forwards] origin-left`} 
            />
          </div>
        ))}
      </div>

      {/* Pure Tailwind/CSS Keyframes */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%) scale(0.9); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </NotificationContext.Provider>
  );
}

function NotificationIcon({ type }) {
  const size = 20;
  const strokeWidth = 2.25;

  switch (type) {
    case "success": return <CheckCircle2 size={size} strokeWidth={strokeWidth} />;
    case "error":   return <AlertCircle size={size} strokeWidth={strokeWidth} />;
    case "warning": return <AlertTriangle size={size} strokeWidth={strokeWidth} />;
    default:        return <Info size={size} strokeWidth={strokeWidth} />;
  }
}

function getThemeClasses(type) {
  switch (type) {
    case "success": return "border-emerald-200/50 text-emerald-600 bg-emerald-50/50";
    case "error":   return "border-rose-200/50 text-rose-600 bg-rose-50/50";
    case "warning": return "border-amber-200/50 text-amber-600 bg-amber-50/50";
    default:        return "border-blue-200/50 text-blue-600 bg-blue-50/50";
  }
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within a NotificationProvider");
  return context;
};