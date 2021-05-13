export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium border border-secondary-300 bg-secondary-200 text-secondary-800">
      {children}
    </span>
  );
}
