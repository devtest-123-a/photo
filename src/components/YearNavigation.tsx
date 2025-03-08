
import React from 'react';
import { usePhotoContext } from '../context/PhotoContext';

type YearNavigationProps = {
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
};

const YearNavigation: React.FC<YearNavigationProps> = ({ selectedYear, setSelectedYear }) => {
  const { getYears } = usePhotoContext();
  const years = getYears();

  return (
    <div className="flex justify-center my-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="glass-blur rounded-full py-2 px-4 flex space-x-2 overflow-x-auto max-w-full">
        <button
          className={`year-chip ${selectedYear === null ? 'active' : ''}`}
          onClick={() => setSelectedYear(null)}
        >
          Tất cả
        </button>
        
        {years.map(year => (
          <button
            key={year}
            className={`year-chip ${selectedYear === year ? 'active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearNavigation;
