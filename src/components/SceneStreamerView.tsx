import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  DoorOpen,
  Sparkles
} from 'lucide-react';

interface RoomNode {
  id: string;
  name: string;
  biome: string;
  isLoaded: boolean;
  isCurrent: boolean;
  memoryMb: number;
}

export const SceneStreamerView: React.FC<{ lang: 'en' | 'fa' }> = ({ lang }) => {
  const isFa = lang === 'fa';

  const [rooms, setRooms] = useState<RoomNode[]>([
    { id: 'arb-01', name: 'Arboretum_Entrance_A01', biome: 'Whispering Arboretum', isLoaded: true, isCurrent: true, memoryMb: 42 },
    { id: 'arb-02', name: 'Arboretum_CanopyBridge_A02', biome: 'Whispering Arboretum', isLoaded: true, isCurrent: false, memoryMb: 55 },
    { id: 'arb-03', name: 'Arboretum_AncientGreenhouse_A03', biome: 'Whispering Arboretum', isLoaded: false, isCurrent: false, memoryMb: 60 },
    { id: 'cat-01', name: 'Catacombs_Drainage_B01', biome: 'Sunken Catacombs', isLoaded: false, isCurrent: false, memoryMb: 48 },
    { id: 'cat-02', name: 'Catacombs_FloodedCistern_B02', biome: 'Sunken Catacombs', isLoaded: false, isCurrent: false, memoryMb: 52 },
  ]);

  const [streamingLog, setStreamingLog] = useState<string[]>([
    'Bootstrapper loaded Scene_PersistentManagers additively.',
    'Streamed initial room: Arboretum_Entrance_A01.',
    'Preloaded neighbor room: Arboretum_CanopyBridge_A02 asynchronously.'
  ]);

  const moveToRoom = (targetId: string) => {
    const target = rooms.find(r => r.id === targetId);
    if (!target || target.isCurrent) return;

    setRooms(prev => {
      const targetIndex = prev.findIndex(r => r.id === targetId);
      return prev.map((room, idx) => {
        const isTarget = room.id === targetId;
        const isNeighbor = Math.abs(idx - targetIndex) <= 1;

        return {
          ...room,
          isCurrent: isTarget,
          isLoaded: isNeighbor || isTarget
        };
      });
    });

    setStreamingLog(prev => [
      `[SceneLoader] Player entered gate into ${target.name}.`,
      `[SceneLoader] Unloaded distant scenes out of active bounding radius.`,
      `[SceneLoader] Preloading adjacent neighbor room for zero-stutter traversal.`,
      ...prev.slice(0, 7)
    ]);
  };

  const totalLoadedMemory = rooms
    .filter(r => r.isLoaded)
    .reduce((acc, curr) => acc + curr.memoryMb, 65); // 65mb base for Persistent

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              Systems/SceneManagement/
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-300">Additive Streaming Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            {isFa ? 'استریم ادتیو صحنه‌ها و مدیریت حافظه (Additive Scene Streaming)' : 'Additive Scene Streaming Architecture'}
          </h2>
          <p className="text-sm text-slate-400">
            {isFa
              ? 'هیچ لودینگ اسکرینی وجود ندارد؛ صحنه Persistent همواره در حافظه باقی می‌ماند و اتاق‌ها بر اساس موقعیت بازیکن بارگذاری و تخلیه می‌شوند.'
              : 'Zero loading screens during gameplay. The Persistent scene remains anchored while room scenes stream additively on background threads.'}
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
          <HardDrive className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Active RAM:</span>
          <span className="text-emerald-400 font-bold">{totalLoadedMemory} MB</span>
        </div>
      </div>

      {/* Persistent Scene Anchor */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-slate-950 border border-cyan-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white">Scene_PersistentManagers</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                  NEVER UNLOADS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isFa 
                  ? 'شامل ServiceLocator، دوربین Cinemachine، کانال‌های رویداد SO، سیستم Save و بوم HUD.' 
                  : 'Anchors ServiceLocator, Cinemachine Virtual Camera, Event Channels, Save System, and HUD.'}
              </p>
            </div>
          </div>

          <div className="text-right text-[11px] font-mono text-slate-400">
            Static Footprint: <span className="text-cyan-300 font-semibold">65 MB</span>
          </div>
        </div>
      </div>

      {/* Interactive Room Stream Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Streamed Rooms (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <DoorOpen className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'اتاق‌های دنیای بازی (Room Streaming Matrix)' : 'World Room Streaming Grid'}</span>
            </h3>
            <span className="text-xs text-slate-500">
              {isFa ? 'روی هر اتاق کلیک کنید تا جابجایی پلیر شبیه‌سازی شود' : 'Click a room to simulate player gate transition'}
            </span>
          </div>

          <div className="space-y-3">
            {rooms.map((room) => {
              return (
                <div
                  key={room.id}
                  onClick={() => moveToRoom(room.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    room.isCurrent
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-950/30 ring-1 ring-cyan-400'
                      : room.isLoaded
                      ? 'bg-slate-900 border-slate-700/80 hover:border-slate-600'
                      : 'bg-slate-950/60 border-slate-900 text-slate-600 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      room.isCurrent
                        ? 'bg-emerald-400 animate-ping'
                        : room.isLoaded
                        ? 'bg-cyan-400'
                        : 'bg-slate-700'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${
                          room.isCurrent ? 'text-white' : room.isLoaded ? 'text-slate-200' : 'text-slate-500'
                        }`}>
                          {room.name}
                        </span>
                        {room.isCurrent && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                            PLAYER HERE
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Biome: {room.biome}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono self-end sm:self-center">
                    <span className={room.isLoaded ? 'text-cyan-400' : 'text-slate-600'}>
                      {room.isLoaded ? 'LOADED (Additive)' : 'UNLOADED'}
                    </span>
                    <span className="text-slate-500">
                      {room.memoryMb} MB
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Streaming Log (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'لاگ عملیات SceneManager' : 'Async Load Operations'}</span>
            </h4>

            <div className="space-y-2 text-xs font-mono text-slate-400 max-h-[360px] overflow-y-auto">
              {streamingLog.map((log, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px]">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
