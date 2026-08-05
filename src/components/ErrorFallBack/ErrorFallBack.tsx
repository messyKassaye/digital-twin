import { AlertCircle, Home, RefreshCw, ChevronLeft } from "lucide-react";

type Props = {
  error?: Error;
  resetErrorBoundary?: () => void;
};

const ErrorFallBack = ({ error, resetErrorBoundary }: Props) => {
  const handleGoBack = () => {
    window.location.reload();
  };

  const handleReset = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-red-400 dark:text-red-400">
            Oops! Something went wrong
          </h2>
          <p className="text-white dark:text-gray-400">
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/10 p-4 text-left border border-red-200 dark:border-red-800">
              <p className="text-sm font-mono text-red-800 dark:text-red-300 break-words">
                {error.message || "Unknown error occurred"}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
              bg-slate-800 text-slate-200 border border-slate-700
              hover:bg-slate-700 hover:border-slate-600
              focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900
              transition-colors dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
            Go Back
          </button>

          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
              bg-transparent text-slate-200 border border-slate-600
              hover:bg-slate-800 hover:border-slate-500
              focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900
              transition-colors dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <Home className="h-4 w-4" />
            Go Home
          </button>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
              bg-red-600 text-white
              hover:bg-red-700
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900
              transition-colors dark:bg-red-600 dark:hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">
          If the problem persists, please contact support or clear your browser
          cache.
        </p>
      </div>
    </div>
  );
};

export default ErrorFallBack;
