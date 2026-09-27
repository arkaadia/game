import React, { useState } from 'react';
import { Header } from './components/Header';
import { TabsNav, TabKey } from './components/TabsNav';
import { BlueprintView } from './components/BlueprintView';
import { StateMachineSimulator } from './components/StateMachineSimulator';
import { EventBusSimulator } from './components/EventBusSimulator';
import { SceneStreamerView } from './components/SceneStreamerView';
import { WorldGatePlanner } from './components/WorldGatePlanner';
import { ScriptRepositoryView } from './components/ScriptRepositoryView';
import { RoadmapView } from './components/RoadmapView';
import { exportUnityScaffoldZip } from './utils/exportZip';
import { Download, Sparkles, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [activeTab, setActiveTab] = useState<TabKey>('blueprint');

  const isFa = lang === 'fa';

  const handleDownload = async () => {
    try {
      const blob = await exportUnityScaffoldZip();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Aethelgard_Unity_Phase0_Scaffold.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${isFa ? 'font-sans' : 'font-sans'}`} dir={isFa ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <Header lang={lang} setLang={setLang} activeTab={activeTab} />

      {/* Navigation Sub-Header */}
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

      {/* Main Tab Content Area */}
      <main className="flex-1">
        {activeTab === 'blueprint' && <BlueprintView lang={lang} />}
        {activeTab === 'fsm' && <StateMachineSimulator lang={lang} />}
        {activeTab === 'event-channels' && <EventBusSimulator lang={lang} />}
        {activeTab === 'scene-stream' && <SceneStreamerView lang={lang} />}
        {activeTab === 'world-gates' && <WorldGatePlanner lang={lang} />}
        {activeTab === 'scripts' && <ScriptRepositoryView lang={lang} />}
        {activeTab === 'roadmap' && <RoadmapView lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-slate-400 font-semibold">Aethelgard Engine Core</span>
            <span>·</span>
            <span>{isFa ? 'فاز ۰: معماری و زیرساخت بدون بازنویسی' : 'Phase 0: Architecture & Foundation Complete'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isFa ? 'دانلود پکیج C# (.zip)' : 'Download Unity Package (.zip)'}</span>
            </button>
            <span>·</span>
            <span className="font-mono text-slate-500">Unity 2022.3 LTS / Unity 6 · C# 9.0+</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
