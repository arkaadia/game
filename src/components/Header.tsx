import React, { useState } from 'react';
import { Download, Check, Sparkles, Layers, ShieldCheck, Terminal, Globe, ChevronRight } from 'lucide-react';
import { exportUnityScaffoldZip } from '../utils/exportZip';

interface HeaderProps {
  lang: 'en' | 'fa';
  setLang: (lang: 'en' | 'fa') => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const blob = await exportUnityScaffoldZip();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aethelgard_Unity_Phase0_Scaffold.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  const isFa = lang === 'fa';

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/40">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium tracking-widest uppercase text-cyan-400">
                  {isFa ? 'معماری موتور بازی ۲ بعدی' : '2D Metroidvania Engine Core'}
                </span>
                <span className="text-slate-600 text-xs">/</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  <ShieldCheck className="w-3 h-3" />
                  Phase 0: Foundation
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                AETHELGARD
                <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                  {isFa ? '— پروژه اصلی توسعه یونیتی' : '— Master Unity C# Architecture'}
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Info & Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Engine Badges */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Unity 2022.3 LTS / 6000+</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">C# 9.0+</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">URP 2D</span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(isFa ? 'en' : 'fa')}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title={isFa ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isFa ? 'English' : 'فارسی'}</span>
            </button>

            {/* Export Unity Project Scaffold */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all shadow-sm ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-cyan-900/30'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isFa ? 'فایل‌های یونیتی آماده شد!' : 'Unity Scaffold Ready!'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {downloading
                      ? (isFa ? 'در حال پکیجینگ...' : 'Bundling Zip...')
                      : (isFa ? 'دانلود سورس Phase 0 (.zip)' : 'Download Phase 0 Unity Assets (.zip)')}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
