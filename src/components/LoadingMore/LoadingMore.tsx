import React from 'react'
const LoadingMore: React.FC = () => (
  <div className="flex justify-center items-center gap-2 text-gray-500 mt-4">
    <div
      role="status"
      aria-label="loading spinner"
      className="w-5 h-5 border-4 border-gray-300 border-t-stone-500 rounded-full animate-spin"
    ></div>
    <span>Loading more products...</span>
  </div>
)

export default LoadingMore
