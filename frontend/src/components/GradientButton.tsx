import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative py-3 px-4 w-full rounded-full bg-gradient-to-r from-red-500 via-green-500 to-yellow-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity ${className}`}
    >
      {children}
    </button>
  );
};

export default GradientButton;