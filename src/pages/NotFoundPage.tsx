import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl font-black text-slate-200">404</div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-500">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            <Home size={16} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
