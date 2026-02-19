// src/components/portfolio/PortfolioControls.tsx

import React from 'react';
import DatePicker from '@/components/DatePickerField'; // Esta ruta se mantiene si DatePickerField está en src/components

interface PortfolioControlsProps {
  dates: Date[];
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const PortfolioControls: React.FC<PortfolioControlsProps> = ({ dates, selectedDate, onDateChange }) => {
  if (dates.length === 0 || !selectedDate) {
    return null; // No renderizar el DatePicker si no hay fechas o no hay fecha seleccionada
  }

  return (
    <DatePicker selected={selectedDate} onChange={onDateChange} includeDates={dates} />
  );
};

export default PortfolioControls;