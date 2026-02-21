// src/components/portfolio/PortfolioStatusMessage.tsx

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface PortfolioStatusMessageProps {
  type: 'loading' | 'error' | 'no-data';
  message: string;
}

const PortfolioStatusMessage: React.FC<PortfolioStatusMessageProps> = ({ type, message }) => {
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
      <p>{message}</p>
    </div>
  );
};

export default PortfolioStatusMessage;