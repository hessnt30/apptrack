export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
    </div>
  );
}
