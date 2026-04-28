import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const strength = (() => {
    if (password.length === 0) return { label: '', color: '', pct: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    const map = [
      { label: 'Weak', color: 'bg-red-400', pct: 25 },
      { label: 'Fair', color: 'bg-orange-400', pct: 50 },
      { label: 'Good', color: 'bg-yellow-400', pct: 75 },
      { label: 'Strong', color: 'bg-emerald-500', pct: 100 },
    ];
    return map[Math.min(score - 1, 3)];
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      addToast('error', 'Password must be 8+ chars with letters and a digit');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password);
      addToast('success', 'Account created! Welcome aboard.');
      navigate('/sheet');
    } catch (err: unknown) {
      addToast('error', err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center mb-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-lg">D</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 text-center">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500 text-center">Start tracking your DSA progress in 30 seconds.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  required
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
              </div>
            </div>
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.pct}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[11px] text-slate-400">{strength.label}</span>
                    <span className="text-[11px] text-slate-400">Must include letters and a digit</span>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
