const SkeletonCard = () => (
  <div className="rounded-lg p-3 bg-white animate-pulse cursor-wait" data-testid="skeleton-card">
    <div className="w-full h-40 bg-gray-300 rounded-lg mb-4" role="generic"></div>
    <div className="h-4 w-full bg-gray-300 mb-2 rounded" role="generic"></div>
    <div className="h-4 w-3/4 bg-gray-300 rounded" role="generic"></div>
  </div>
)

export default SkeletonCard
