export interface RoadmapPhase {
  phase: number;
  id: string;
  nameEn: string;
  nameFa: string;
  category: 'Foundation' | 'Core Mechanics' | 'Progression' | 'Content & Systems' | 'Production' | 'Release';
  status: 'Current' | 'Pending' | 'Locked';
  descriptionEn: string;
  descriptionFa: string;
  deliverables: string[];
  dependencies: string;
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 0,
    id: "p0",
    nameEn: "Architecture & Foundation",
    nameFa: "معماری و پایه‌ریزی زیرساخت",
    category: "Foundation",
    status: "Current",
    descriptionEn: "Folder structure, interface contracts, state machine core, event channels, atomic save system, and data-driven SO schemas.",
    descriptionFa: "ساختار پوشه‌بندی، اینترفیس‌ها، هسته ماشین وضعیت، کانال رویدادها، ذخیره‌سازی اتمیک و مدل داده‌ها.",
    deliverables: [
      "Directory hierarchy under Assets/_Game",
      "Core contracts: IDamageable, IInteractable, ISaveable, IState",
      "Generic StateMachine & BaseState",
      "VoidEventChannelSO & GenericEventChannelSO",
      "SaveSystem & GameSaveData with versioning",
      "MovementDataSO schema definition",
      "ServiceLocator registry"
    ],
    dependencies: "None (Initial Foundation)"
  },
  {
    phase: 1,
    id: "p1",
    nameEn: "Player Core Movement",
    nameFa: "حرکت پایه بازیکن (فیزیک و حس)",
    category: "Core Mechanics",
    status: "Pending",
    descriptionEn: "Fluid horizontal locomotion, variable jump height, gravity curve tuning, ground/slope detection, coyote time, and jump buffering.",
    descriptionFa: "حرکت افقی روان، پرش با ارتفاع متغیر، شتاب سقوط، تشخیص زمین و شیب، پنجره کایوتی و بافر پرش.",
    deliverables: [
      "PlayerRoot entity setup",
      "PlayerMovement physics engine",
      "Ground & Slope raycast sensor",
      "Coyote time & jump buffer assist timers",
      "Movement StateMachine: Idle, Move, Jump, Fall"
    ],
    dependencies: "Phase 0 (Core StateMachine, MovementDataSO)"
  },
  {
    phase: 2,
    id: "p2",
    nameEn: "Advanced Movement & Abilities",
    nameFa: "حرکات پیشرفته و قابلیت‌های حرکتی",
    category: "Core Mechanics",
    status: "Pending",
    descriptionEn: "Wall slide friction, wall jump impulse, ground dash, air dash, double jump, and gliding mechanics.",
    descriptionFa: "اصطکاک سرخوردن روی دیوار، پرش دیواری، دش زمینی و هوایی، پرش جفت و شناوری در هوا.",
    deliverables: [
      "Wall detection sensors",
      "WallSlideState & WallJumpState",
      "DashAbility & AirDashState with cooldown/trail",
      "DoubleJumpAbility state integration",
      "GlideState with terminal velocity clamp"
    ],
    dependencies: "Phase 1 (Core Movement)"
  },
  {
    phase: 3,
    id: "p3",
    nameEn: "Camera System",
    nameFa: "سیستم دوربین هوشمند سینماچین",
    category: "Core Mechanics",
    status: "Pending",
    descriptionEn: "Cinemachine 2D virtual camera configuration, lookahead damping, deadzones, camera bounding zones, and trauma-based screen shake.",
    descriptionFa: "پیکربندی دوربین ۲ بعدی، پیش‌بینی جهت حرکت، مناطق مرگبار، محدوده کادر اتاق‌ها و لرزش ترومایی صفحه.",
    deliverables: [
      "Cinemachine 2D Virtual Camera rig",
      "Dynamic lookahead responsive to player velocity",
      "Confiner zones for room-bounded cameras",
      "CameraShakeManager triggered via event channels"
    ],
    dependencies: "Phase 1 (Player Transform)"
  },
  {
    phase: 4,
    id: "p4",
    nameEn: "Combat Engine",
    nameFa: "موتور مبارزات، ضربات و آسیب",
    category: "Core Mechanics",
    status: "Pending",
    descriptionEn: "Decoupled hitboxes/hurtboxes, attack combos, knockback physics, hit-stop impact frames, and invulnerability blinking.",
    descriptionFa: "جداسازی هیت‌باکس و هرت‌باکس، کمبوهای متوالی، فیزیک ناک‌بک، فریز فریم ضربه (Hit-stop) و چشمک مصونیت.",
    deliverables: [
      "Hitbox2D & Hurtbox2D components",
      "Combo attack chain execution",
      "DamageInfo payload transmission",
      "Hit-stop micro-pause duration system",
      "Knockback velocity impulse receiver"
    ],
    dependencies: "Phase 0 (IDamageable), Phase 1 (Movement State)"
  },
  {
    phase: 5,
    id: "p5",
    nameEn: "Enemy Framework & AI",
    nameFa: "فریم‌ورک دشمنان و هوش مصنوعی",
    category: "Core Mechanics",
    status: "Pending",
    descriptionEn: "Modular enemy FSM, detection sensors (line-of-sight, hearing), patrol paths, aggro chases, melee/ranged attacks, and hit reactions.",
    descriptionFa: "ماشین وضعیت دشمنان، سنسورهای بینایی و شنوایی، مسیرهای گشت‌زنی، تعقیب، الگوهای حمله و واکنش به ضربه.",
    deliverables: [
      "EnemyRoot & BaseEnemy architecture",
      "Enemy FSM: Idle, Patrol, Alert, Chase, Attack, Stun, Death",
      "Line-of-sight & proximity sensory checks",
      "Modular EnemyStatsSO profiles"
    ],
    dependencies: "Phase 0 (StateMachine), Phase 4 (Combat)"
  },
  {
    phase: 6,
    id: "p6",
    nameEn: "World & Biomes",
    nameFa: "جهان بازی و معماری بایوم‌ها",
    category: "Progression",
    status: "Pending",
    descriptionEn: "2D Tilemap architecture, multi-layered parallax backgrounds, environmental hazard triggers (spikes, acid), and ambient particles.",
    descriptionFa: "معماری تایل‌مپ ۲ بعدی، پس‌زمینه‌های پارالاکس چندلایه، خطرات محیطی (تیغ‌ها و اسید) و پارتیکل‌های اتمسفریک.",
    deliverables: [
      "Tilemap CompositeCollider2D optimization",
      "ParallaxController supporting multi-plane depth",
      "Hazard2D component applying TrueDamage",
      "Atmospheric ambient lighting layers (URP 2D)"
    ],
    dependencies: "Phase 0 (Folder Structure), Phase 4 (Damage System)"
  },
  {
    phase: 7,
    id: "p7",
    nameEn: "Metroidvania Map",
    nameFa: "سیستم نقشه و کشف محیط (Fog of War)",
    category: "Progression",
    status: "Pending",
    descriptionEn: "Tile-based discovery grid, Fog of War reveal system, mini-map HUD, full-screen map modal with markers, and room transition tracking.",
    descriptionFa: "نقشه شبکه‌ای، مه نقشه، مینی‌مپ روی HUD، نقشه تمام‌صفحه همراه با نشانگرها و رهگیری جابجایی بین اتاق‌ها.",
    deliverables: [
      "Grid-based RoomData tracking",
      "Fog-of-war dynamic reveal texture/grid",
      "Interactive Fullscreen Map UI",
      "Player location marker & custom pin placement"
    ],
    dependencies: "Phase 0 (Save System), Phase 6 (World)"
  },
  {
    phase: 8,
    id: "p8",
    nameEn: "Ability & Progression Gating",
    nameFa: "قفل‌ها و گیت‌های پیشرفت با توانایی",
    category: "Progression",
    status: "Pending",
    descriptionEn: "Metroidvania gating mechanics (high cliffs for Double Jump, crystal barriers for Dash, spirit hooks for Grapple), ability shrines.",
    descriptionFa: "طراحی گیت‌های توانایی (صخره‌های بلند، موانع کریستالی، قلاب‌های روحی) و محراب‌های اعطای توانایی.",
    deliverables: [
      "AbilityShrine interactable object",
      "AbilityGate barriers responsive to specific abilities",
      "Sequence-break safety checks",
      "AbilityUnlockedEventChannelSO integration"
    ],
    dependencies: "Phase 2 (Abilities), Phase 6 (World)"
  },
  {
    phase: 9,
    id: "p9",
    nameEn: "Boss Framework",
    nameFa: "فریم‌ورک باس‌ها و فازهای مبارزه",
    category: "Progression",
    status: "Pending",
    descriptionEn: "Multi-phase boss controller, arena lockdown gates, telegraph visualizers, dynamic orchestrator music triggers, and victory rewards.",
    descriptionFa: "مدیریت چندفازی باس‌ها، قفل شدن درهای آرنا، پیش‌نمایش حملات (Telegraph)، تغییر موسیقی و اهدای پاداش.",
    deliverables: [
      "BossPhaseController state machine",
      "ArenaLockdown barrier system",
      "BossHealthBar UI connected via event channel",
      "Telegraph indicators (vocal, visual, warning flash)"
    ],
    dependencies: "Phase 4 (Combat), Phase 5 (Enemy AI)"
  },
  {
    phase: 10,
    id: "p10",
    nameEn: "Puzzle & Environment Interactions",
    nameFa: "پازل‌ها و تعاملات محیطی",
    category: "Progression",
    status: "Pending",
    descriptionEn: "Mechanical levers, pressure plates, destructible secret walls, moving platforms, and physics-based light bridges.",
    descriptionFa: "اهرم‌های مکانیکی، صفحات فشاری، دیوارهای مخفی تخریب‌پذیر، پلتفرم‌های متحرک و پل‌های نوری فیزیکی.",
    deliverables: [
      "LeverMechanism & PressurePlate components",
      "BreakableWall with debris particle burst",
      "WaypointMovingPlatform with player friction sticking",
      "PuzzleCompletionEventChannelSO"
    ],
    dependencies: "Phase 0 (IInteractable), Phase 6 (World)"
  },
  {
    phase: 11,
    id: "p11",
    nameEn: "Save / Load & Checkpoint Integration",
    nameFa: "یکپارچه‌سازی سیستم ذخیره و چک‌پوینت",
    category: "Content & Systems",
    status: "Pending",
    descriptionEn: "Checkpoint monuments restoring health and writing atomic save files; multiple profile management and fast travel network.",
    descriptionFa: "بناهای چک‌پوینت برای بازیابی جان و ذخیره اتمیک اطلاعات؛ مدیریت پروفایل‌ها و شبکه جابجایی سریع.",
    deliverables: [
      "CheckpointMonument interaction & light ignition",
      "Background file writing thread invocation",
      "Save slot selector UI",
      "Death respawn sequence restoring exact state"
    ],
    dependencies: "Phase 0 (SaveSystem), Phase 7 (Map)"
  },
  {
    phase: 12,
    id: "p12",
    nameEn: "UI / UX Systems",
    nameFa: "رابط کاربری و تجربه کاربری (UI/UX)",
    category: "Content & Systems",
    status: "Pending",
    descriptionEn: "Minimalist atmospheric HUD (health orbs, energy vessels), pause menu, settings (audio sliders, display, keybinds), game over sequence.",
    descriptionFa: "رابط کاربری اتمسفریک و مینیمال (گوی‌های سلامتی و انرژی)، منوی مکث، تنظیمات صدا و کلیدها و صفحه گیم‌اوور.",
    deliverables: [
      "Atmospheric Player HUD canvas",
      "PauseMenu & Settings panel",
      "New Input System remapping overlay",
      "Ability acquired celebratory fanfare modal"
    ],
    dependencies: "Phase 0 (Event Channels)"
  },
  {
    phase: 13,
    id: "p13",
    nameEn: "Story & Narrative Integration",
    nameFa: "روایت داستان، دیالوگ و یادداشت‌های اساطیری",
    category: "Content & Systems",
    status: "Pending",
    descriptionEn: "Ancient monolith lore inscriptions, mysterious spirit NPC dialogue trees, and narrative progression triggers.",
    descriptionFa: "سنگ‌نبشته‌های باستانی، سیستم دیالوگ ارواح باستانی و پرچم‌های پیشرفت خط داستانی بازی.",
    deliverables: [
      "DialogueBox typewriter presentation",
      "DialogueDataSO branching structure",
      "LoreTablet interactable reader",
      "Narrative milestone event channels"
    ],
    dependencies: "Phase 0 (IInteractable), Phase 12 (UI)"
  },
  {
    phase: 14,
    id: "p14",
    nameEn: "Art Direction & Shaders",
    nameFa: "کارگردانی هنری، متریال‌ها و شیدرهای ۲ بعدی",
    category: "Production",
    status: "Pending",
    descriptionEn: "Original fantasy aesthetic definition (glowing bioluminescence, ancient ruins), custom sprite lit shaders, and rim lighting.",
    descriptionFa: "تعریف هویت بصری اصیل (گیاهان زیست‌تابنده، خرابه‌های کهن)، شیدرهای اختصاصی نور و لبه‌های درخشان.",
    deliverables: [
      "Art style bible & color scripting",
      "URP 2D Custom Lit shaders with normal map support",
      "Bioluminescent rim light materials",
      "Foreground vegetation silhouettes"
    ],
    dependencies: "Phase 6 (World)"
  },
  {
    phase: 15,
    id: "p15",
    nameEn: "Animation Pipeline",
    nameFa: "پایپ‌لاین انیمیشن و پاسخگویی بصری",
    category: "Production",
    status: "Pending",
    descriptionEn: "Fluid frame-by-frame and skeletal sprite animations with squash & stretch physics and zero gameplay input lag.",
    descriptionFa: "انیمیشن‌های فریم‌به‌فریم سیال همراه با لهیدگی و کشیدگی (Squash & Stretch) بدون تأخیر در دریافت فرامین پلیر.",
    deliverables: [
      "Player Animator Controller graph",
      "Locomotion blend trees & jump arc transitions",
      "Procedural squash & stretch spring solver",
      "Animation Event triggers mapped to sound & FX"
    ],
    dependencies: "Phase 1 (Movement), Phase 4 (Combat)"
  },
  {
    phase: 16,
    id: "p16",
    nameEn: "VFX & Particle Architecture",
    nameFa: "معماری جلوه‌های بصری و پارتیکل‌ها",
    category: "Production",
    status: "Pending",
    descriptionEn: "Ethereal dust motes, weapon swing ribbons, dash trails, impact bursts, and enemy disintegration effects.",
    descriptionFa: "ذرات نورانی شناور، دنباله شمشیر، دنباله شبح‌گون دش، انفجارهای ناشی از ضربه و محو شدن جادویی دشمنان.",
    deliverables: [
      "Particle pool manager",
      "Dash after-image ghosting renderer",
      "Melee slash arc mesh trails",
      "Environmental ambient leaf and spore systems"
    ],
    dependencies: "Phase 4 (Combat), Phase 14 (Art)"
  },
  {
    phase: 17,
    id: "p17",
    nameEn: "Audio & Dynamic Soundscapes",
    nameFa: "صداگذاری، موسیقی تطبیقی و امبینت",
    category: "Production",
    status: "Pending",
    descriptionEn: "Adaptive dynamic music layers (exploration vs combat), spatial 2D audio emitters, footsteps per surface, and crisp hit feedback.",
    descriptionFa: "موسیقی تطبیقی چندلایه‌ای (اکتشاف در برابر نبرد)، صدای دوبعدی سه‌بعدی‌شده، گام‌ها بر اساس جنس زمین و فیدبک برخورد.",
    deliverables: [
      "AudioMixer groups (Master, Music, SFX, Ambience)",
      "Dynamic stem mixer (stems crossfade on enemy aggro)",
      "Surface-specific footstep audio triggers",
      "SoundBankSO audio asset mapping"
    ],
    dependencies: "Phase 0 (Core Events), Phase 4 (Combat)"
  },
  {
    phase: 18,
    id: "p18",
    nameEn: "Vertical Slice Assembly",
    nameFa: "تلفیق و برپایی برش عمودی (Vertical Slice)",
    category: "Production",
    status: "Pending",
    descriptionEn: "15–20 minutes of continuous, highly polished gameplay in Biome 1 featuring core exploration, combat, mini-boss, and ability unlock.",
    descriptionFa: "۱۵ تا ۲۰ دقیقه گیم‌پلی کاملاً صیقل‌خورده در بایوم اول شامل اکتشاف، مبارزه، مینی‌باس و آزاد شدن اولین توانایی.",
    deliverables: [
      "Integrated Biome 1 playable flow",
      "Full audio, VFX, and animation pass",
      "Complete ability gate loop demonstration",
      "Internal playtest feedback report"
    ],
    dependencies: "All preceding Phases (0 through 17)"
  },
  {
    phase: 19,
    id: "p19",
    nameEn: "Gameplay Polish & Juice",
    nameFa: "صیقل نهایی و ایجاد حس بازی (Game Feel)",
    category: "Production",
    status: "Pending",
    descriptionEn: "Subtle micro-delays, controller haptics, landing dust puffs, camera easing micro-curves, and seamless animation cancels.",
    descriptionFa: "میکروتأخیرهای لذت‌بخش، لرزش دسته، گردوغبار فرود آمدن، نرمی حرکت دوربین و لغو انیمیشن‌های مورد نیاز پلی‌تسترها.",
    deliverables: [
      "Gamepad rumble integration via New Input System",
      "Input buffer tuning based on player ergonomics",
      "Micro-camera zoom accents on critical hits",
      "HUD animation smoothing"
    ],
    dependencies: "Phase 18 (Vertical Slice)"
  },
  {
    phase: 20,
    id: "p20",
    nameEn: "Optimization & Performance Profiling",
    nameFa: "بهینه‌سازی فنی و پروفایلینگ عملکرد",
    category: "Release",
    status: "Pending",
    descriptionEn: "Draw call batching (Sprite Atlas), zero GC allocation in hot loops, physics matrix trimming, and memory leak verification.",
    descriptionFa: "یکی‌سازی فراخوانی‌های ترسیم (Sprite Atlas)، به صفر رساندن تخصیص حافظه (GC) در لوپ‌ها و پروفایلینگ رم.",
    deliverables: [
      "Unity Profiler memory & CPU timeline report",
      "Sprite Atlas packing and compressed textures",
      "Physics 2D Layer Collision Matrix optimization",
      "Garbage collection allocations eliminated from Update/FixedUpdate"
    ],
    dependencies: "Phase 18 (Vertical Slice)"
  },
  {
    phase: 21,
    id: "p21",
    nameEn: "Quality Assurance & Regression Testing",
    nameFa: "تضمین کیفیت و تست‌های ضد رگرسیون",
    category: "Release",
    status: "Pending",
    descriptionEn: "Boundary breaking tests, wall clip prevention, corrupt save file recovery simulations, frame rate stress benchmarks.",
    descriptionFa: "تست‌های گیر افتادن در دیوار، تست ریکاوری فایل سیو خراب، بنچمارک نرخ فریم روی سخت‌افزارهای ضعیف‌تر.",
    deliverables: [
      "Automated playmode tests for save/load & movement",
      "Collision edge clipping penetration tests",
      "Bug tracker triage and resolution log",
      "Release candidate validation matrix"
    ],
    dependencies: "Phase 20 (Optimization)"
  },
  {
    phase: 22,
    id: "p22",
    nameEn: "Final Build & Release Package",
    nameFa: "بیلد نهایی و پکیجینگ انتشار تجاری",
    category: "Release",
    status: "Pending",
    descriptionEn: "Standalone PC executable, Steamworks integration hooks, localization assets, and distribution packaging.",
    descriptionFa: "خروجی نهایی اجرایی، هوک‌های استیم، متون چندزبانه و بسته‌بندی نهایی بازی برای انتشار رسمی.",
    deliverables: [
      "Optimized Standalone Windows/Mac builds",
      "Localization tables verification",
      "Crash reporting & analytics hooks (opt-in)",
      "Gold Master release candidate tag"
    ],
    dependencies: "Phase 21 (QA)"
  }
];
