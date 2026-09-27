import React, { useState } from 'react';
import { ORIGINAL_BIOMES, ABILITY_GATING_MATRIX, BiomeInfo } from '../data/metroidvaniaWorldData';
import { 
  Map, 
  Lock, 
  Unlock, 
  Key, 
  Compass, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight,
  Flame
} from 'lucide-react';

export const WorldGatePlanner: React.FC<{ lang: 'en' | 'fa' }> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [selectedBiome, setSelectedBiome] = useState<BiomeInfo>(ORIGINAL_BIOMES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              World/ & Abilities/
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-300">100% Original IP & Metroidvania Gating</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Map className="w-6 h-6 text-cyan-400" />
            {isFa ? 'طراحی جهان اصلی بازی و ماتریس قفل‌های توانایی' : 'Original World Biomes & Ability Gating Matrix'}
          </h2>
          <p className="text-sm text-slate-400">
            {isFa
              ? 'دنیای کاملاً اورجینال Aethelgard: ۵ منطقه به هم پیوسته با قفل‌های فیزیکی مشخص که مانع از پیشروی ناخواسته یا خراب شدن توالی داستان (Sequence Breaking) می‌شوند.'
              : 'Zero Ori copies. 100% original world design featuring interconnected biomes and rigorous physical ability gating preventing unintended sequence breaks.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800/40">
          <Sparkles className="w-4 h-4" />
          <span>Non-Linear Interconnected Map</span>
        </div>
      </div>

      {/* Biome Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {ORIGINAL_BIOMES.map((b) => {
          const isSelected = selectedBiome.id === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBiome(b)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span 
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: b.accentColor }} 
                />
                <span className="text-[10px] font-mono text-slate-500">
                  {b.keyRooms} Rooms
                </span>
              </div>
              <div className="font-bold text-sm text-white mt-2">
                {isFa ? b.nameFa : b.nameEn}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {isFa ? b.themeFa : b.themeEn}
              </div>
              <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">Gate:</span>
                <span className="text-cyan-400 truncate max-w-[100px]">{b.abilityGatedBy}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Biome Detailed Breakdown */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span 
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: selectedBiome.accentColor }} 
            />
            <div>
              <h3 className="text-xl font-bold text-white">
                {isFa ? selectedBiome.nameFa : selectedBiome.nameEn}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isFa ? selectedBiome.themeFa : selectedBiome.themeEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">{isFa ? 'پیش‌نیاز ورود:' : 'Entry Gate Requirement:'}</span>
            <span className="text-amber-300 font-bold">{selectedBiome.abilityGatedBy}</span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {isFa ? selectedBiome.descriptionFa : selectedBiome.descriptionEn}
        </p>

        {/* Hazards in this Biome */}
        <div>
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>{isFa ? 'خطرات و تله‌های محیطی این منطقه' : 'Environmental Hazards & Obstacles'}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedBiome.hazards.map((h, i) => (
              <span
                key={i}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-900/50"
              >
                ⚠ {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ability Gating Matrix Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span>{isFa ? 'ماتریس قفل و کلید توانایی‌های مترویدوانیا' : 'Metroidvania Lock & Key Progression Matrix'}</span>
          </h3>
          <span className="text-xs text-slate-500">
            {isFa ? 'طراحی متوالی گیت‌ها بر اساس دسترسی به ابزارهای حرکتی' : 'Sequential gating preventing sequence breaking'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-3">{isFa ? 'توانایی' : 'Ability Name'}</th>
                <th className="py-3 px-3">{isFa ? 'محل آزادسازی' : 'Unlocked In'}</th>
                <th className="py-3 px-3">{isFa ? 'موانع بازشونده' : 'World Gates Unlocked'}</th>
                <th className="py-3 px-3">{isFa ? 'تنظیمات فیزیک' : 'Physics Tuning Specs'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {ABILITY_GATING_MATRIX.map((g, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white font-mono">
                    {isFa ? g.abilityNameFa : g.abilityNameEn}
                  </td>
                  <td className="py-3 px-3 text-cyan-300">
                    {g.biomeUnlockedIn}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {isFa ? g.gatesOpenedFa : g.gatesOpenedEn}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                    {g.mechanicTuning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
