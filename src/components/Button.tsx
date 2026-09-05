import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 min-h-[34px]',
    md: 'px-4 py-2 text-sm rounded-xl gap-2 min-h-[42px]',
    lg: 'px-6 py-3 text-base rounded-xl gap-2.5 min-h-[48px]',
  };

  const variantClasses = {
    primary:
      'bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold shadow-md shadow-sky-500/20 focus-visible:ring-2 focus-visible:ring-sky-400',
    secondary:
      'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/20 focus-visible:ring-2 focus-visible:ring-indigo-400',
    outline:
      'border border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-800/60 text-slate-200 font-medium focus-visible:ring-2 focus-visible:ring-slate-400',
    ghost:
      'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium focus-visible:ring-2 focus-visible:ring-slate-500',
    danger:
      'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-semibold shadow-md shadow-rose-600/20 focus-visible:ring-2 focus-visible:ring-rose-400',
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-sans tracking-tight transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : icon && iconPosition === 'left' ? (
        <span className="material-symbols-outlined text-[1.15em] shrink-0">{icon}</span>
      ) : null}

      <span className="truncate">{children}</span>

      {!isLoading && icon && iconPosition === 'right' ? (
        <span className="material-symbols-outlined text-[1.15em] shrink-0">{icon}</span>
      ) : null}
    </button>
  );
};
