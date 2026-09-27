import React, { useState } from 'react';
import { PHASE0_SECTIONS, SectionContent } from '../data/phase0Data';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ExternalLink, 
  FolderTree, 
  Layers, 
  ShieldCheck, 
  Boxes,
  Cpu,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface BlueprintViewProps {
  lang: 'en' | 'fa';
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({ lang }) => {
  const [selectedSection, setSelectedSection] = useState<string>('project-analysis');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isFa = lang === 'fa';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeSection = PHASE0_SECTIONS.find(s => s.id === selectedSection) || PHASE0_SECTIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800/40">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'گزارش فاز ۰ — بدون لاجیک شتاب‌زده' : 'Phase 0 Deliverable — Architecture & Foundation Only'}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {isFa ? 'طرح جامع معماری پروژه (بخش‌های A تا N)' : 'Comprehensive Architecture Specification (Sections A through N)'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isFa 
                ? 'طبق قانون اساسی فاز صفر، تمامی پایه‌ها، مرزهای وابستگی، ساختار داده‌ها، رویدادها و استریمینگ صحنه‌ها بدون پیاده‌سازی زودهنگام گیم‌پلی طراحی شده‌اند تا در فازهای بعدی نیازی به بازنویسی (Rewrite) نباشد.'
                : 'As mandated by Phase 0 instructions, all foundational boundaries, data schemas, ScriptableObject event channels, and additive scene architectures are formulated cleanly with zero premature gameplay code or monolithic singletons.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-center font-mono">
            <div>
              <div className="text-lg font-bold text-cyan-400">14</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isFa ? 'بخش اصلی' : 'Sections'}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-400">0</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isFa ? 'کوپلینگ چرخشی' : 'Circular Dep'}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-400">100%</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isFa ? 'داده‌محور' : 'Data-Driven'}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-pink-400">22</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isFa ? 'فاز توسعه' : 'Roadmap Phases'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Navigation Letters + Content Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (A to N) */}
        <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 sticky top-28 backdrop-blur-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFa ? 'فهرست بخش‌های گزارش' : 'Blueprint Sections Index'}
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              A – N
            </span>
          </div>

          <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
            {PHASE0_SECTIONS.map((sec) => {
              const isSelected = selectedSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSection(sec.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                    }`}>
                      {sec.letter}
                    </span>
                    <span className="truncate">
                      {isFa ? sec.titleFa : sec.titleEn}
                    </span>
                  </div>
                  <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${
                    isSelected ? 'text-cyan-400 opacity-100' : 'opacity-0'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Detail Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono text-lg font-bold">
                  {activeSection.letter}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {isFa ? activeSection.titleFa : activeSection.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isFa ? activeSection.summaryFa : activeSection.summaryEn}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(activeSection.detailsEn, activeSection.id)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors self-start sm:self-center"
              >
                {copiedId === activeSection.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isFa ? 'کپی شد' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isFa ? 'کپی مشخصات' : 'Copy Section Text'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Core Architectural Highlights */}
            <div className="my-6">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{isFa ? 'نکات کلیدی معماری' : 'Key Architectural Mandates'}</span>
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {activeSection.keyPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-white font-medium">
                        {isFa ? pt.fa : pt.en}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        {isFa ? pt.en : pt.fa}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Depth Explanation / Code Spec */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isFa ? 'شرح تفصیلی فنی' : 'Technical Specification Details'}</span>
              </h4>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs leading-relaxed text-slate-300 font-mono whitespace-pre-wrap overflow-x-auto max-h-[460px]">
                {isFa ? activeSection.detailsFa + "\n\n--- [English Specification] ---\n" + activeSection.detailsEn : activeSection.detailsEn}
              </div>
            </div>

            {/* Interactive Footer Navigation between sections */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              {(() => {
                const currentIndex = PHASE0_SECTIONS.findIndex(s => s.id === activeSection.id);
                const prev = PHASE0_SECTIONS[currentIndex - 1];
                const next = PHASE0_SECTIONS[currentIndex + 1];

                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => setSelectedSection(prev.id)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                      >
                        <span>←</span>
                        <span>{prev.letter}. {isFa ? prev.titleFa : prev.titleEn}</span>
                      </button>
                    ) : <div />}

                    {next ? (
                      <button
                        onClick={() => setSelectedSection(next.id)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5"
                      >
                        <span>{next.letter}. {isFa ? next.titleFa : next.titleEn}</span>
                        <span>→</span>
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
