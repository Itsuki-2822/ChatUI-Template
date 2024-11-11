// src/components/ui/input.tsx
import React from 'react';

type InputProps = {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export function Input({ type, placeholder, value, onChange, className }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-md p-2 w-full ${className}`}
    />
  );
}