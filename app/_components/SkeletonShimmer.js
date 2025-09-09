function SkeletonShimmer({ className }) {
  return (
    <div
      className={`relative overflow-hidden bg-brand-700 rounded-full ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
    </div>
  );
}

export default SkeletonShimmer;
