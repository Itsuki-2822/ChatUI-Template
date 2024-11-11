// src/components/ui/button.tsx
import React from 'react';
import { ReactNode, ButtonHTMLAttributes } from 'react';


type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
  size?: 'icon';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']; // type属性を追加
};

export function Button({ children, onClick, variant, className, disabled, size }: ButtonProps) {
  const baseStyle = "p-2 rounded-md";
  const variantStyle = variant === 'outline' ? "border border-gray-300" : "";
  const ghostStyle = variant === 'ghost' ? "bg-transparent" : "";
  const sizeStyle = size === 'icon' ? "p-1" : "";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${ghostStyle} ${sizeStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}