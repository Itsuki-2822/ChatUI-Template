// src/components/ui/avatar.tsx
import React from 'react';
import { ReactNode } from 'react';


type AvatarProps = {
  children: ReactNode;
  className?: string;
};

export function Avatar({ children, className }: AvatarProps) {
  return (
    <div className={`rounded-full overflow-hidden w-10 h-10 ${className}`}>
      {children}
    </div>
  );
}

type AvatarFallbackProps = {
  children: ReactNode;
};

export function AvatarFallback({ children }: AvatarFallbackProps) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-300">
      {children}
    </div>
  );
}

type AvatarImageProps = {
  src: string;
};

export function AvatarImage({ src }: AvatarImageProps) {
  return <img src={src} alt="Avatar" className="w-full h-full object-cover" />;
}