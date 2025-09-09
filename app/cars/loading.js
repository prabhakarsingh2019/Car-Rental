export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-8 h-8 border-3 border-secondary-600 border-t-transparent rounded-full animate-spin"></div>

      <span className="mt-3 text-sm font-medium text-brand-400 animate-pulse">
        Please wait...
      </span>
    </div>
  );
}

export default Loading;
