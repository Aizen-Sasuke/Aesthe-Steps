import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: Readonly<ErrorBoundaryProps>;
  public state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let displayMessage = error.message || 'An unexpected error occurred.';
    try {
      const parsed = JSON.parse(error.message);
      if (parsed && typeof parsed.error === 'string') {
        displayMessage = parsed.error;
      }
    } catch {
      // keep raw message
    }
    return {
      hasError: true,
      message: displayMessage,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Application ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#0E0E12] text-[#18181B] dark:text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-3xl p-7 shadow-lg space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-serif-display text-2xl font-bold text-[#18181B] dark:text-zinc-50">
                Something paused
              </h2>
              <p className="text-xs text-[#18181B]/70 dark:text-zinc-400 leading-relaxed">
                {this.state.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Store</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
