import { useState, useMemo } from 'react';
import { topics } from '@/data/dsaData';
import { useToast } from '@/context/ToastContext';
import { Shield, Plus, Trash2, Users, BookOpen, BarChart3 } from 'lucide-react';

const diffColor = { Easy: 'bg-emerald-100 text-emerald-800', Medium: 'bg-amber-100 text-amber-800', Hard: 'bg-red-100 text-red-800' } as const;

export default function AdminPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'topics' | 'problems'>('overview');

  const totalProblems = topics.reduce((sum, t) => sum + t.problems.length, 0);

  const flatProblems = useMemo(() => {
    return topics.flatMap(t => t.problems.map(p => ({ ...p, topicTitle: t.title, topicIcon: t.icon })));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <Shield size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-sm text-slate-500">Manage topics, problems, and users</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-slate-200 p-1 mb-6 w-fit">
        {(['overview', 'topics', 'problems'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              activeTab === tab ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <BookOpen size={28} className="mx-auto text-primary-500 mb-2" />
            <div className="text-3xl font-bold text-primary-600">{topics.length}</div>
            <div className="text-sm text-slate-500">Topics</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <BarChart3 size={28} className="mx-auto text-emerald-500 mb-2" />
            <div className="text-3xl font-bold text-emerald-600">{totalProblems}</div>
            <div className="text-sm text-slate-500">Problems</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <Users size={28} className="mx-auto text-violet-500 mb-2" />
            <div className="text-3xl font-bold text-violet-600">0</div>
            <div className="text-sm text-slate-500">Registered Users</div>
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Topics</h3>
            <button
              onClick={() => addToast('info', 'Create topic form would appear here (API required)')}
              className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-700 transition-colors"
            >
              <Plus size={14} /> Add Topic
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {topics.map(topic => (
              <div key={topic.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                <span className="text-xl">{topic.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">{topic.title}</div>
                  <div className="text-xs text-slate-400">{topic.slug} · {topic.problems.length} problems</div>
                </div>
                <span className="text-xs text-slate-400">Order: {topic.order}</span>
                <button
                  onClick={() => addToast('info', 'Edit/delete requires API connection')}
                  className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'problems' && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">All Problems ({totalProblems})</h3>
            <button
              onClick={() => addToast('info', 'Create problem form would appear here (API required)')}
              className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-700 transition-colors"
            >
              <Plus size={14} /> Add Problem
            </button>
          </div>
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {flatProblems.map(p => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 text-sm">
                <span className="text-xs text-slate-400 w-6">{p.order}</span>
                <span className="font-medium text-slate-700 flex-1 truncate">{p.title}</span>
                <span className="text-xs text-slate-400 hidden sm:block">{p.topicIcon} {p.topicTitle}</span>
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${diffColor[p.difficulty as keyof typeof diffColor]}`}>{p.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <strong className="block mb-1">⚠️ Demo-Only Admin Status:</strong>
          <p>Admin role is a demo-only construct for testing UI functionality. <strong>No server-side authorization is enforced.</strong> In production, admin status must be managed securely by a backend service with proper authentication and authorization checks.</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Note:</strong> Admin CRUD operations require a connected backend API. In this demo, data is loaded from the static catalog. Full admin functionality is available when deployed with the Lambda + MongoDB backend.
        </div>
      </div>
    </div>
  );
}
