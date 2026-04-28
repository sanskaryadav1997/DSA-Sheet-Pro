import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, BookOpen, Server, Shield } from 'lucide-react';
import { getInitials } from '@/utils/getInitials';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-primary-50 text-primary-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to={user ? '/sheet' : '/'} className="flex items-center gap-2 font-bold text-primary-600 text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white text-sm font-black">
            D
          </span>
          <span className="hidden sm:inline">DSA Sheet Pro</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <Link to="/sheet" className={linkClass('/sheet')}>
                <span className="flex items-center gap-1.5"><BookOpen size={15} /> Sheet</span>
              </Link>
              <Link to="/dashboard" className={linkClass('/dashboard')}>
                <span className="flex items-center gap-1.5"><LayoutDashboard size={15} /> Dashboard</span>
              </Link>
              <Link to="/system-design" className={linkClass('/system-design')}>
                <span className="flex items-center gap-1.5"><Server size={15} /> System Design</span>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={linkClass('/admin')}>
                  <span className="flex items-center gap-1.5"><Shield size={15} /> Admin</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/system-design" className={linkClass('/system-design')}>System Design</Link>
            </>
          )}
        </div>

        {/* User area */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm font-medium text-slate-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-1 pt-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
                <Link to="/sheet" className={linkClass('/sheet')} onClick={() => setMobileOpen(false)}>
                  <BookOpen size={15} className="inline mr-2" /> DSA Sheet
                </Link>
                <Link to="/dashboard" className={linkClass('/dashboard')} onClick={() => setMobileOpen(false)}>
                  <LayoutDashboard size={15} className="inline mr-2" /> Dashboard
                </Link>
                <Link to="/system-design" className={linkClass('/system-design')} onClick={() => setMobileOpen(false)}>
                  <Server size={15} className="inline mr-2" /> System Design
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className={linkClass('/admin')} onClick={() => setMobileOpen(false)}>
                    <Shield size={15} className="inline mr-2" /> Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="mt-2 flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkClass('/login')} onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/signup" className={linkClass('/signup')} onClick={() => setMobileOpen(false)}>Sign Up</Link>
                <Link to="/system-design" className={linkClass('/system-design')} onClick={() => setMobileOpen(false)}>System Design</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
