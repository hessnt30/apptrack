export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s] z-50"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s] z-50"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce z-1000"></div>
    </div>
  );
}
