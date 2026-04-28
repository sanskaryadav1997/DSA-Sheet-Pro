export default function FullScreenSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <span className="text-sm text-slate-500">Loading...</span>
      </div>
    </div>
  );
}
