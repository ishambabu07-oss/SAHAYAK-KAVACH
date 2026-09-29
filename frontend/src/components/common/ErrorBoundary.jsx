import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sahayak Kavach caught render error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/login';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6 text-[#1F2937]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Display Recovery Needed</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We encountered a display issue loading this section. Your session and data remain completely secure.
            </p>
            {this.state.error?.message && (
              <div className="mb-6 p-3 bg-gray-50 rounded-xl text-left text-xs font-mono text-gray-600 overflow-x-auto">
                {this.state.error.message}
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh View</span>
              </button>
              <button
                onClick={this.handleHome}
                className="px-4 py-2.5 rounded-xl bg-[#1C4E3D] text-white text-sm font-semibold hover:bg-[#163D30] transition flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Portal</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

