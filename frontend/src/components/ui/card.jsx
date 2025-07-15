export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-transparent transition-transform transform hover:scale-[1.02] hover:shadow-[0_0_30px_#64dd17] duration-300 rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div
      className={`bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-white/20 rounded-xl p-4 text-[#e0f2f1] ${className}`}
    >
      {children}
    </div>
  );
}
