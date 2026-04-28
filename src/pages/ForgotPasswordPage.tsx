import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { forgotPassword } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      addToast('success', 'If an account with that email exists, a reset link will be sent');
    } catch {
      addToast('error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-3xl">
            <KeyRound size={28} className="text-primary-600" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            {sent ? 'Check your email' : 'Forgot your password?'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {sent
              ? 'If an account with that email exists, a reset link will be sent.'
              : 'Enter your email and we\'ll send you a reset link.'}
          </p>

          {!sent && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          )}

          <div className="mt-6">
            <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
