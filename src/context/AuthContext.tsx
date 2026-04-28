import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '@/types';

const AUTH_KEY = 'dsa_auth_user';
const USERS_KEY = 'dsa_users_db';
const RESET_TOKENS_KEY = 'dsa_reset_tokens';
const RESET_TOKEN_EXPIRY_MS = 3600000; // 1 hour

/**
 * ⚠️ DEMO-ONLY CLIENT-SIDE AUTH
 * 
 * This authentication system is for demo purposes only and must NOT be used in production.
 * Client-side password hashing provides no real security. Always use a proper backend
 * authentication service with:
 * - Server-side password hashing and salting (bcrypt, Argon2, etc.)
 * - HTTPS-only transmission
 * - Secure session management
 * - Rate limiting and brute-force protection
 * - Proper authorization checks on every API call
 */

interface StoredUser extends User {
  passwordHash: string;
  salt: string; // Base64-encoded random salt
}

function isValidISODate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return date.toISOString() === dateString;
  } catch {
    return false;
  }
}

function isValidStoredUser(obj: unknown): obj is StoredUser {
  if (typeof obj !== 'object' || obj === null) return false;
  const u = obj as Record<string, unknown>;
  
  // Check required string fields
  if (typeof u.id !== 'string' || !u.id) return false;
  if (typeof u.name !== 'string' || !u.name) return false;
  if (typeof u.email !== 'string' || !u.email) return false;
  if (typeof u.passwordHash !== 'string') return false;
  if (typeof u.salt !== 'string') return false;
  
  // Check role enum
  if (u.role !== 'student' && u.role !== 'admin') return false;
  
  // Check ISO createdAt
  if (typeof u.createdAt !== 'string' || !isValidISODate(u.createdAt)) return false;
  
  // Optional avatarUrl
  if (u.avatarUrl !== undefined && typeof u.avatarUrl !== 'string') return false;
  
  return true;
}

function getUsers(): StoredUser[] {
  try {
    const raw = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    
    // Filter out malformed entries
    return raw.filter(isValidStoredUser);
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Hash a password with a salt using SHA-256.
 * Returns hex-encoded hash.
 */
async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const saltedPassword = salt + password;
  const data = encoder.encode(saltedPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Generate a random salt for password hashing.
 * Returns hex-encoded salt.
 */
function generateSalt(): string {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Get stored reset tokens from localStorage.
 */
function getResetTokens(): { [token: string]: { email: string; expiresAt: number } } {
  try {
    return JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '{}');
  } catch {
    return {};
  }
}

/**
 * Save reset tokens to localStorage.
 */
function saveResetTokens(tokens: { [token: string]: { email: string; expiresAt: number } }) {
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens));
}

/**
 * Generate a random reset token (hex string).
 */
function generateResetToken(): string {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate user shape before setting (discard malformed entries)
        if (
          typeof parsed === 'object' && parsed !== null &&
          typeof parsed.id === 'string' && parsed.id &&
          typeof parsed.name === 'string' && parsed.name &&
          typeof parsed.email === 'string' && parsed.email &&
          (parsed.role === 'student' || parsed.role === 'admin') &&
          typeof parsed.createdAt === 'string' && isValidISODate(parsed.createdAt) &&
          (parsed.avatarUrl === undefined || typeof parsed.avatarUrl === 'string')
        ) {
          const user: User = parsed;
          setUser(user);
        }
      }
    } catch {
      // ignore malformed entries
    }
    setIsBootstrapping(false);
  }, []);

  const login = useCallback(async (email: string, password: string, remember: boolean = true) => {
    await new Promise(r => setTimeout(r, 500));
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      throw new Error('Email cannot be empty');
    }
    const users = getUsers();
    const found = users.find(u => u.email === normalizedEmail);
    if (!found) {
      throw new Error('Invalid email or password');
    }
    
    const computedHash = await hashPassword(password, found.salt);
    if (found.passwordHash !== computedHash) {
      throw new Error('Invalid email or password');
    }
    
    const { passwordHash: _ph, salt: _salt, ...safeUser } = found;
    void _ph;
    void _salt;
    setUser(safeUser);
    const store: Storage = remember ? localStorage : sessionStorage;
    store.setItem(AUTH_KEY, JSON.stringify(safeUser));
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 500));
    const users = getUsers();
    const lowerEmail = email.trim().toLowerCase();
    if (!lowerEmail) {
      throw new Error('Email cannot be empty');
    }
    if (users.find(u => u.email === lowerEmail)) {
      throw new Error('Email already in use');
    }
    
    // Determine role: default to 'student', check admin allowlist if env var is set
    let role: 'student' | 'admin' = 'student';
    const adminAllowlist = import.meta.env.VITE_ADMIN_EMAILS || '';
    if (adminAllowlist && adminAllowlist.split(',').map(e => e.trim().toLowerCase()).includes(lowerEmail)) {
      role = 'admin';
    }
    
    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);
    
    const newUser: StoredUser = {
      id: 'u_' + Date.now().toString(36),
      name: name.trim(),
      email: lowerEmail,
      passwordHash,
      salt,
      role,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    const { passwordHash: _ph, salt: _salt, ...safeUser } = newUser;
    void _ph;
    void _salt;
    setUser(safeUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser));
  }, []);

  const loginWithGoogle = useCallback(async (remember: boolean = true) => {
    await new Promise(r => setTimeout(r, 500));
    
    // In a real app, this email would come from Google's response.
    // Additionally, the 'id' should be a hash of the Google subject claim, not Date.now().
    // For demo, use a stable, well-known Google email to maintain progress continuity.
    const googleEmailDomain = 'google.user@demo.local';
    const users = getUsers();
    
    // Check if this "Google user" email already exists
    let googleUser: User;
    const existing = users.find(u => u.email === googleEmailDomain);
    
    if (existing) {
      // Reuse existing user
      const { passwordHash: _ph, salt: _salt, ...safeUser } = existing;
      void _ph;
      void _salt;
      googleUser = safeUser;
    } else {
      // Create new Google user
      const newUser: StoredUser = {
        id: 'u_google_' + Date.now().toString(36),
        name: 'Google User',
        email: googleEmailDomain,
        passwordHash: '', // Google users don't have passwords
        salt: '',
        role: 'student',
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveUsers(users);
      const { passwordHash: _ph, salt: _salt, ...safeUser } = newUser;
      void _ph;
      void _salt;
      googleUser = safeUser;
    }
    
    setUser(googleUser);
    const store: Storage = remember ? localStorage : sessionStorage;
    store.setItem(AUTH_KEY, JSON.stringify(googleUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await new Promise(r => setTimeout(r, 800));
    
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      // Always return success (no email enumeration)
      return;
    }
    
    // Look up user by email (no error thrown for non-existent emails to prevent enumeration)
    const users = getUsers();
    const found = users.find(u => u.email === normalizedEmail);
    
    if (found) {
      // Generate a reset token with expiry
      const token = generateResetToken();
      const tokens = getResetTokens();
      tokens[token] = {
        email: found.email,
        expiresAt: Date.now() + RESET_TOKEN_EXPIRY_MS,
      };
      saveResetTokens(tokens);
      
      // In production: send email with reset link containing token
      // For now: token is just stored, demo can retrieve it from browser devtools
      if (import.meta.env.DEV) {
        console.log(`[DEMO] Reset Token: ${token}`);
        console.log(`[DEMO] Reset Link: /reset-password?token=${token}`);
      }
    }
    // Always return success (no email enumeration)
  }, []);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    await new Promise(r => setTimeout(r, 500));
    
    // Look up the reset token
    const tokens = getResetTokens();
    const tokenData = tokens[token];
    
    if (!tokenData) {
      throw new Error('Invalid reset token');
    }
    
    // Check if token is expired
    if (Date.now() > tokenData.expiresAt) {
      // Remove expired token
      delete tokens[token];
      saveResetTokens(tokens);
      throw new Error('Reset link has expired');
    }
    
    // Find user by email from token
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === tokenData.email);
    
    if (userIndex === -1) {
      throw new Error('Account no longer exists');
    }
    
    // Generate new salt and hash the password
    const newSalt = generateSalt();
    const newHash = await hashPassword(newPassword, newSalt);
    
    // Update user's password
    users[userIndex].passwordHash = newHash;
    users[userIndex].salt = newSalt;
    saveUsers(users);
    
    // Remove the used token
    delete tokens[token];
    saveResetTokens(tokens);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isBootstrapping, login, signup, loginWithGoogle, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
