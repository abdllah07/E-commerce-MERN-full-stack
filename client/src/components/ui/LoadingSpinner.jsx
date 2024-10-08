// components/common/LoadingSpinner.js
function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }
  
  export default LoadingSpinner;
  