import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { ToastProvider, useToast } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import FullScreenSpinner from '@/components/FullScreenSpinner';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import SheetPage from '@/pages/SheetPage';
import DashboardPage from '@/pages/DashboardPage';
import SystemDesignPage from '@/pages/SystemDesignPage';
import AdminPage from '@/pages/AdminPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const TOAST_ICONS = { success: CheckCircle, error: AlertCircle, info: Info };
const TOAST_COLORS = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

function AuthenticatedShell() {
  const { user, isBootstrapping } = useAuth();
  if (isBootstrapping) return <FullScreenSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <ProgressProvider>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <Outlet />
      </main>
    </ProgressProvider>
  );
}

function RequireAdmin() {
  const { user } = useAuth();
  if (user?.role !== 'admin') return <Navigate to="/sheet" replace />;
  return <Outlet />;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <Outlet />
      </main>
    </>
  );
}

function AuthLayout() {
  const { user, isBootstrapping } = useAuth();
  if (isBootstrapping) return <FullScreenSpinner />;
  if (user) return <Navigate to="/sheet" replace />;
  return <Outlet />;
}

function ToastOverlay() {
  const { toasts, removeToast } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map(toast => {
        const Icon = TOAST_ICONS[toast.type];
        return (
          <div key={toast.id} className={`flex items-center gap-2 rounded-xl border px-4 py-3 shadow-lg animate-toast-in ${TOAST_COLORS[toast.type]}`}>
            <Icon size={18} className="shrink-0" />
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="shrink-0 p-0.5 rounded hover:bg-black/5">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function LandingRedirect() {
  const { user, isBootstrapping } = useAuth();
  if (isBootstrapping) {
    return <FullScreenSpinner />;
  }
  return <Navigate to={user ? '/sheet' : '/login'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
        <ToastOverlay />
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<LandingRedirect />} />

          {/* Auth pages (redirect to /sheet if logged in) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Protected pages */}
          <Route element={<AuthenticatedShell />}>
            <Route path="/sheet" element={<SheetPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Admin pages */}
            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>

          {/* Public pages with layout */}
          <Route element={<PublicLayout />}>
            <Route path="/system-design" element={<SystemDesignPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
