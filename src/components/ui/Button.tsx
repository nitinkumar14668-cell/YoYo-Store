import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20": variant === 'primary',
            "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700": variant === 'secondary',
            "border border-zinc-200 bg-transparent hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:text-zinc-300": variant === 'outline',
            "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-50": variant === 'ghost',
            "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20": variant === 'danger',
            "h-9 px-4 py-2": size === 'sm',
            "h-11 px-6 py-2": size === 'md',
            "h-14 px-8 text-base rounded-2xl": size === 'lg',
            "h-11 w-11": size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
