import { useMemo } from 'react';
import { topics, getProblemCounts } from '@/data/dsaData';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { Trophy, Target, Zap, Flame } from 'lucide-react';
import { getInitials } from '@/utils/getInitials';

export default function DashboardPage() {
  const { user } = useAuth();
  const { progress, totalCompleted, progressPercent, topicStats: topicStatsMap } = useProgress();
  const counts = getProblemCounts();
  const solved = totalCompleted();
  const pct = progressPercent();

  const byDifficulty = useMemo(() => {
    const all = topics.flatMap(t => t.problems);
    const completed = all.filter(p => progress[p.id]?.isCompleted);
    return {
      Easy: { completed: completed.filter(p => p.difficulty === 'Easy').length, total: all.filter(p => p.difficulty === 'Easy').length },
      Medium: { completed: completed.filter(p => p.difficulty === 'Medium').length, total: all.filter(p => p.difficulty === 'Medium').length },
      Hard: { completed: completed.filter(p => p.difficulty === 'Hard').length, total: all.filter(p => p.difficulty === 'Hard').length },
    };
  }, [progress]);

  const topicStats = useMemo(() => {
    return topics.map(t => {
      const stats = topicStatsMap.get(t.id) || { completed: 0, total: 0, pct: 0 };
      return { ...t, ...stats };
    });
  }, [topicStatsMap]);

  const topicsMastered = topicStats.filter(t => t.pct === 100).length;
  const hardSolved = byDifficulty.Hard.completed;

  const recentSolved = useMemo(() => {
    return topics.flatMap(t => t.problems)
      .filter(p => progress[p.id]?.isCompleted && progress[p.id].completedAt)
      .sort((a, b) => new Date(progress[b.id].completedAt!).getTime() - new Date(progress[a.id].completedAt!).getTime())
      .slice(0, 8);
  }, [progress]);

  const initials = getInitials(user?.name ?? '');

  const diffColors = { Easy: 'bg-emerald-500', Medium: 'bg-amber-500', Hard: 'bg-red-500' };
  const diffTextColors = { Easy: 'text-emerald-600', Medium: 'text-amber-600', Hard: 'text-red-600' };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white text-xl font-bold shadow-lg shadow-primary-200">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-sm text-slate-500">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'today'} · {user?.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Target size={14} className="text-primary-500" />
            <span className="text-xs text-slate-500">Problems Solved</span>
          </div>
          <div className="text-2xl font-bold text-primary-600">{solved}</div>
          <div className="text-xs text-slate-400">/ {counts.total} total</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Zap size={14} className="text-emerald-500" />
            <span className="text-xs text-slate-500">Overall Progress</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600">{pct}%</div>
          <div className="text-xs text-slate-400">completion</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Trophy size={14} className="text-violet-500" />
            <span className="text-xs text-slate-500">Topics Mastered</span>
          </div>
          <div className="text-2xl font-bold text-violet-600">{topicsMastered}</div>
          <div className="text-xs text-slate-400">/ {topics.length} topics</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Flame size={14} className="text-red-500" />
            <span className="text-xs text-slate-500">Hard Problems</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{hardSolved}</div>
          <div className="text-xs text-slate-400">/ {counts.hard} hard</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Difficulty Breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Difficulty Breakdown</h3>
          {(Object.entries(byDifficulty) as [keyof typeof byDifficulty, { completed: number; total: number }][]).map(([diff, data]) => (
            <div key={diff} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className={diffTextColors[diff]}>{diff}</span>
                <span className="text-slate-600 font-medium">{data.completed}/{data.total}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${diffColors[diff]}`}
                  style={{ width: `${data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Topic Progress */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Topic Progress</h3>
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {topicStats.map(t => (
              <div key={t.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700">{t.icon} {t.title}</span>
                  <span className="text-slate-500 font-medium">{t.completed}/{t.total}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${t.pct === 100 ? 'bg-emerald-500' : 'bg-primary-500'}`}
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Completed */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Recently Completed</h3>
        {recentSolved.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Target size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No problems solved yet. Start solving from the DSA Sheet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recentSolved.map(p => {
              const topic = topics.find(t => t.problems.some(tp => tp.id === p.id));
              const diffBadge = { Easy: 'bg-emerald-100 text-emerald-800', Medium: 'bg-amber-100 text-amber-800', Hard: 'bg-red-100 text-red-800' };
              return (
                <div key={p.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50 transition-colors">
                  <span className="text-emerald-500 text-lg">✅</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700 truncate">{p.title}</div>
                    <div className="text-xs text-slate-400">{topic?.icon} {topic?.title}</div>
                  </div>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${diffBadge[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
