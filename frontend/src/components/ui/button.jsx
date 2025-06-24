export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
}