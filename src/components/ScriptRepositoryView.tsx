import React, { useState } from 'react';
import { UNITY_PHASE0_SCRIPTS, UnityScriptFile } from '../data/unityScripts';
import { 
  Code2, 
  Copy, 
  Check, 
  FileCode, 
  Folder, 
  Sparkles, 
  Download,
  Terminal,
  Layers,
  Filter
} from 'lucide-react';
import { exportUnityScaffoldZip } from '../utils/exportZip';

export const ScriptRepositoryView: React.FC<{ lang: 'en' | 'fa' }> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [selectedScript, setSelectedScript] = useState<UnityScriptFile>(UNITY_PHASE0_SCRIPTS[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloading, setDownloading] = useState<boolean>(false);

  const categories = ['All', 'Interfaces', 'StateMachine', 'Events', 'Save', 'Scene', 'Data', 'Core'];

  const filteredScripts = selectedCategory === 'All'
    ? UNITY_PHASE0_SCRIPTS
    : UNITY_PHASE0_SCRIPTS.filter(s => s.category === selectedCategory);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const blob = await exportUnityScaffoldZip();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aethelgard_Phase0_UnityScripts.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              Assets/_Game/
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-300">Phase 0 Foundation C# Suite</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-6 h-6 text-cyan-400" />
            {isFa ? 'مخزن اسکریپت‌های پایه سی‌شارپ فاز صفر' : 'Phase 0 Production C# Foundation Scripts'}
          </h2>
          <p className="text-sm text-slate-400">
            {isFa
              ? 'کدهای تمیز و آماده وارد کردن به یونیتی: اینترفیس‌ها، هسته FSM، کانال‌های رویداد SO، سیستم سیو اتمیک و اسکریپتبل آبجکت فیزیک حرکت.'
              : 'Production-ready C# scripts built to enterprise standards. Clean namespace isolation, zero singletons, and full XML documentation.'}
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white text-xs font-semibold shadow-md shadow-cyan-950/40 transition-all self-start md:self-center"
        >
          <Download className="w-4 h-4" />
          <span>{isFa ? 'دانلود بسته کامل اسکریپت‌ها (.zip)' : 'Download All .cs Files (.zip)'}</span>
        </button>
      </div>

      {/* Category Filter bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: File List (Left) + Code Viewer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: File Directory (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 sticky top-28">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFa ? 'فایل‌های منبع فاز صفر' : 'Phase 0 Source Files'}
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
              {filteredScripts.length} Files
            </span>
          </div>

          <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1">
            {filteredScripts.map((file) => {
              const isSelected = selectedScript.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedScript(file)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className={`w-4 h-4 flex-shrink-0 ${
                      isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-400'
                    }`} />
                    <span className="truncate font-mono">{file.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-950">
                    {file.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Code Inspector (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* File Path & Copy Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 bg-slate-950 border-b border-slate-800">
              <div className="space-y-0.5">
                <div className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{selectedScript.path}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {isFa ? selectedScript.descriptionFa : selectedScript.descriptionEn}
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 transition-colors self-start sm:self-center"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isFa ? 'کپی شد' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isFa ? 'کپی کد' : 'Copy Code'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 bg-slate-950 overflow-x-auto max-h-[600px] font-mono text-xs text-slate-300 leading-relaxed">
              <pre className="whitespace-pre">
                <code>{selectedScript.code}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
