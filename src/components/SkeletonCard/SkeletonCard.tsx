const SkeletonCard = () => (
  <div className="max-w-[176px] rounded-lg p-3 bg-white animate-pulse cursor-wait">
    <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
    <div className="h-4 w-full bg-gray-300 mb-2 rounded"></div>
    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
  </div>
)

export default SkeletonCard
