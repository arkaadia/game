import React, { useState } from 'react';
import { ROADMAP_PHASES, RoadmapPhase } from '../data/roadmapData';
import { 
  Milestone, 
  CheckCircle2, 
  Clock, 
  Lock, 
  ChevronRight, 
  ShieldCheck, 
  Layers,
  Flag,
  Filter
} from 'lucide-react';

export const RoadmapView: React.FC<{ lang: 'en' | 'fa' }> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>(ROADMAP_PHASES[0]);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredPhases = statusFilter === 'All' 
    ? ROADMAP_PHASES 
    : ROADMAP_PHASES.filter(p => p.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              Pipeline Management
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-300">Phase-Based Development</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Milestone className="w-6 h-6 text-cyan-400" />
            {isFa ? 'نقشه راه توسعه بازی (فاز ۰ تا فاز ۲۲)' : '23-Phase Production Roadmap (Phase 0 to 22)'}
          </h2>
          <p className="text-sm text-slate-400">
            {isFa
              ? 'توسعه فاز به فاز با قانون عدم بازنویسی (No Rewrite Policy). فاز فعلی: فاز صفر (معماری و پایه‌ها). هر فاز روی خروجی‌های پایدار قبلی ساخته می‌شود.'
              : 'Strict incremental progression without rewrites. Phase 0 provides the stable core contracts for all 22 subsequent development phases.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-800/40">
          <ShieldCheck className="w-4 h-4" />
          <span>Active Phase: 0 / 22 Completed</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
        {['All', 'Current', 'Pending'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              statusFilter === status
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Main Grid: Phase List (Left) + Selected Phase Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Phase List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 sticky top-28">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFa ? 'فهرست فازهای توسعه' : 'Development Phases'}
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
              {filteredPhases.length} Phases
            </span>
          </div>

          <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1">
            {filteredPhases.map((phase) => {
              const isSelected = selectedPhase.phase === phase.phase;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                      phase.status === 'Current'
                        ? 'bg-emerald-500 text-slate-950'
                        : isSelected
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}>
                      {phase.phase}
                    </span>
                    <div className="truncate">
                      <div className="truncate font-medium text-slate-200">
                        {isFa ? phase.nameFa : phase.nameEn}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">
                        {phase.category}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                    phase.status === 'Current'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                      : 'bg-slate-950 text-slate-500'
                  }`}>
                    {phase.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Phase Specification (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    PHASE {selectedPhase.phase}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedPhase.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isFa ? selectedPhase.nameFa : selectedPhase.nameEn}
                </h3>
              </div>

              <div className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold self-start sm:self-center border ${
                selectedPhase.status === 'Current'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}>
                {selectedPhase.status === 'Current' ? '● ACTIVE IN PROGRESS' : 'PENDING ACTIVATION'}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                {isFa ? 'هدف و شرح وظایف این فاز' : 'Phase Objective & Scope'}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isFa ? selectedPhase.descriptionFa : selectedPhase.descriptionEn}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Flag className="w-4 h-4" />
                <span>{isFa ? 'اقلام تحویلی و خروجی‌های این فاز (Deliverables)' : 'Specific Phase Deliverables'}</span>
              </span>
              <div className="space-y-2">
                {selectedPhase.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-mono"
                  >
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                      selectedPhase.status === 'Current' ? 'text-emerald-400' : 'text-slate-600'
                    }`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1">
              <div className="text-slate-400 font-mono">
                {isFa ? 'پیش‌نیازها و وابستگی‌های قبلی:' : 'Phase Prerequisites & Inbound Dependencies:'}
              </div>
              <div className="text-cyan-300 font-mono font-semibold">
                {selectedPhase.dependencies}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
