export function PageContainer({ children, className = '', ...props }) {
  return (
    <div className={`container-custom ${className}`} {...props}>
      {children}
    </div>
  );
}