import React from 'react'

interface ShowMoreButtonProps {
  onClick: () => void
  disabled?: boolean
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <div className="text-center mt-6">
      <button
        onClick={onClick}
        disabled={disabled}
        className="cursor-pointer px-4 py-2 text-[#964F52] bg-[#F2E8E8] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-pink-200 transition hover:bg-[#e9dddd] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Show More
      </button>
    </div>
  )
}

export default ShowMoreButton
