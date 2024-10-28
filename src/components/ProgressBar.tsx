import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <div className="mb-4">
      <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                   bg-[length:200%_100%] animate-gradient transition-all duration-500"
          style={{ width: `${percentage}%` }}
        >
          <div className="w-full h-full opacity-30 animate-pulse bg-white"></div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-400 text-center">
        {percentage.toFixed(1)}% Complete
      </div>
    </div>
  );
};

export default ProgressBar;