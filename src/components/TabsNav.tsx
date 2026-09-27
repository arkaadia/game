import React from 'react';
import { 
  FileText, 
  GitBranch, 
  Radio, 
  Layers, 
  Map, 
  Code2, 
  Milestone 
} from 'lucide-react';

export type TabKey = 'blueprint' | 'fsm' | 'event-channels' | 'scene-stream' | 'world-gates' | 'scripts' | 'roadmap';

interface TabsNavProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  lang: 'en' | 'fa';
}

export const TabsNav: React.FC<TabsNavProps> = ({ activeTab, setActiveTab, lang }) => {
  const isFa = lang === 'fa';

  const tabs: { key: TabKey; labelEn: string; labelFa: string; icon: React.ReactNode; badge?: string }[] = [
    {
      key: 'blueprint',
      labelEn: 'Architectural Blueprint (A–N)',
      labelFa: 'طرح جامع معماری (A تا N)',
      icon: <FileText className="w-4 h-4" />,
      badge: 'Core Report'
    },
    {
      key: 'fsm',
      labelEn: 'FSM Simulator',
      labelFa: 'شبیه‌ساز ماشین وضعیت',
      icon: <GitBranch className="w-4 h-4" />
    },
    {
      key: 'event-channels',
      labelEn: 'SO Event Channels',
      labelFa: 'کانال‌های رویداد SO',
      icon: <Radio className="w-4 h-4" />
    },
    {
      key: 'scene-stream',
      labelEn: 'Scene Streaming',
      labelFa: 'استریم ادتیو صحنه‌ها',
      icon: <Layers className="w-4 h-4" />
    },
    {
      key: 'world-gates',
      labelEn: 'World & Ability Gates',
      labelFa: 'بایوم‌ها و گیت‌های توانایی',
      icon: <Map className="w-4 h-4" />
    },
    {
      key: 'scripts',
      labelEn: 'C# Foundation Scripts',
      labelFa: 'اسکریپت‌های پایه C#',
      icon: <Code2 className="w-4 h-4" />,
      badge: '8 Files'
    },
    {
      key: 'roadmap',
      labelEn: 'Roadmap & DoD (P0–P22)',
      labelFa: 'نقشه راه و معیارها (۰ تا ۲۲)',
      icon: <Milestone className="w-4 h-4" />
    }
  ];

  return (
    <div className="border-b border-slate-800 bg-slate-900/60 sticky top-[61px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-950/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <span>{isFa ? tab.labelFa : tab.labelEn}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive 
                      ? 'bg-cyan-500/25 text-cyan-200' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
