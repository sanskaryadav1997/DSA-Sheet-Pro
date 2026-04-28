import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { topics } from '@/data/dsaData';
import type { ProgressMap, ProgressState } from '@/types';
import { useAuth } from './AuthContext';

function getStorageKey(userId: string) {
  return `dsa_progress_${userId}`;
}

function isValidProgressMap(obj: unknown): obj is ProgressMap {
  if (typeof obj !== 'object' || obj === null) return false;
  const map = obj as Record<string, unknown>;
  
  for (const key in map) {
    const entry = map[key];
    if (typeof entry !== 'object' || entry === null) return false;
    const e = entry as Record<string, unknown>;
    if (typeof e.isCompleted !== 'boolean') return false;
    if (e.completedAt !== null && (typeof e.completedAt !== 'string' || !e.completedAt)) return false;
  }
  return true;
}

const ProgressContext = createContext<ProgressState | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressMap>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProgress({});
      setIsLoading(false);
      return;
    }
    try {
      const stored = localStorage.getItem(getStorageKey(user.id));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (isValidProgressMap(parsed)) {
          setProgress(parsed);
        } else {
          setProgress({});
        }
      } else {
        setProgress({});
      }
    } catch {
      setProgress({});
    }
    setIsLoading(false);
  }, [user?.id]);

  const stats = useMemo(() => {
    let totalComp = 0;
    let totalProbs = 0;
    const map = new Map<string, { completed: number; total: number; pct: number }>();

    topics.forEach(t => {
      const total = t.problems.length;
      totalProbs += total;
      const completed = t.problems.filter(p => progress[p.id]?.isCompleted).length;
      totalComp += completed;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      map.set(t.id, { completed, total, pct });
    });

    const pct = totalProbs > 0 ? Math.round((totalComp / totalProbs) * 100) : 0;
    return { map, totalComp, pct };
  }, [progress]);

  const persist = useCallback((map: ProgressMap, userId: string) => {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(map));
  }, []);

  const toggleProblem = useCallback((problemId: string) => {
    if (!user) return;
    setProgress(prev => {
      const current = prev[problemId];
      const newMap = {
        ...prev,
        [problemId]: {
          isCompleted: !current?.isCompleted,
          completedAt: !current?.isCompleted ? new Date().toISOString() : null,
        },
      };
      persist(newMap, user.id);
      return newMap;
    });
  }, [user, persist]);

  const isCompleted = useCallback((problemId: string) => {
    return progress[problemId]?.isCompleted ?? false;
  }, [progress]);

  const topicProgress = useCallback((topicId: string) => {
    return stats.map.get(topicId) || { completed: 0, total: 0, pct: 0 };
  }, [stats]);

  const progressPercent = useCallback(() => {
    return stats.pct;
  }, [stats]);

  const totalCompleted = useCallback(() => {
    return stats.totalComp;
  }, [stats]);

  const resetProgress = useCallback(() => {
    if (!user) return;
    setProgress({});
    persist({}, user.id);
  }, [user, persist]);

  return (
    <ProgressContext.Provider value={{ progress, isLoading, toggleProblem, isCompleted, topicProgress, progressPercent, totalCompleted, resetProgress, topicStats: stats.map }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressState {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
