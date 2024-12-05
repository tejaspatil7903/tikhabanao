export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    outline: 'btn-outline',
  };

  return (
    <button
      className={`${baseStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}