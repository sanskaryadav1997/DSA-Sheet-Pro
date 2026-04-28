import { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Play, FileText } from 'lucide-react';
import type { Topic, Problem } from '@/data/dsaData';
import { useProgress } from '@/context/ProgressContext';

export function DifficultyBadge({ difficulty }: { difficulty: Problem['difficulty'] }) {
  const colors = {
    Easy: 'bg-emerald-100 text-emerald-800',
    Medium: 'bg-amber-100 text-amber-800',
    Hard: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
}

export function ProblemRow({ problem, topic }: { problem: Problem; topic?: Topic }) {
  const { isCompleted, toggleProblem } = useProgress();
  const checked = isCompleted(problem.id);

  return (
    <div className={`group flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 ${checked ? 'bg-emerald-50/50' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleProblem(problem.id)}
        className="h-4 w-4 rounded border-slate-300 cursor-pointer"
        aria-label={`Mark ${problem.title} as ${checked ? 'incomplete' : 'complete'}`}
      />
      <span className="text-slate-400 text-xs w-6">{String(problem.order).padStart(2, '0')}</span>
      <span className={`flex-1 font-medium ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        {problem.title}
      </span>
      {topic && (
        <span className="text-xs text-slate-400 hidden sm:block mr-2">{topic.title}</span>
      )}
      <DifficultyBadge difficulty={problem.difficulty} />
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {problem.youtubeUrl && (
          <a href={problem.youtubeUrl} target="_blank" rel="noopener noreferrer" className="rounded p-1 text-red-500 hover:bg-red-50" title="YouTube">
            <Play size={14} />
          </a>
        )}
        {problem.leetcodeUrl && (
          <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="rounded p-1 text-orange-500 hover:bg-orange-50" title="LeetCode">
            <ExternalLink size={14} />
          </a>
        )}
        {problem.articleUrl && (
          <a href={problem.articleUrl} target="_blank" rel="noopener noreferrer" className="rounded p-1 text-blue-500 hover:bg-blue-50" title="Article">
            <FileText size={14} />
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-1 max-w-[120px] justify-end">
        {problem.tags.slice(0, 2).map(tag => (
          <span key={tag} className="hidden sm:inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TopicCard({ topic }: { topic: Topic }) {
  const [isOpen, setIsOpen] = useState(false);
  const { topicProgress } = useProgress();
  const { completed, total } = topicProgress(topic.id);
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-xl">
          {topic.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{topic.title}</h3>
          <p className="text-xs text-slate-500 truncate">{topic.description}</p>
        </div>
        <div className="text-right shrink-0 mr-2">
          <div className="text-sm font-bold text-primary-600">{completed}/{total}</div>
          <div className="text-[11px] text-slate-400">{pct}% done</div>
        </div>
        {isOpen ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
      </button>

      {/* Progress bar */}
      <div className="h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Problems list */}
      {isOpen && (
        <div className="border-t border-slate-100 divide-y divide-slate-100 animate-fade-in">
          {topic.problems.map(problem => (
            <ProblemRow key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}
