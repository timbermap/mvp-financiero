// src/components/portfolio/PortfolioHeader.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, BarChart3, ChevronDown, ExternalLink } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Horizon, Risk, VALID_RISKS, VALID_HORIZONS } from './types';
import DatePicker from '@/components/DatePickerField';

interface PortfolioHeaderProps {
  horizon: Horizon | null;
  risk: Risk | null;
  selectedDate: Date | null;
  dates: Date[];
  onDateChange: (date: Date | null) => void;
  isLimitReached?: boolean; // <-- NEW PROP
}

// Custom trigger for DatePicker
const CustomDateTrigger = React.forwardRef<HTMLSpanElement, any>(
  ({ value, onClick }, ref) => (
    <span
      ref={ref}
      onClick={onClick}
      className="font-semibold text-slate-900 hover:underline cursor-pointer active:text-emerald-700"
    >
      {value}
    </span>
  )
);

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  horizon,
  risk,
  selectedDate,
  dates,
  onDateChange,
  isLimitReached = false, // <-- Default to false
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openMenu, setOpenMenu] = useState<'horizon' | 'risk' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Dynamic portfolio link (Fixed plural /product/)
  const portfolioUrl =
    horizon && risk
      ? `/product/rotations?risk=${risk}&horizon=${horizon}`
      : '/product/rotations';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (type: 'risk' | 'horizon', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`/product/portfolio?${params.toString()}`);
    setOpenMenu(null);
  };

  const renderDropdown = (
    current: string | null,
    options: readonly string[],
    type: 'risk' | 'horizon',
    textColor: string = 'text-slate-900'
  ) => {
    const isOpen = openMenu === type;

    // NEW: Restrict options if limit is reached
    let displayOptions = [...options];
    if (isLimitReached) {
      if (type === 'risk') displayOptions = ['medium'];
      if (type === 'horizon') displayOptions = ['month'];
    }

    return (
      <div className="relative inline-block" ref={isOpen ? menuRef : null}>
        <span
          onClick={() => setOpenMenu(isOpen ? null : type)}
          className={`font-semibold ${textColor} capitalize hover:underline cursor-pointer flex items-center gap-1 group`}
        >
          {current || 'N/A'}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            } group-hover:text-emerald-600`}
          />
        </span>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-sm">
            {displayOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleChange(type, option)}
                className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors
                  ${
                    option === current
                      ? 'text-emerald-700 font-medium bg-emerald-50'
                      : 'text-slate-700'
                  }`}
              >
                <span className="capitalize">{option}</span>
                {option === current && (
                  <span className="text-emerald-600">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-10">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl py-5 px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 text-[17px] text-slate-700">

          {/* LEFT SIDE CONTENT */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">

            {/* Horizon + Risk */}
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>
                Horizon:{' '}
                {horizon && renderDropdown(horizon, VALID_HORIZONS, 'horizon')}
                {' - '}
                Risk:{' '}
                {risk && renderDropdown(risk, VALID_RISKS, 'risk')}
              </span>
            </div>

            {/* Separator */}
            {selectedDate && (
              <span className="text-slate-300 text-2xl font-light leading-none">
                /
              </span>
            )}

            {/* Analysis Date */}
            {selectedDate && (
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>
                  Analysis Date:{' '}
                  {dates.length > 0 ? (
                    <DatePicker
                      selected={selectedDate}
                      onChange={onDateChange}
                      includeDates={dates}
                      customInput={<CustomDateTrigger />}
                    />
                  ) : (
                    <span className="font-semibold text-slate-900">
                      {formattedDate}
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* RIGHT SIDE LINK */}
          {horizon && risk && (
            <a
              href={portfolioUrl}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 transition-colors"
            >
              View Sector Rotation
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;