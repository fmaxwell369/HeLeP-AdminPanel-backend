// src/components/IconWrapper.tsx
import React, { type ReactNode } from 'react';

interface IconWrapperProps {
  children: ReactNode;
  color: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children, color }) => {
  return (
    <div 
      className="inline-flex items-center justify-center transition-all duration-300 ease-out 
                 filter drop-shadow-[0_0_0_transparent] hover:drop-shadow-[0_0_10px_var(--icon-color)] 
                 focus-within:drop-shadow-[0_0_10px_var(--icon-color)]"
      style={{ 
        '--icon-color': color, 
        color: color 
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default IconWrapper;