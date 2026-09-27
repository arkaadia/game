import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Play, 
  RotateCcw, 
  Zap, 
  Activity, 
  ShieldAlert, 
  ArrowRight, 
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';

type EntityMode = 'Player' | 'Enemy';

interface StateTransitionLog {
  timestamp: string;
  from: string;
  to: string;
  trigger: string;
}

export const StateMachineSimulator: React.FC<{ lang: 'en' | 'fa' }> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [mode, setMode] = useState<EntityMode>('Player');

  // Player FSM states
  const playerStates = ['Idle', 'Run', 'Jump', 'Fall', 'Dash', 'Attack', 'Hit', 'Dead'];
  const [playerCurrentState, setPlayerCurrentState] = useState<string>('Idle');
  const [playerPreviousState, setPlayerPreviousState] = useState<string>('None');

  // Enemy FSM states
  const enemyStates = ['Idle', 'Patrol', 'Detect', 'Chase', 'Attack', 'Hit', 'Stunned', 'Dead'];
  const [enemyCurrentState, setEnemyCurrentState] = useState<string>('Patrol');
  const [enemyPreviousState, setEnemyPreviousState] = useState<string>('None');

  // Log
  const [logs, setLogs] = useState<StateTransitionLog[]>([]);
  const [coyoteTimeActive, setCoyoteTimeActive] = useState<boolean>(false);
  const [dashOnCooldown, setDashOnCooldown] = useState<boolean>(false);

  const addLog = (from: string, to: string, trigger: string) => {
    const newLog: StateTransitionLog = {
      timestamp: new Date().toLocaleTimeString(),
      from,
      to,
      trigger
    };
    setLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  const transitionPlayer = (targetState: string, triggerName: string) => {
    if (playerCurrentState === 'Dead') {
      return; // Terminal state
    }
    if (playerCurrentState === targetState) return;

    // Transition guards
    if (targetState === 'Dash') {
      if (dashOnCooldown) {
        addLog(playerCurrentState, playerCurrentState, 'Dash REJECTED: Cooldown active');
        return;
      }
      setDashOnCooldown(true);
      setTimeout(() => setDashOnCooldown(false), 800);
    }

    setPlayerPreviousState(playerCurrentState);
    setPlayerCurrentState(targetState);
    addLog(playerCurrentState, targetState, triggerName);
  };

  const transitionEnemy = (targetState: string, triggerName: string) => {
    if (enemyCurrentState === 'Dead') return;
    if (enemyCurrentState === targetState) return;

    setEnemyPreviousState(enemyCurrentState);
    setEnemyCurrentState(targetState);
    addLog(enemyCurrentState, targetState, triggerName);
  };

  const resetFSM = () => {
    if (mode === 'Player') {
      setPlayerPreviousState('None');
      setPlayerCurrentState('Idle');
      addLog('Reset', 'Idle', 'System Initialized');
    } else {
      setEnemyPreviousState('None');
      setEnemyCurrentState('Patrol');
      addLog('Reset', 'Patrol', 'AI Spawned');
    }
    setDashOnCooldown(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              Core/StateMachine/
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-300">Phase 0 Contract Verification</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-cyan-400" />
            {isFa ? 'شبیه‌ساز تعاملی ماشین وضعیت (FSM)' : 'Interactive Finite State Machine Simulator'}
          </h2>
          <p className="text-sm text-slate-400">
            {isFa
              ? 'تست رفتار ماشین وضعیت برای پلیر و انمی بدون هیچگونه کدنویسی مستقیم گیم‌پلی در Phase 0، جهت راستی‌آزمایی اینترفیس‌های IState و StateMachine.'
              : 'Verifies the decoupled IState and StateMachine contracts with live state transition evaluation, input triggers, and cooldown guards.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setMode('Player')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'Player'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isFa ? 'پلیر (Player FSM)' : 'Player FSM'}
            </button>
            <button
              onClick={() => setMode('Enemy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'Enemy'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isFa ? 'دشمن (Enemy FSM)' : 'Enemy FSM'}
            </button>
          </div>

          <button
            onClick={resetFSM}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isFa ? 'ریست' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Graph + Triggers + Telemetry Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: State Graph & Triggers (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active State Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {isFa ? 'وضعیت فعال کنونی (Current State)' : 'Current Active State'}
              </span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1 flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-emerald-400">
                  {mode === 'Player' ? playerCurrentState : enemyCurrentState}
                </span>
                <span className="text-xs font-mono text-slate-500 font-normal">
                  (Prev: {mode === 'Player' ? playerPreviousState : enemyPreviousState})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {mode === 'Player' && (
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono px-2 py-1 rounded border ${
                    dashOnCooldown 
                      ? 'bg-amber-950/60 text-amber-400 border-amber-800/40' 
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                  }`}>
                    Dash Cooldown: {dashOnCooldown ? 'ACTIVE' : 'READY'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Visual State Nodes */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'گره‌های وضعیت (Registered States)' : 'Registered State Nodes'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(mode === 'Player' ? playerStates : enemyStates).map((state) => {
                const isActive = (mode === 'Player' ? playerCurrentState : enemyCurrentState) === state;
                return (
                  <div
                    key={state}
                    className={`p-3.5 rounded-xl border text-center font-mono text-xs transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400 scale-[1.02]'
                        : 'bg-slate-950/70 text-slate-400 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm">{state}</div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {isActive ? '● EXECUTING' : 'Idle'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trigger Dispatcher Controls */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>{isFa ? 'ارسال رویدادها و محرک‌های تغییر وضعیت' : 'Simulate Game Events & State Transitions'}</span>
            </h3>

            {mode === 'Player' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => transitionPlayer('Run', 'Input: Move Vector (X != 0)')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs hover:border-cyan-500/40 transition-colors"
                >
                  <div className="font-semibold text-white">Input: Horizontal Move</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Transition to RunState</div>
                </button>

                <button
                  onClick={() => transitionPlayer('Idle', 'Input: Released Direction')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs hover:border-cyan-500/40 transition-colors"
                >
                  <div className="font-semibold text-white">Input: Stop Moving</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Transition to IdleState</div>
                </button>

                <button
                  onClick={() => transitionPlayer('Jump', 'Input: Jump Button (Grounded)')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs hover:border-cyan-500/40 transition-colors"
                >
                  <div className="font-semibold text-white">Input: Jump (Up Impulse)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Calculate Jump Velocity</div>
                </button>

                <button
                  onClick={() => transitionPlayer('Fall', 'Apex Reached / Off Ledge')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs hover:border-cyan-500/40 transition-colors"
                >
                  <div className="font-semibold text-white">Physics: Downward Gravity</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Transition to FallState</div>
                </button>

                <button
                  onClick={() => transitionPlayer('Dash', 'Input: Dash (Check Cooldown)')}
                  className="p-3 text-left rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-200 border border-cyan-800/50 text-xs transition-colors"
                >
                  <div className="font-semibold text-cyan-300">Ability: Spectral Dash</div>
                  <div className="text-[10px] text-cyan-400/70 mt-0.5">Invulnerable i-frames active</div>
                </button>

                <button
                  onClick={() => transitionPlayer('Attack', 'Input: Attack Key')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs hover:border-cyan-500/40 transition-colors"
                >
                  <div className="font-semibold text-white">Combat: Slash Attack</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Activate Hitbox2D</div>
                </button>

                <button
                  onClick={() => transitionPlayer('Hit', 'IDamageable.TakeDamage()')}
                  className="p-3 text-left rounded-xl bg-amber-950/50 hover:bg-amber-900/50 text-amber-200 border border-amber-800/40 text-xs transition-colors"
                >
                  <div className="font-semibold text-amber-300">Hazard: Take Damage</div>
                  <div className="text-[10px] text-amber-400/70 mt-0.5">HitStun & Knockback</div>
                </button>

                <button
                  onClick={() => transitionPlayer('Dead', 'Health <= 0')}
                  className="p-3 text-left rounded-xl bg-rose-950/50 hover:bg-rose-900/50 text-rose-200 border border-rose-800/40 text-xs transition-colors"
                >
                  <div className="font-semibold text-rose-300">Event: Fatal Blow (Dead)</div>
                  <div className="text-[10px] text-rose-400/70 mt-0.5">Trigger Respawn Pipeline</div>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => transitionEnemy('Patrol', 'Waypoint Reached / Reset')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs transition-colors"
                >
                  <div className="font-semibold text-white">AI: Start Patrol Route</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Ping-pong between bounds</div>
                </button>

                <button
                  onClick={() => transitionEnemy('Detect', 'Vision Cone Raycast Hit')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs transition-colors"
                >
                  <div className="font-semibold text-white">Sensor: Player Sighted</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Alert icon (!) display</div>
                </button>

                <button
                  onClick={() => transitionEnemy('Chase', 'Target Acquired')}
                  className="p-3 text-left rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-200 border border-indigo-800/50 text-xs transition-colors"
                >
                  <div className="font-semibold text-indigo-300">Behavior: Aggro Chase</div>
                  <div className="text-[10px] text-indigo-400/70 mt-0.5">Accelerate toward player</div>
                </button>

                <button
                  onClick={() => transitionEnemy('Attack', 'In Attack Range (1.8m)')}
                  className="p-3 text-left rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs transition-colors"
                >
                  <div className="font-semibold text-white">Attack: Claw Strike</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Telegraph & Strike</div>
                </button>

                <button
                  onClick={() => transitionEnemy('Hit', 'Player Slash Connected')}
                  className="p-3 text-left rounded-xl bg-amber-950/50 hover:bg-amber-900/50 text-amber-200 border border-amber-800/40 text-xs transition-colors"
                >
                  <div className="font-semibold text-amber-300">Damage: Stagger Impact</div>
                  <div className="text-[10px] text-amber-400/70 mt-0.5">White flash material</div>
                </button>

                <button
                  onClick={() => transitionEnemy('Dead', 'Enemy HP Depleted')}
                  className="p-3 text-left rounded-xl bg-rose-950/50 hover:bg-rose-900/50 text-rose-200 border border-rose-800/40 text-xs transition-colors"
                >
                  <div className="font-semibold text-rose-300">Death: Shatter & Drop Loot</div>
                  <div className="text-[10px] text-rose-400/70 mt-0.5">Despawn & trigger relics</div>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right: State Transition Log & Contract Architecture (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Transition History Log */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isFa ? 'لاگ تلمتری ترنزیشن‌ها' : 'FSM Transition Telemetry'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {logs.length} events
              </span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-slate-500 text-center py-8">
                  {isFa ? 'برای مشاهده لاگ، دکمه‌های رویداد را تست کنید.' : 'Click trigger buttons above to inspect state switches.'}
                </div>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800/70 text-[11px] space-y-0.5"
                  >
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span>{log.timestamp}</span>
                      <span className="text-cyan-400">{log.trigger}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-200">
                      <span className="text-slate-400">{log.from}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                      <span className="text-emerald-400">{log.to}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Architecture Contract Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
            <div className="font-mono text-[11px] font-semibold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFa ? 'چرخه حیات بدون نشت در IState' : 'IState Lifecycle Contract'}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isFa
                ? 'هر حالت مستقل است و ورودی‌ها در Execute و نیروها در PhysicsExecute اعمال می‌شوند. هنگام خروج، Exit هرگونه افکت موقت را پاکسازی می‌کند.'
                : 'States are purely atomic. Physics calculations occur in PhysicsExecute() on fixed delta times. Exit() tears down active flags and transient VFX, ensuring zero state pollution.'}
            </p>
            <div className="p-2.5 rounded bg-slate-900 font-mono text-[10px] text-slate-400">
              <code>Enter() → Execute() → PhysicsExecute() → Exit()</code>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
