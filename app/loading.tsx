export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-gray-900 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
          <div className="w-8 h-8 bg-white rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-gray-800 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
