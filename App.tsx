import React, { useEffect, useState } from 'react';

const PAGES = [{"path":"/","title":"Hugging Face – The AI community building the future.","url":"/pages/index.html","isBaseline":false},{"path":"/models","title":"Models – Hugging Face","url":"/pages/models.html","isBaseline":false},{"path":"/datasets","title":"Datasets – Hugging Face","url":"/pages/datasets.html","isBaseline":false},{"path":"/spaces","title":"Spaces - Hugging Face","url":"/pages/spaces.html","isBaseline":false},{"path":"/storage","title":"Storage - Hugging Face","url":"/pages/storage.html","isBaseline":false},{"path":"/docs","title":"Hugging Face - Documentation","url":"/pages/docs.html","isBaseline":false},{"path":"/enterprise","title":"Team & Enterprise Plans - Hugging Face","url":"/pages/enterprise.html","isBaseline":false},{"path":"/pricing","title":"Pricing - Hugging Face","url":"/pages/pricing.html","isBaseline":false},{"path":"/tasks","title":"Tasks - Hugging Face","url":"/pages/tasks.html","isBaseline":false},{"path":"/chat","title":"HuggingChat","url":"/pages/chat.html","isBaseline":false},{"path":"/collections","title":"Collections - Hugging Face","url":"/pages/collections.html","isBaseline":false},{"path":"/languages","title":"Languages - Hugging Face","url":"/pages/languages.html","isBaseline":false}];

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(PAGES[0]?.url || '');
  const [viewMode, setViewMode] = useState<'site' | 'artifacts'>('site');
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (viewMode === 'artifacts' && !summary) {
      fetch('/api/reports').then((r) => r.json()).then(setSummary).catch(() => {});
    }
  }, [viewMode, summary]);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="h-12 px-4 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <span className="font-semibold text-sm truncate">Hugging Face – The AI community building the future.</span>
        <div className="flex items-center gap-2 overflow-x-auto">
          {viewMode === 'site' && PAGES.map((p) => (
            <button
              key={p.url}
              onClick={() => setCurrentUrl(p.url)}
              className={`px-2.5 py-1 text-xs rounded whitespace-nowrap ${currentUrl === p.url ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              {p.path}
            </button>
          ))}
          <button
            onClick={() => setViewMode(viewMode === 'site' ? 'artifacts' : 'site')}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap"
          >
            {viewMode === 'site' ? 'Exported Artifacts' : 'Back to Pages'}
          </button>
        </div>
      </header>
      {viewMode === 'artifacts' ? (
        <main className="flex-1 overflow-auto p-6 max-w-5xl mx-auto w-full space-y-4">
          <h2 className="text-base font-semibold">Included Package Outputs & Reports</h2>
          <pre className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs overflow-auto">
            {summary ? JSON.stringify(summary, null, 2) : 'Loading package report summary...'}
          </pre>
        </main>
      ) : currentUrl ? (
        <iframe src={currentUrl} title="Reconstructed Site" className="flex-1 w-full border-0 bg-white" />
      ) : (
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-2">
            <h1 className="text-lg font-semibold">No Exported Pages Available</h1>
            <p className="text-sm text-slate-400">Run crawl and reconstruction in CloneForge Studio before exporting.</p>
          </div>
        </main>
      )}
    </div>
  );
}
