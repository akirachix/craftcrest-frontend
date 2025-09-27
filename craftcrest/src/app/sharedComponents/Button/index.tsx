'use client';
import React from 'react';
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
  buttonText: string;
  disabled?: boolean;
  onClick?: () => void;
}
export default function Button({
  type = 'button',
  variant,
  buttonText,
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseClasses =
    'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full';
  const variants = {
    primary:
      'bg-[#6B0000] text-white hover:bg-[#5A0000] focus:ring-yellow-400 disabled:bg-gray-400',
    secondary:
      'bg-white text-[#6B0000] border border-[#6B0000] hover:bg-gray-50 focus:ring-[#6B0000] disabled:bg-gray-100',
  };
  const isSubmitting = buttonText.includes('...');
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
        {buttonText}
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
}
