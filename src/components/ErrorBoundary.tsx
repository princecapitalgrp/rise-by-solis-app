import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-serif text-text-redBrown mb-4">Something went wrong</h2>
            <p className="text-text-walnut mb-6">
              The application encountered an unexpected error. This might be due to missing configuration or a temporary issue.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-text-charcoal text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all"
            >
              Reload Application
            </button>
            {import.meta.env.DEV && (
              <pre className="mt-6 p-4 bg-surface text-xs text-left overflow-auto rounded-lg text-red-600">
                {this.state.error?.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
