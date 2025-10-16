export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative h-16 w-16 flex items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-primary border-b-muted border-l-transparent border-r-transparent" />
        <div className="absolute inset-2 rounded-full bg-primary/10" />
        <div className="absolute inset-4 rounded-full bg-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-6 w-6 text-primary animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
