import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const styles = {
      default: 'bg-blue-600 hover:bg-blue-700 text-white',
      outline: 'border border-gray-300 hover:bg-gray-50 dark:border-zinc-700',
      ghost: 'hover:bg-gray-100 dark:hover:bg-zinc-800',
    }[variant];

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2',
          styles,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
