import React from 'react'
import type { ErrorRetryProps } from './Error.types'
const ErrorRetry: React.FC<ErrorRetryProps> = ({ error, onRetry }) => (
  <div className="text-center my-4">
    <p role="alert" className="text-red-500 font-bold text-xl mb-2">
      {error}
    </p>
    <button onClick={onRetry} className="cursor-pointer px-4 py-2 bg-stone-400 hover:bg-stone-700 text-white rounded-lg">
      Try Again
    </button>
  </div>
)

export default ErrorRetry
