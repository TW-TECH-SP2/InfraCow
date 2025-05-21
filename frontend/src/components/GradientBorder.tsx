import React, { ReactNode } from 'react';

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
}

const GradientBorder: React.FC<GradientBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative p-0.5 rounded-3xl bg-gradient-to-r from-red-500 via-green-500 to-yellow-500 ${className}`}>
      {children}
    </div>
  );
};

export default GradientBorder;