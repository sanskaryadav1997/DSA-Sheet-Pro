import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { resetPassword } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/\d/.test(newPassword)) {
      addToast('error', 'Password must be 8+ chars with letters and a digit');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setDone(true);
      addToast('success', 'Password reset successfully!');
    } catch {
      addToast('error', 'Invalid or expired reset link');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center max-w-md shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Invalid Reset Link</h1>
          <p className="mt-2 text-sm text-slate-500">This link is invalid or has expired.</p>
          <Link to="/forgot-password" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          {done ? (
            <>
              <CheckCircle size={48} className="mx-auto text-emerald-500" />
              <h1 className="mt-4 text-xl font-bold text-slate-900">Password reset!</h1>
              <p className="mt-2 text-sm text-slate-500">Your password has been updated. You can now sign in.</p>
              <Link to="/login" className="mt-6 inline-block rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors">
                Sign in
              </Link>
            </>
          ) : (
            <>
              <Lock size={48} className="mx-auto text-primary-600" />
              <h1 className="mt-4 text-xl font-bold text-slate-900">Set new password</h1>
              <p className="mt-2 text-sm text-slate-500">Choose a strong password for your account.</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Resetting...' : 'Reset password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
