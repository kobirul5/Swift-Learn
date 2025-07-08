import { FiFileText, FiRefreshCw } from "react-icons/fi";

export default function NoContentAvilable() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 p-6 rounded-full bg-dark-800/50 text-dark-400">
        <FiFileText className="h-12 w-12 animate-pulse" />
      </div>
      <h3 className="text-xl font-medium text-dark-300 mb-2">No Content Available</h3>
      <p className="text-dark-500 max-w-md px-4">
        This section is currently empty. Please check back later or contact support if you believe this is an error.
      </p>
      <button className="mt-6 px-6 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors flex items-center gap-2">
        <FiRefreshCw className="h-4 w-4" />
        Refresh Content
      </button>
    </div>
  )
}
