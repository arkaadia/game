import React, { useState } from 'react';
import { 
  Radio, 
  Send, 
  Bell, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Volume2, 
  Camera, 
  Heart,
  Save,
  MapPin,
  Sparkles
} from 'lucide-react';

interface EventChannelMock {
  id: string;
  name: string;
  type: 'Void' | 'Generic<T>';
  payloadSample?: string;
  descriptionEn: string;
  descriptionFa: string;
  listeners: { name: string; icon: React.ReactNode; reaction: string }[];
}

const CHANNELS: EventChannelMock[] = [
  {
    id: 'player-damaged',
    name: 'PlayerDamagedEventChannelSO',
    type: 'Generic<T>',
    payloadSample: 'Damage: 25, Type: Physical, Force: (4.0, 6.0)',
    descriptionEn: 'Broadcast when player takes damage; triggers camera shake, audio hit grunt, HUD heart flash.',
    descriptionFa: 'مخابره آسیب به پلیر؛ فعال‌سازی لرزش دوربین، افکت صوتی و چشمک زدن گوی سلامتی در HUD.',
    listeners: [
      { name: 'HUDController', icon: <Heart className="w-3.5 h-3.5 text-rose-400" />, reaction: 'Flash health orb & reduce HP bar' },
      { name: 'CameraShakeManager', icon: <Camera className="w-3.5 h-3.5 text-cyan-400" />, reaction: 'Add 0.35 trauma shake pulse' },
      { name: 'AudioDirector', icon: <Volume2 className="w-3.5 h-3.5 text-amber-400" />, reaction: 'Play SFX_Player_Impact_Flesh' }
    ]
  },
  {
    id: 'player-died',
    name: 'PlayerDiedEventChannelSO',
    type: 'Void',
    descriptionEn: 'Broadcast when player HP reaches 0; triggers game over curtain and respawn pipeline.',
    descriptionFa: 'مخابره مرگ بازیکن؛ فعال‌سازی پرده سیاه گیم‌اوور و آماده‌سازی بازیابی از آخرین چک‌پوینت.',
    listeners: [
      { name: 'HUDController', icon: <Heart className="w-3.5 h-3.5 text-rose-400" />, reaction: 'Fade HUD into death vignette' },
      { name: 'SceneLoader', icon: <Layers className="w-3.5 h-3.5 text-indigo-400" />, reaction: 'Initiate async respawn reload' },
      { name: 'AudioDirector', icon: <Volume2 className="w-3.5 h-3.5 text-amber-400" />, reaction: 'Crossfade to mournful ambient theme' }
    ]
  },
  {
    id: 'ability-unlocked',
    name: 'AbilityUnlockedEventChannelSO',
    type: 'Generic<T>',
    payloadSample: 'AbilityID: "SpectralDash", Tier: 1',
    descriptionEn: 'Broadcast when player inspects an ancient shrine and gains a new locomotion tool.',
    descriptionFa: 'مخابره باز شدن قابلیت جدید هنگام لمس محراب کهن؛ نمایش انیمیشن کسب توانایی و آپدیت دیتا.',
    listeners: [
      { name: 'PlayerAbilityCoordinator', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" />, reaction: 'Register DashState in runtime FSM' },
      { name: 'SaveSystem', icon: <Save className="w-3.5 h-3.5 text-cyan-400" />, reaction: 'Append SpectralDash to save buffer' },
      { name: 'UIAbilityPopup', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />, reaction: 'Trigger celebratory modal fanfare' }
    ]
  },
  {
    id: 'checkpoint-activated',
    name: 'CheckpointActivatedEventChannelSO',
    type: 'Generic<T>',
    payloadSample: 'MonumentID: "Arboretum_Shrine_02", Position: (45.2, 12.0)',
    descriptionEn: 'Broadcast when player rests at a sanctuary shrine; heals to full and triggers atomic save.',
    descriptionFa: 'مخابره استراحت در معبد؛ پر کردن نوار جان و ثبت اتمیک اطلاعات بازی روی دیسک.',
    listeners: [
      { name: 'SaveSystem', icon: <Save className="w-3.5 h-3.5 text-cyan-400" />, reaction: 'Execute atomic disk write (save_slot_1.sav)' },
      { name: 'HealthComponent', icon: <Heart className="w-3.5 h-3.5 text-rose-400" />, reaction: 'Heal player to MaxHealth (100)' },
      { name: 'WorldMapController', icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" />, reaction: 'Mark active respawn monument icon' }
    ]
  }
];

export const EventBusSimulator: React.FC<{ lang: 'en' | 'fa' }> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [activeChannelId, setActiveChannelId] = useState<string>('player-damaged');
  const [eventHistory, setEventHistory] = useState<{ id: string; time: string; channel: string; reactions: string[] }[]>([]);

  const selectedChannel = CHANNELS.find(c => c.id === activeChannelId) || CHANNELS[0];

  const handleRaiseEvent = (channel: EventChannelMock) => {
    const newEntry = {
      id: Math.random().toString(),
      time: new Date().toLocaleTimeString(),
      channel: channel.name,
      reactions: channel.listeners.map(l => `${l.name} -> ${l.reaction}`)
    };
    setEventHistory(prev => [newEntry, ...prev.slice(0, 14)]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              Core/Events/
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-300">Decoupled Communication Pattern</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            {isFa ? 'شبیه‌ساز کانال‌های رویداد ScriptableObject' : 'ScriptableObject Event Channel Inspector'}
          </h2>
          <p className="text-sm text-slate-400">
            {isFa
              ? 'تضمین عدم وجود وابستگی مستقیم بین سیستم‌ها. ارسال‌کننده رویداد را روی کانال Asset پرتاب می‌کند و چندین ماژول مستقل به آن پاسخ می‌دهند.'
              : 'Verifies the zero-coupling architecture where systems communicate strictly via ScriptableObject channel assets without knowing about each other.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Memory Leaks · OnDisable Safe</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Channels Selector & Broadcaster (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              {isFa ? 'انتخاب کانال رویداد جهت شبیه‌سازی' : 'Select ScriptableObject Event Asset'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHANNELS.map((ch) => {
                const isSelected = activeChannelId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannelId(ch.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-950/30'
                        : 'bg-slate-950/70 border-slate-800/90 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {ch.type}
                      </span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                    </div>
                    <div className="text-xs font-bold font-mono mt-2 truncate">
                      {ch.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {isFa ? ch.descriptionFa : ch.descriptionEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Broadcast Action Box */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold">
                    channel.RaiseEvent({selectedChannel.payloadSample ? 'payload' : ''})
                  </div>
                  {selectedChannel.payloadSample && (
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Payload: {selectedChannel.payloadSample}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleRaiseEvent(selectedChannel)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white text-xs font-semibold shadow-md shadow-cyan-950/40 transition-all self-start sm:self-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isFa ? 'شلیک رویداد (Raise Event)' : 'Broadcast RaiseEvent()'}</span>
                </button>
              </div>

              {/* Active Listeners Visualization */}
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  {isFa ? 'سیستم‌های عضو این کانال (Decoupled Subscribers):' : 'Independent Systems Subscribed to this SO Channel:'}
                </span>
                <div className="space-y-2">
                  {selectedChannel.listeners.map((listener, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-slate-800">{listener.icon}</span>
                        <span className="font-mono font-semibold text-slate-200">{listener.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{listener.reaction}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right: Broadcast Timeline Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isFa ? 'گزارش مخابره زنده پیام‌ها' : 'Broadcast Reaction Log'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {eventHistory.length} broadcasts
              </span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {eventHistory.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  {isFa
                    ? 'برای شبیه‌سازی انتشار رویداد روی دکمه "Broadcast RaiseEvent" کلیک کنید.'
                    : 'Click "Broadcast RaiseEvent()" to see decoupled systems react synchronously.'}
                </div>
              ) : (
                eventHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{item.time}</span>
                      <span className="text-cyan-400 font-semibold">{item.channel}</span>
                    </div>
                    <div className="space-y-1 pt-1 border-t border-slate-900">
                      {item.reactions.map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
