// src/components/ui/scroll-area.tsx
import React from 'react';
import { ReactNode } from 'react';


type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <div className={`overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}