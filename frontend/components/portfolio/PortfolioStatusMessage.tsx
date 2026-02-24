// src/components/portfolio/PortfolioStatusMessage.tsx

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';   // ← Added this

interface PortfolioStatusMessageProps {
  type: 'loading' | 'error' | 'no-data';
  message: ReactNode;   // ← Changed from string to ReactNode (this was the fix)
}

const PortfolioStatusMessage: React.FC<PortfolioStatusMessageProps> = ({ 
  type, 
  message 
}) => {
  let icon;
  let iconColorClass;

  switch (type) {
    case 'loading':
      icon = <Loader2 className="w-8 h-8 animate-spin" />;
      iconColorClass = 'text-indigo-500';
      break;
    case 'error':
      icon = <AlertTriangle className="w-8 h-8" />;
      iconColorClass = 'text-red-500';
      break;
    case 'no-data':
      icon = <Loader2 className="w-8 h-8 animate-spin" />;
      iconColorClass = 'text-indigo-500';
      break;
    default:
      icon = null;
      iconColorClass = '';
  }

  return (
    <div className="text-center py-16 text-slate-500 bg-slate-50 rounded-lg flex flex-col items-center gap-4">
      <div className={`${iconColorClass}`}>
        {icon}
      </div>
      {message}   {/* ← Changed from <p>{message}</p> so rich JSX works perfectly */}
    </div>
  );
};

export default PortfolioStatusMessage;