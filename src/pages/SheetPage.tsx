import { useState, useMemo } from 'react';
import { topics, getProblemCounts, type Problem, type Topic } from '@/data/dsaData';
import { TopicCard, ProblemRow } from '@/components/SheetComponents';
import { useProgress } from '@/context/ProgressContext';
import { Search, Filter, BarChart3, BookOpen, Layers, Target } from 'lucide-react';

type DifficultyFilter = 'All' | 'Easy' | 'Medium' | 'Hard';

function matchesQuery(problem: Problem, topic: Topic, q: string) {
  if (!q) return true;
  return problem.title.toLowerCase().includes(q) || 
         problem.tags.some(t => t.toLowerCase().includes(q)) || 
         topic.title.toLowerCase().includes(q);
}

export default function SheetPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('All');
  const [viewMode, setViewMode] = useState<'topics' | 'flat'>('topics');
  const { progressPercent, totalCompleted, topicStats } = useProgress();
  const counts = getProblemCounts();
  const solved = totalCompleted();
  const pct = progressPercent();

  const problemTopicMap = useMemo(() => {
    const map = new Map<string, Topic>();
    topics.forEach(t => t.problems.forEach(p => map.set(p.id, t)));
    return map;
  }, []);

  const filteredTopics = useMemo(() => {
    const q = search.toLowerCase();
    const hasFilter = q !== '' || difficulty !== 'All';
    return topics.map(topic => {
      const filtered = topic.problems.filter(p => {
        if (difficulty !== 'All' && p.difficulty !== difficulty) return false;
        return matchesQuery(p, topic, q);
      });
      return { ...topic, problems: filtered };
    }).filter(t => hasFilter ? t.problems.length > 0 : true);
  }, [search, difficulty]);

  const allFilteredProblems = useMemo(() => {
    const q = search.toLowerCase();
    return topics.flatMap(t => t.problems).filter(p => {
      if (difficulty !== 'All' && p.difficulty !== difficulty) return false;
      const topic = problemTopicMap.get(p.id)!;
      return matchesQuery(p, topic, q);
    });
  }, [search, difficulty, problemTopicMap]);

  const difficultyFilters: DifficultyFilter[] = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">DSA Sheet</h1>
          <p className="text-sm text-slate-500 mt-1">{counts.total} problems · {topics.length} topics · Track your progress</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-slate-200 p-0.5">
          <button onClick={() => setViewMode('topics')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'topics' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Layers size={13} className="inline mr-1" />By Topic
          </button>
          <button onClick={() => setViewMode('flat')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'flat' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
            <BookOpen size={13} className="inline mr-1" />All Problems
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} className="text-primary-500" />
            <span className="text-xs text-slate-500">Solved</span>
          </div>
          <div className="text-xl font-bold text-primary-600">{solved} <span className="text-sm font-normal text-slate-400">/ {counts.total}</span></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={14} className="text-emerald-500" />
            <span className="text-xs text-slate-500">Progress</span>
          </div>
          <div className="text-xl font-bold text-emerald-600">{pct}%</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-1">
            <Layers size={14} className="text-violet-500" />
            <span className="text-xs text-slate-500">Topics</span>
          </div>
          <div className="text-xl font-bold text-violet-600">{topics.length}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-1">
            <Filter size={14} className="text-amber-500" />
            <span className="text-xs text-slate-500">Distribution</span>
          </div>
          <div className="text-sm font-bold text-slate-700">
            <span className="text-emerald-600">{counts.easy}E</span> · <span className="text-amber-600">{counts.medium}M</span> · <span className="text-red-600">{counts.hard}H</span>
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
          <span className="text-sm font-bold text-primary-600">{pct}%</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        {topics.map(t => {
          const tp = topicStats.get(t.id) || { completed: 0, total: 0, pct: 0 };
          return tp.total > 0 ? (
            <div key={t.id} className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              <span>{t.icon} {t.title}</span>
              <span className="text-slate-300">|</span>
              <span>{tp.completed}/{tp.total}</span>
              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-400 rounded-full" style={{ width: `${tp.pct}%` }} />
              </div>
            </div>
          ) : null;
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search problems, topics, tags…"
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-slate-200 p-1">
          {difficultyFilters.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                difficulty === d
                  ? d === 'Easy' ? 'bg-emerald-100 text-emerald-700'
                    : d === 'Medium' ? 'bg-amber-100 text-amber-700'
                    : d === 'Hard' ? 'bg-red-100 text-red-700'
                    : 'bg-primary-100 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'topics' ? (
        <div className="space-y-3">
          {filteredTopics.map(topic => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden">
          {allFilteredProblems.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No problems match your filters.</div>
          ) : (
            allFilteredProblems.map(p => (
              <ProblemRow key={p.id} problem={p} topic={problemTopicMap.get(p.id)} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
