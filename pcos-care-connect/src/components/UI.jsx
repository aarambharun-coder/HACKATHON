'use client';

import { motion } from 'framer-motion';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  ...props
}) {
  const baseStyles =
    'font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 relative overflow-hidden active:scale-[0.97]';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5',
    secondary:
      'bg-gradient-to-r from-secondary to-purple-600 text-white shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5',
    outline:
      'border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary',
    ghost:
      'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger:
      'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20',
    glass:
      'glass text-gray-800 hover:bg-white/80',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      } ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

export function Card({ children, className = '', variant = 'default', hover = true, ...props }) {
  const variants = {
    default: 'bg-white border border-gray-100',
    glass: 'glass',
    gradient: 'card-gradient-border',
    elevated: 'bg-white shadow-premium',
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]} ${
        hover ? 'hover:shadow-premium hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all duration-200 ${
          error ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

export function Select({ label, error, options = [], className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all duration-200 appearance-none cursor-pointer ${
          error ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

export function Badge({ children, variant = 'primary', size = 'md', ...props }) {
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function Loading({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className={`relative ${sizes[size]}`}>
        <div className="absolute inset-0 rounded-full border-3 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary animate-spin" />
        <div
          className="absolute inset-1 rounded-full border-2 border-transparent border-t-secondary animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
      </div>
      {text && <p className="text-sm text-gray-500 animate-pulse">{text}</p>}
    </div>
  );
}

export function Skeleton({ className = '', ...props }) {
  return <div className={`skeleton ${className}`} {...props} />;
}

export function EmptyState({ icon = '📭', title, description, action }) {
  return (
    <div className="text-center py-16">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="text-6xl mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      )}
      {action}
    </div>
  );
}

export function StatCard({ icon, label, value, color = 'primary', delay = 0 }) {
  const colors = {
    primary: 'from-primary/10 to-primary/5 border-primary/10',
    secondary: 'from-secondary/10 to-secondary/5 border-secondary/10',
    green: 'from-emerald-100/50 to-emerald-50/50 border-emerald-200/50',
    blue: 'from-blue-100/50 to-blue-50/50 border-blue-200/50',
    purple: 'from-purple-100/50 to-purple-50/50 border-purple-200/50',
    amber: 'from-amber-100/50 to-amber-50/50 border-amber-200/50',
  };

  const textColors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    green: 'text-emerald-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    amber: 'text-amber-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-6 hover:shadow-premium transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className={`text-3xl font-bold ${textColors[color]} mt-1`}>{value}</p>
    </motion.div>
  );
}

export function PageHeader({ title, subtitle, gradient = 'from-primary to-primary-dark' }) {
  return (
    <section className={`bg-gradient-to-r ${gradient} text-white py-16 relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="container-max relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-3"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
