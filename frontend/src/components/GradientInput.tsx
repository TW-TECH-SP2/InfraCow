import React, { InputHTMLAttributes } from 'react';

interface GradientInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const GradientInput: React.FC<GradientInputProps> = ({ label, ...props }) => {
  return (
    <div className="mb-6">
      <label className="block text-white mb-2">{label}</label>
      <div className="relative p-0.5 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-yellow-500">
        <input
          {...props}
          className="w-full px-4 py-3 bg-gray-900 text-white rounded-full focus:outline-none"
        />
      </div>
    </div>
  );
};

export default GradientInput;