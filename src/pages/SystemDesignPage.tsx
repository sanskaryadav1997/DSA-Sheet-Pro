import { useState } from 'react';
import { Server, Database, Shield, Cloud, GitBranch, Activity, ChevronRight } from 'lucide-react';

const sections = [
  {
    id: 'architecture',
    icon: Server,
    title: 'High-Level Architecture',
    color: 'from-primary-500 to-primary-700',
    content: `The system is a serverless 3-tier MERN application:

**Presentation tier** — React SPA hosted on AWS Amplify Hosting (S3 + CloudFront).
**Application tier** — Express.js wrapped with serverless-http, deployed as one AWS Lambda function, fronted by API Gateway HTTP API v2.
**Data tier** — MongoDB Atlas (M10 cluster, 3-node replica set).

Key design decisions:
- **Lambda over EC2/ECS**: Zero ops, pay-per-use, fits assignment budget
- **Single Lambda monolith**: Simple to reason about, mirrors local dev
- **MongoDB over Postgres**: Schemaless fit for evolving DSA content; native JSON to JS
- **JWT over server sessions**: Stateless, horizontally trivial

Rough cost estimate at 50k MAU: ~$70/month total.`,
  },
  {
    id: 'database',
    icon: Database,
    title: 'Database Schema',
    color: 'from-emerald-500 to-emerald-700',
    content: `MongoDB with 6 collections via Mongoose ODM:

**users** — name, email (unique), passwordHash (bcrypt), role (student/admin), googleId, failedLoginCount, lockUntil
**refreshTokens** — userId, tokenHash (SHA-256), expiresAt (TTL index), userAgent, ip
**passwordResetTokens** — userId, tokenHash, expiresAt (1hr), used flag
**topics** — slug (unique), title, description, icon, order
**problems** — topicId, slug, title, difficulty, URLs (youtube/leetcode/article), tags, order
**userProgress** — userId + problemId (unique compound), isCompleted, completedAt, notes, attempts

Key indexes: {userId, problemId} unique compound on userProgress; {slug} unique on topics/problems; TTL indexes on token collections.

Data volume at 50k users: ~400 MB total, well within Atlas M10's 10 GB.`,
  },
  {
    id: 'auth',
    icon: Shield,
    title: 'Authentication & Security',
    color: 'from-red-500 to-red-700',
    content: `Three credential types: email+password, Google OAuth (ID-token flow), password reset (magic link).

**Access Token**: JWT (HS256), 15 min TTL, stored in memory + localStorage
**Refresh Token**: opaque 64-byte hex, 7-day TTL, httpOnly Secure SameSite=None cookie, rotated on every refresh

Security measures:
- bcrypt cost factor 12 for password hashing
- Account lockout after 5 failed attempts (15 min)
- Per-IP rate limiting on auth endpoints
- Helmet.js security headers (CSP, HSTS, no-sniff, frame-deny)
- CORS origin allowlist with credentials support
- Refresh token reuse detection → mass revocation
- Generic error messages to prevent email enumeration`,
  },
  {
    id: 'api',
    icon: GitBranch,
    title: 'REST API Contract',
    color: 'from-violet-500 to-violet-700',
    content: `Base path: /api/v1, HTTPS via API Gateway

**Auth endpoints**: POST /auth/register, /auth/login, /auth/google, /auth/refresh, /auth/logout, /auth/forgot-password, /auth/reset-password, GET /auth/me

**Public content**: GET /topics, /topics/:slug, /problems, /problems/:id (all cacheable 5 min)

**Progress**: GET /progress (full map), POST /progress (toggle), GET /progress/stats (dashboard aggregations), DELETE /progress (reset)

**Admin**: CRUD for topics and problems (POST/PUT/DELETE /admin/topics/*, /admin/problems/*)

All errors use uniform envelope: { error: { code, message, details }, requestId }
Pagination: cursor-based (?limit=<n>&cursor=<id>)`,
  },
  {
    id: 'deployment',
    icon: Cloud,
    title: 'Deployment & Infrastructure',
    color: 'from-amber-500 to-amber-700',
    content: `**Frontend**: AWS Amplify Hosting connected to GitHub, auto-deploys on push to main. Built with Vite, served via CloudFront CDN with SPA routing rewrite.

**Backend**: AWS SAM template → CloudFormation. Single Lambda function (nodejs20.x, arm64, 512MB) fronted by API Gateway HTTP API v2. Esbuild bundles the handler.

**Database**: MongoDB Atlas M10 cluster in us-east-1.

**Email**: AWS SES for password reset emails (sandbox mode for assignment).

**CI/CD**: GitHub Actions for backend SAM deploy; Amplify native for frontend. Smoke test on deploy.

**Secrets**: JWT_SECRET, MONGODB_URI in AWS SSM Parameter Store (SecureString).

**Monitoring**: CloudWatch Logs + Metrics, structured JSON logs, 14-day retention.`,
  },
  {
    id: 'scalability',
    icon: Activity,
    title: 'Scalability & Performance',
    color: 'from-cyan-500 to-cyan-700',
    content: `Target: 10k-50k active users, 200-500 RPS, API p95 < 400ms.

**Compute**: Lambda auto-scales to account limit (default 1000 concurrent). Cold starts mitigated by small bundle, Mongoose connection caching, optional Provisioned Concurrency.

**Database**: Connection pooling at module scope (maxPoolSize ~5). Read-heavy queries with readPreference=secondaryPreferred.

**Caching**: CloudFront caches SPA bundle (1 year for hashed assets). GET /topics and /problems cacheable 5 min via Cache-Control headers.

**Throttling**: API Gateway burst=500, rate=200 rps. Per-route throttles on /auth/* at 10 rps.

**Optimistic UI**: Progress toggles update local state + localStorage immediately, then sync to API. Failed mutations queued for retry.`,
  },
];

export default function SystemDesignPage() {
  const [expanded, setExpanded] = useState<string | null>('architecture');

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">System Design Documentation</h1>
        <p className="text-sm text-slate-500 mt-1">Technical architecture, database schema, API design, and deployment strategy for DSA Sheet Pro.</p>
      </div>

      <div className="space-y-3">
        {sections.map(section => {
          const Icon = section.icon;
          const isExpanded = expanded === section.id;

          return (
            <div key={section.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-shadow hover:shadow-md">
              <button
                onClick={() => setExpanded(isExpanded ? null : section.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} text-white shrink-0`}>
                  <Icon size={18} />
                </div>
                <h2 className="flex-1 font-semibold text-slate-800">{section.title}</h2>
                <ChevronRight size={18} className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 pt-0 animate-fade-in">
                  <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                    {section.content.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <h3 key={i} className="font-semibold text-slate-800 mt-4 mb-1 text-sm">{line.replace(/\*\*/g, '')}</h3>;
                      }
                      if (line.startsWith('- ')) {
                        return <div key={i} className="pl-4 py-0.5 text-sm">• {line.slice(2)}</div>;
                      }
                      if (line.trim() === '') return <div key={i} className="h-2" />;
                      return <p key={i} className="text-sm my-1">{line}</p>;
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Request Flow */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Request Flow</h2>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Page Load', desc: 'Browser → CloudFront → S3 (index.html + SPA bundle)', color: 'bg-primary-100 text-primary-700' },
            { step: '2', title: 'Auth Check', desc: 'SPA reads localStorage for accessToken → GET /api/v1/auth/me', color: 'bg-emerald-100 text-emerald-700' },
            { step: '3', title: 'API Request', desc: 'SPA → API Gateway → Lambda (Express) → MongoDB Atlas', color: 'bg-amber-100 text-amber-700' },
            { step: '4', title: 'Token Refresh', desc: 'On 401 token_expired → POST /auth/refresh (cookie) → new access + rotated refresh', color: 'bg-red-100 text-red-700' },
            { step: '5', title: 'Progress Sync', desc: 'Toggle checkbox → optimistic local + localStorage update → POST /progress → API', color: 'bg-violet-100 text-violet-700' },
          ].map(flow => (
            <div key={flow.step} className="flex items-start gap-3">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0 ${flow.color}`}>
                {flow.step}
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-800">{flow.title}</div>
                <div className="text-xs text-slate-500">{flow.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
