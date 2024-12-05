export function Badge({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
  };

  return (
    <span
      className={`${baseStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}