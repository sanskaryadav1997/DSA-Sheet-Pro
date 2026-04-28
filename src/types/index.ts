export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isBootstrapping: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (remember?: boolean) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export interface ProgressMap {
  [problemId: string]: {
    isCompleted: boolean;
    completedAt: string | null;
  };
}

export interface ProgressState {
  progress: ProgressMap;
  isLoading: boolean;
  toggleProblem: (problemId: string) => void;
  isCompleted: (problemId: string) => boolean;
  topicProgress: (topicId: string) => { completed: number; total: number; pct: number };
  progressPercent: () => number;
  totalCompleted: () => number;
  resetProgress: () => void;
  topicStats: Map<string, { completed: number; total: number; pct: number }>;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
