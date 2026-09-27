export interface SectionContent {
  id: string;
  letter: string;
  titleEn: string;
  titleFa: string;
  summaryEn: string;
  summaryFa: string;
  keyPoints: { en: string; fa: string }[];
  detailsEn: string;
  detailsFa: string;
  badge?: string;
}

export const PHASE0_SECTIONS: SectionContent[] = [
  {
    id: "project-analysis",
    letter: "A",
    titleEn: "Current Project Analysis",
    titleFa: "تحلیل وضعیت فعلی پروژه",
    summaryEn: "Clean slate baseline verification: Unity 2D environment requirements, packages, and architecture boundaries.",
    summaryFa: "بررسی وضعیت اولیه مخزن، نسخه‌های استاندارد، بسته‌های الزامی و مرزهای معماری پروژه.",
    keyPoints: [
      {
        en: "Target Engine: Unity 2022.3 LTS or Unity 6 (6000.x) for long-term production stability and native 2D toolset support.",
        fa: "موتور هدف: Unity 2022.3 LTS یا Unity 6 با هدف پایداری طولانی‌مدت و پشتیبانی از ابزارهای بومی 2D."
      },
      {
        en: "Core Packages Required: New Input System, 2D Tilemap Extras, Universal Render Pipeline (URP 2D), Cinemachine 2D, TextMeshPro.",
        fa: "پکیج‌های ضروری: Input System جدید، پکیج Tilemap Extras، خط رندر URP 2D، سینماچین و TextMeshPro."
      },
      {
        en: "Clean Code Isolation: Strictly separating gameplay logic from assets, third-party libraries, and generated metadata.",
        fa: "جداسازی کامل کدها: تفکیک منطق گیم‌پلی از بسته‌های متفرقه، پلاگین‌ها و داده‌های جنریت‌شده."
      }
    ],
    detailsEn: `The repository is initialized in Phase 0. No legacy spaghetti code, monolith controllers, or unauthorized imported assets exist. 
All architecture starting points adhere to strict enterprise separation of concerns:
- Rendering: Universal Render Pipeline (URP) with 2D Renderer for dynamic 2D lighting, normal maps, and emissive bloom shaders.
- Physics: Unity 2D Physics (BoxCollider2D, CapsuleCollider2D, CompositeCollider2D for tilemaps) with custom velocity integration for tight platforming.
- Input: Unity New Input System (Input Action Assets) generating C# event wrappers for multi-platform rebinding (gamepad + keyboard).
- Version Control: Standard Unity .gitignore with Git LFS enabled for binary assets (audio, sprites, textures).`,
    detailsFa: `پروژه در نقطه صفر و تمیز قرار دارد. هیچ کد یکپارچه معیوب، اسکریپت حجیم مونوپولی (Monolith) یا اسپرایت‌های غیر اورجینال وجود ندارد.
پایه فنی پروژه بر اساس استانداردهای زیر پایه‌گذاری می‌شود:
- سیستم رندرینگ: URP 2D با نورپردازی داینامیک دو بعدی، متریال‌های دارای Normal Map و جلوه‌های درخشش (Bloom) اختصاصی اتمسفریک.
- فیزیک: Unity 2D Physics با کلایدرهای کامپوزیت روی تایل‌مپ‌ها، همراه با شبیه‌سازی دقیق و اختصاصی سرعت حرکت (Velocity Integration) جهت ایجاد حس سیال، دقیق و پاسخگو شبیه به بهترین آثار سبک.
- کنترل ورودی: New Input System با فایل Input Actions جهت پشتیبانی بی‌نقص از گیم‌پد، کیبورد و قابلیت Rebind کردن کلیدها.
- مدیریت نسخه: گیت با کانفیگ استاندارد Unity و فعال‌سازی Git LFS برای فایل‌های حجیم مانند صداها و تکسچرها.`
  },
  {
    id: "proposed-architecture",
    letter: "B",
    titleEn: "Proposed Architecture",
    titleFa: "معماری پیشنهادی سیستم",
    summaryEn: "Layered, Event-Driven & Data-Oriented Component Architecture with zero tight coupling.",
    summaryFa: "معماری لایه‌ای، مبتنی بر رویداد (Event-Driven) و مبتنی بر داده (Data-Driven) با حذف کامل وابستگی‌های مستقیم.",
    keyPoints: [
      {
        en: "Coordinator Pattern: Player/Enemy Root coordinators mediate communication between modular components.",
        fa: "الگوی Coordinator: کامپوننت ریشه به عنوان هماهنگ‌کننده میان ساب‌کامپوننت‌های مستقل عمل می‌کند."
      },
      {
        en: "ScriptableObject Event Architecture: Decoupled communication across scene boundaries without direct references.",
        fa: "معماری رویداد بر پایه ScriptableObject: برقراری ارتباط بین سیستم‌ها بدون نیاز به رفرنس مستقیم."
      },
      {
        en: "Strict Separation of State vs. Visuals: Visuals (VFX, Animator, Audio) only listen to state transitions.",
        fa: "تفکیک کامل وضعیت از بخش بصری: انیمیشن، صدا و ذرات تنها شنونده تغییر وضعیت‌ها هستند و روی منطق فیزیک تاثیری ندارند."
      }
    ],
    detailsEn: `We reject the monolithic 'PlayerController.cs' anti-pattern. Instead, our entity composition architecture employs:
1. Root Entity (PlayerRoot / EnemyRoot): Owns the StateMachine, holds read-only references to child modules, and forwards Unity lifecycle events.
2. Independent Sub-Systems:
   - Movement: Handles velocity, acceleration curves, collision probing, ground detection.
   - Combat: Manages attack windows, hitboxes, hurtboxes, cooldowns, combo chains.
   - Health: Manages current/max HP, invincibility frames (i-frames), damage event dispatching.
   - Abilities: Manages unlocked capabilities (Dash, Double Jump, Wall Cling) via strategy objects.
   - Animation/Audio/VFX Listeners: Pure observers reacting to state events without executing game logic.`,
    detailsFa: `ما الگوی مخرب مونوپولی (مانند قرار دادن هزاران خط کد درون یک فایل PlayerController) را کاملاً کنار می‌گذاریم. به جای آن، ساختار Entity بر مبنای ماژولاریتی مطلق استوار است:
۱. کامپوننت ریشه (PlayerRoot / EnemyRoot): متولی ماشین وضعیت و پل ارتباطی ساب‌کامپوننت‌ها بدون ایجاد وابستگی متقابل.
۲. ساب‌سیستم‌های کامپوننتال:
   - ماژول حرکت (Movement): مسئول شتاب، سرعت، اصطکاک و تشخیص زمین/دیوار.
   - ماژول مبارزه (Combat): مسئول پنجره‌های زمانی حمله، هیت‌باکس‌ها، کول‌داون و کومبوها.
   - ماژول سلامتی (Health): متولی جان، فریم‌های شکست‌ناپذیری (i-frames) و ثبت آسیب.
   - ماژول قابلیت‌ها (Abilities): سیستم استراتژی برای توانایی‌های فعال و غیرفعال آنلاک‌شونده.
   - شنوندگان بصری و صوتی (Audio/VFX/Anim): آبزرورهای خالص که بدون دخالت در لاجیک، به رخدادها پاسخ می‌دهند.`
  },
  {
    id: "folder-structure",
    letter: "C",
    titleEn: "Folder Structure",
    titleFa: "ساختار پوشه‌بندی استاندارد",
    summaryEn: "Standardized production directory hierarchy grouped strictly by architectural responsibility.",
    summaryFa: "ساختار درختی استاندارد و منظم پروژه‌های تجاری یونیتی، تفکیک شده بر اساس مسئولیت.",
    keyPoints: [
      {
        en: "_Game prefix: Keeps project-specific code and assets distinct from Unity packages and 3rd party plugins.",
        fa: "پیشوند _Game: جدا نگه داشتن کدهای اختصاصی پروژه از پکیج‌های پیش‌فرض و افزونه‌های ترد پارتی."
      },
      {
        en: "Data-Driven isolation: ScriptableObjects, presets, and balance configs stored in dedicated /Data directories.",
        fa: "پوشه مجزای Data: نگهداری اسکریپتبل آبجکت‌ها و تنظیمات بالانس جهت راحتی کار تیم دیزاین."
      },
      {
        en: "Modular Gameplay subfolders: Player, Enemies, Combat, Abilities, Bosses isolated in modular sub-trees.",
        fa: "پوشه‌های مجزای گیم‌پلی: تفکیک فایل‌های پلیر، انمی‌ها، باس‌ها و توانایی‌ها در شاخه‌های مستقل."
      }
    ],
    detailsEn: `Assets/
├── _Game/
│   ├── Core/
│   │   ├── Managers/          # ServiceLocator, GameFlowManager
│   │   ├── Events/            # VoidEventChannelSO, GenericEventChannelSO
│   │   ├── StateMachine/      # IState, StateMachine, BaseState
│   │   ├── Interfaces/        # IDamageable, IInteractable, ISaveable, IAbility
│   │   └── Utilities/         # PhysicsExtensions, MathHelpers, TimerUtils
│   ├── Gameplay/
│   │   ├── Player/            # PlayerRoot, PlayerMovement, PlayerHealth, Controllers
│   │   ├── Enemies/           # BaseEnemy, EnemyAI, EnemySensors
│   │   ├── Combat/            # Hitbox2D, Hurtbox2D, DamageInfo, KnockbackReceiver
│   │   ├── Abilities/         # BaseAbility, DashAbility, DoubleJumpAbility
│   │   ├── Bosses/            # BossPhaseController, BossArenaTrigger
│   │   └── Interactions/      # CheckpointObject, LoreStone, DoorMechanism
│   ├── World/
│   │   ├── Areas/             # AreaBoundaries, RoomController
│   │   ├── Biomes/            # BiomePresets, EnvironmentalHazard2D
│   │   ├── Checkpoints/       # CheckpointManager, RespawnAnchor
│   │   └── WorldMap/          # MapFogController, RoomDataNode
│   ├── Systems/
│   │   ├── Save/              # SaveSystem, GameSaveData, SaveSlotHandler
│   │   ├── Audio/             # SoundManager, AudioEmitter2D, BGMController
│   │   ├── Camera/            # CameraZoneTrigger, ShakeManager, TargetFraming
│   │   ├── UI/                # HUDController, PauseMenu, AbilityGetPopup
│   │   └── SceneManagement/   # SceneLoader, TransitionCurtain, AreaGate
│   ├── Data/
│   │   ├── Player/            # MovementDataSO, PlayerStatsSO
│   │   ├── Enemies/           # EnemyStatsSO, PatrolRouteConfigSO
│   │   ├── Abilities/         # AbilityDataSO
│   │   └── Audio/             # SoundBankSO, AudioCueSO
│   ├── Art/ (Sprites, Shaders, Materials, Tilesets)
│   ├── Audio/ (Music, SFX, Ambience)
│   ├── Prefabs/ (Player, Enemies, Hazards, WorldProps)
│   └── Scenes/ (Bootstrapper, PersistentManagers, Biomes)
└── ThirdParty/`,
    detailsFa: `ساختار کامل پوشه‌بندی در شاخه Assets/_Game سازمان‌دهی شده و هر پوشه دارای مرز مسئولیت مشخص است تا از پخش شدن فایل‌ها، نشت کدهای متفرقه به لاجیک بازی و تداخل در کار تیمی جلوگیری شود.`
  },
  {
    id: "core-systems",
    letter: "D",
    titleEn: "Core Systems",
    titleFa: "لیست و معماری سیستم‌های اصلی",
    summaryEn: "12 foundational systems designed for high resilience, zero memory leaks, and seamless extensibility.",
    summaryFa: "۱۲ سیستم بنیادین بازی که با انعطاف بالا، عدم مصرف حافظه غیرضروری و امکان توسعه پیوسته مهندسی شده‌اند.",
    keyPoints: [
      {
        en: "Finite State Machine (FSM): Type-safe, deterministic state management for player, enemies, and bosses.",
        fa: "ماشین وضعیت متناهی (FSM): مدیریت وضعیت قطعی و امن برای پلیر، دشمنان و باس‌ها."
      },
      {
        en: "Event Channel Bus: ScriptableObject-based event distribution avoiding tight C# delegates and memory leaks.",
        fa: "گذرگاه رویدادها (Event Channels): مخابره رخدادها مبتنی بر SO بدون نیاز به سینگلتون و بدون نشت حافظه."
      },
      {
        en: "Additive Scene Streaming: Asynchronous loading/unloading of Metroidvania rooms and biomes in real time.",
        fa: "استریم ادتیو صحنه‌ها: لود و آنلود نامحسوس اتاق‌ها و بایوم‌های دنیای مترویدوانیا در زمان حرکت پلیر."
      }
    ],
    detailsEn: `The 12 Core Systems:
1. Game State Manager: Bootstrapping, GameState (Playing, Paused, Dialogue, Cutscene, Dead).
2. Event Channel Architecture: Broadcast channels for health, progression, scene changes, abilities.
3. Modular State Machine: BaseState, StateMachine, with hierarchical state support (e.g. InAir -> Falling/Gliding).
4. Decoupled Combat Engine: IDamageable, Hitbox/Hurtbox separation, damage mitigation, knockback calculation.
5. Service Locator Registry: Safe dependency provider replacing pervasive static Singletons.
6. Scene Streaming Controller: Dynamic additive scene orchestration based on player bounding triggers.
7. Atomic Save/Load Pipeline: JSON serialization, schema versioning, corrupt-resistant atomic write & backup restoration.
8. Data-Driven Audio Director: Parameterized audio cue playback triggered via event channels.
9. Camera Orchestrator: Multi-zone framing, dead zones, forward-look dampening, dynamic trauma shake.
10. Metroidvania World Progression Registry: Global flags for unlocked gates, collected items, and revealed map tiles.
11. Object Pooling System: Reusable pools for projectiles, damage numbers, impact sparks, and dust particles.
12. Debug & Diagnostic Suite: On-screen telemetry, state machine timeline, hitbox visualizers, god mode toggles.`,
    detailsFa: `۱۲ سیستم بنیادین بازی:
۱. مدیریت حالت کلان بازی (Game Flow): مدیریت حالات منو، لودینگ، گیم‌پلی، کات‌سین، دیالوگ و پایان.
۲. گذرگاه رویداد (Event Channels): کانال‌های SO برای تفکیک کامل ارتباطات بین کامپوننت‌ها.
۳. ماشین وضعیت ماژولار (FSM): مدیریت وضعیت‌های پویا با قابلیت ساخت زیروضعیت‌های والد/فرزند.
۴. انجین مبارزه (Combat Engine): اینترفیس IDamageable، ساختار مستقل Hitbox و Hurtbox و محاسبه ناک‌بک.
۵. رجیستری سرویس‌ها (Service Locator): دسترسی ایمن به سرویس‌ها بدون استفاده از سینگلتون‌های سنتی.
۶. استریم ادتیو صحنه‌ها (Scene Streaming): لود و آنلود اتاق‌ها بدون فریز و بدون نیاز به لودینگ اسکرین.
۷. پایپ‌لاین ذخیره و بازیابی (Save/Load): ذخیره‌سازی اتمیک JSON با فایل پشتیبان و نسخه‌بندی دیتا.
۸. دایرکتور صوتی دیتا-محور: سیستم مدیریت موزیک‌های محیطی لایه‌ای و افکت‌های صوتی فضاساز.
۹. هدایت‌گر دوربین (Camera System): زوم‌های داینامیک، لیدینگ متناسب با سرعت پلیر و لرزش ترومایی.
۱۰. رجیستری پیشرفت مترویدوانیا: رهگیری توانایی‌های آزاد شده، باس‌های کشته شده و مه نقشه (Fog of War).
۱۱. سیستم Object Pooling: بازیافت پرتابه‌ها، پارتیکل‌ها و متن‌های خسارت برای جلوگیری از زباله‌روبی (GC).
۱۲. ابزار دیباگ و تلمتری: مشاهده وضعیت زنده FSM، هیت‌باکس‌ها، دکمه‌های ریست و تست سریع مکانیک‌ها.`
  },
  {
    id: "class-responsibilities",
    letter: "E",
    titleEn: "Class Responsibilities",
    titleFa: "مسئولیت تک‌تک کلاس‌های کلیدی",
    summaryEn: "Strict adherence to the Single Responsibility Principle (SRP) to eliminate bloated God classes.",
    summaryFa: "رعایت دقیق اصل تک‌مسئولیتی (SRP) جهت جلوگیری قطعی از کلاس‌های غول‌پیکر و کدهای غیرقابل نگهداری.",
    keyPoints: [
      {
        en: "PlayerRoot: Coordinates initialization, delegates inputs to active states, owns the StateMachine.",
        fa: "PlayerRoot: راه‌اندازی اولیه، انتقال ورودی‌ها به وضعیت‌های فعال و مدیریت چرخه عمر ماشین وضعیت."
      },
      {
        en: "PlayerMovement: Pure physics actuator applying impulses, acceleration curves, and ground checks.",
        fa: "PlayerMovement: مجری فیزیک حرکت، مسئول مستقیم اعمال شتاب، پرش متغیر و بررسی تماس با سطوح."
      },
      {
        en: "HealthComponent: Encapsulates damage calculations, invulnerability timers, and death event triggers.",
        fa: "HealthComponent: محاسبه دقیق آسیب‌های وارده، مدیریت زمان i-frame و اعلام رخداد مرگ."
      }
    ],
    detailsEn: `Detailed mapping of class responsibilities:
- StateMachine: Manages CurrentState, PreviousState, transitions, and calls Enter/Execute/PhysicsExecute/Exit.
- BaseState: Abstract base state with reference to entity coordinator and blackboard data.
- PlayerMovement: Reads movement data from MovementDataSO; executes velocity calculations in FixedUpdate; maintains coyote time and jump buffer counters.
- PlayerCombat: Listens to attack inputs, verifies cooldowns, enables specific hitbox colliders for calculated frame durations.
- Hitbox2D: Trigger collider that detects Hurtbox2D entities and transmits a DamageInfo payload.
- Hurtbox2D: Component implementing or proxying IDamageable; validates damage vulnerability flags.
- Checkpoint: Implements IInteractable; triggers SaveSystem and marks respawn coordinates via event channel.
- SceneLoader: Coroutine-driven additive scene manager handling transitions and persistent game objects.`,
    detailsFa: `تفکیک دقیق وظایف کلاس‌های اصلی:
- StateMachine: مدیریت وضعیت فعلی، وضعیت پیشین و چرخه Enter/Execute/PhysicsExecute/Exit.
- BaseState: کلاس پایه انتزاعی برای تمام حالت‌ها با دسترسی به دیتا و ریشه کاراکتر.
- PlayerMovement: خواندن پارامترها از MovementDataSO، اعمال محاسبات بردار سرعت در فیزیک و مدیریت تایمرهای کمکی مانند Coyote Time.
- PlayerCombat: مدیریت ورودی ضربات، زمان‌بندی کمبو، فعال‌سازی هیت‌باکس‌ها در فریم‌های تعیین‌شده.
- Hitbox2D: کلایدر تریگر که هنگام برخورد با Hurtbox2D، بسته DamageInfo را تحویل می‌دهد.
- Hurtbox2D: گیرنده ضربه که به IDamageable متصل است و بررسی مصونیت و گارد را انجام می‌دهد.
- Checkpoint: پیاده‌کننده IInteractable که ذخیره‌سازی بازی و نقطه باززایی را ثبت می‌کند.
- SceneLoader: اجرای سناریوی لودینگ ادتیو پس‌زمینه با ترنزیشن فید و ایمن‌سازی دیتای صحنه قبل از سوئیچ.`
  },
  {
    id: "dependency-map",
    letter: "F",
    titleEn: "Dependency Map & Coupling",
    titleFa: "نقشه وابستگی‌ها و کنترل کوپلینگ",
    summaryEn: "Strict unidirectional dependency rule: Higher layers depend on lower layers via abstractions, never circularly.",
    summaryFa: "قانون سخت‌گیرانه وابستگی یک‌طرفه: لایه‌های بالاتر به انتزاع‌های لایه پایین وصل می‌شوند و وابستگی چرخشی ممنوع است.",
    keyPoints: [
      {
        en: "Layer Hierarchy: Data/Interfaces (Bottom) -> Core Systems -> Gameplay Modules -> Scene/Presentation (Top).",
        fa: "سلسله‌مراتب لایه‌ای: دیتا و اینترفیس‌ها (کف) -> سیستم‌های اصلی -> ماژول‌های گیم‌پلی -> صحنه و نمایش (سقف)."
      },
      {
        en: "No Circular Dependencies: Player never directly references UI, UI only listens to Event Channels.",
        fa: "حذف وابستگی دایره‌ای: پلیر هرگز به UI رفرنس ندارد؛ رابط کاربری صرفاً شنونده Event Channelهاست."
      },
      {
        en: "Assembly Definitions (.asmdef): Unity project compiled into isolated assemblies to enforce modular compilation.",
        fa: "استفاده از Assembly Definitions: تقسیم کدها به اسمبلی‌های مجزا برای کامپایل سریع‌تر و اجبار به رعایت مرزها."
      }
    ],
    detailsEn: `Dependency Rules:
1. Core.Interfaces has zero dependencies on any gameplay code.
2. Core.Events depends only on UnityEngine.
3. Core.StateMachine depends only on Core.Interfaces.
4. Gameplay modules (Player, Enemies, Combat) depend on Core.Interfaces, Core.StateMachine, and Data.
5. Presentation (UI, VFX, Audio) depends on Core.Events to react, keeping gameplay logic completely unaware of presentation.
6. Circular references (e.g. Player referencing Enemy directly) are strictly forbidden; interaction happens via IDamageable or shared event channels.`,
    detailsFa: `قوانین مرزهای وابستگی:
۱. اسمبلی Core.Interfaces هیچگونه وابستگی به کدهای گیم‌پلی یا یونیتی بیرونی ندارد.
۲. اسمبلی Core.Events فقط به UnityEngine متصل است.
۳. لایه ماشین وضعیت تنها به اینترفیس‌های خود وابسته است.
۴. ماژول‌های گیم‌پلی به اینترفیس‌ها، ماشین وضعیت و دیتاها متصل هستند.
۵. لایه UI و صدا هرگز گیم‌پلی را فراخوانی نمی‌کنند؛ بلکه تنها شنونده رویدادهای ارسالی هستند.
۶. وابستگی‌های دوطرفه و چرخشی کاملاً ممنوع است و هرگونه کنش و واکنش میان موجودیت‌ها از طریق Interface صورت می‌گیرد.`
  },
  {
    id: "scene-architecture",
    letter: "G",
    titleEn: "Scene Architecture",
    titleFa: "معماری صحنه‌ها و استریمینگ",
    summaryEn: "Additive Scene Architecture: 1 Persistent Core Scene + N Additive Streamed Room Scenes.",
    summaryFa: "معماری صحنه‌های ادتیو: یک صحنه پایدار مرکزی (Persistent Core) به اضافه صحنه‌های استریم‌شونده برای هر زون.",
    keyPoints: [
      {
        en: "Scene_Bootstrap: Starts first, initializes ServiceLocator, loads PersistentManagers, then triggers first biome.",
        fa: "صحنه Bootstrap: آغازگر اولیه پروژه؛ لود سرویس‌ها و منیجرهای دائمی و سپس استریم منطقه اول بازی."
      },
      {
        en: "Scene_PersistentManagers: Contains AudioDirector, EventChannels, CameraRig, SaveManager, and UI HUD canvas.",
        fa: "صحنه PersistentManagers: حاوی منیجر صدا، رویدادها، دوربین سینماچین، سیستم ذخیره و HUD."
      },
      {
        en: "Additive Area Streaming: Triggers in doorways unload behind and load ahead, maintaining seamless 60+ FPS.",
        fa: "استریم پیوسته: تریگرهای ورودی درها، اتاق قبلی را آنلود و اتاق بعدی را لود می‌کنند بدون افت فریم."
      }
    ],
    detailsEn: `Scene Breakdown:
- Scene_00_Bootstrapper: Single entry point. Displays studio splash, checks save files, sets target framerate (60/120/144), and loads PersistentManagers additively before self-unloading.
- Scene_Persistent: Never unloaded. Houses global UI Canvas, Camera controller, Audio listener, Global Lighting volume, and Service Locator root.
- Biome Scenes (e.g., Biome_Arboretum_A01, Biome_Arboretum_A02, Biome_SunkenCatacombs_B01): Contain only tilemaps, localized props, enemies, room triggers, and dynamic lights.
- Transition Triggers: When the player steps into an airlock/gate corridor, the engine preloads the adjacent zone asynchronously and unloads distant zones to prevent memory ballooning.`,
    detailsFa: `تقسیم‌بندی سناریوی صحنه‌ها:
- صحنه Bootstrapper: نقطه شروع اولیه بازی؛ لود تنظیمات گرافیکی، بررسی فایل‌های سیو و لود صحنه پایدار.
- صحنه Persistent: هرگز در طول بازی Unload نمی‌شود. شامل دوربین اصلی، کانواس رابط کاربری، سیستم مدیریت صدا، و لایه‌های ثابت رندرینگ.
- صحنه‌های زون و اتاق (مانند جنگل نجواگر، دخمه غرق‌شده و...): تنها شامل هندسه تایل‌مپ، انمی‌های آن اتاق، المان‌های محیطی و تریگرها هستند.
- دروازه‌های ترنزیشن (Transition Gates): با ورود پلیر به راهروها یا مرزها، اتاق بعدی به شکل نامحسوس در پس‌زمینه لود شده و مناطق دوردست برای آزادسازی رم (RAM) پاکسازی می‌شوند.`
  },
  {
    id: "data-architecture",
    letter: "H",
    titleEn: "Data Architecture (ScriptableObjects)",
    titleFa: "معماری داده و اسکریپتبل آبجکت‌ها",
    summaryEn: "Total decoupling of tunable gameplay parameters from runtime C# logic using ScriptableObjects.",
    summaryFa: "جداسازی کامل مقادیر تنظیمی و بالانس بازی از کدهای منطقی با بهره‌گیری از ScriptableObject.",
    keyPoints: [
      {
        en: "Zero Magic Numbers: Jump curves, run speeds, attack frames, and damage multipliers live in SO assets.",
        fa: "حذف اعداد جادویی: تمامی سرعت‌ها، ارتفاع پرش، فریم‌های حمله و مقادیر دمیج در فایل‌های SO ذخیره می‌شوند."
      },
      {
        en: "Designer Independence: Designers can adjust game feel and balance live in the inspector without touching code.",
        fa: "استقلال دیزاینرها: امکان تغییر و تنظیم حس حرکتی و بالانس مبارزات در حین پلی‌تست بدون باز کردن کدها."
      },
      {
        en: "ScriptableObject Presets: PlayerMovementDataSO, CombatParametersSO, EnemyConfigSO, AudioCueSO.",
        fa: "پریزت‌های آماده: اسکریپتبل آبجکت‌های مخصوص فیزیک کاراکتر، مبارزه، پیکربندی دشمنان و صداها."
      }
    ],
    detailsEn: `ScriptableObject Schema Definitions:
1. MovementDataSO: Move speed, acceleration, air control percentage, jump height, time to apex, coyote time, jump buffer duration, wall slide speed, wall jump force vector.
2. CombatDataSO: Base damage, attack recovery duration, combo reset window, hit-stop duration (frames), screen-shake intensity.
3. HealthDataSO: Base health, max health, invulnerability duration following damage, flash interval frequency.
4. AbilityDataSO: Ability ID, display name, UI icon, unlock event channel, mana/energy cost, cooldown duration.
5. EnemyProfileSO: Base HP, vision cone radius, patrol speed, chase speed, aggro duration, attack range, dropped experience/relics.`,
    detailsFa: `فهرست اسکریپتبل آبجکت‌های پیکربندی:
۱. MovementDataSO: سرعت حرکت، شتاب، کنترل روی هوا، ارتفاع پرش، زمان رسیدن به اوج، زمان کایوتی، زمان بافر پرش، سرعت سرخوردن روی دیوار و بردار پرش دیواری.
۲. CombatDataSO: میزان پایه دمیج، زمان ریکاوری پس از ضربه، پنجره اجرای کمبو، زمان توقف ضربه (Hit-stop) و شدت تکان خوردن صفحه.
۳. HealthDataSO: جان پایه، حداکثر جان، مدت زمان فریم‌های مصونیت (i-frames) و فرکانس چشمک‌زدن کاراکتر.
۴. AbilityDataSO: شناسه توانایی، نام نمایشی، آیکون، هزینه، کانال رویداد فعال‌سازی و مدت زمان کول‌داون.
۵. EnemyProfileSO: میزان جان، زاویه و شعاع دید، سرعت گشت‌زنی، سرعت تعقیب، شعاع حمله و آیتم‌های رها شونده پس از نابودی.`
  },
  {
    id: "event-architecture",
    letter: "I",
    titleEn: "Event Architecture",
    titleFa: "معماری رویدادها (Event Channels)",
    summaryEn: "ScriptableObject Event Channels replacing leaky C# actions and heavy event managers.",
    summaryFa: "کانال‌های رویداد بر پایه ScriptableObject جایگزین اکشن‌های سنتی سی‌شارپ و رویدادهای مستعد نشت حافظه.",
    keyPoints: [
      {
        en: "Inspector-Visible Events: Broadcast channels exist as concrete assets in the Project view for clear tracking.",
        fa: "رویدادهای قابل مشاهده در اینسپکتور: کانال‌ها به صورت فایل Asset در پروژه وجود دارند و جریان اطلاعات مشخص است."
      },
      {
        en: "Zero NullReference on Scene Unload: Subscriptions managed via OnEnable/OnDisable cleanly unsubscribe.",
        fa: "جلوگیری از خطای NullReference: سابسکرایب و آن‌سابسکرایب در OnEnable و OnDisable انجام شده و حافظه آزاد می‌شود."
      },
      {
        en: "Core Channels: PlayerDamaged, PlayerDied, AbilityUnlocked, RoomChanged, GameSaved, BossDefeated.",
        fa: "کانال‌های اصلی: رویداد آسیب بازیکن، مرگ، باز شدن توانایی جدید، تغییر اتاق، ذخیره بازی، شکست باس."
      }
    ],
    detailsEn: `ScriptableObject Event Channel Pattern:
Instead of a singleton 'EventManager.Instance.TriggerEvent("PlayerDied")', entities hold a serialized reference to an asset:
\`[SerializeField] private VoidEventChannelSO _onPlayerDied;\`
Any interested system (HUD, SoundDirector, Analytics, Camera) subscribes to the channel in OnEnable and unsubscribes in OnDisable.
Benefits:
- Sender and receiver need zero knowledge of each other.
- Scenes can be loaded independently in the editor for testing without crashing due to missing manager singletons.
- You can trigger events directly in the Unity Inspector at runtime to test responses!`,
    detailsFa: `الگوی کانال رویداد بر پایه ScriptableObject:
به جای استفاده از سینگلتون شکننده EventManager.Instance، هر اسکریپت تنها فیلدی از نوع کانال SO را دریافت می‌کند:
[SerializeField] private VoidEventChannelSO _onPlayerDied;
هر سیستمی که به این اتفاق نیاز دارد (HUD، سیستم صدا، انیمیشن مرگ، دوربین) در OnEnable عضو شده و در OnDisable خارج می‌شود.
مزایای این رویکرد:
- ارسال‌کننده و دریافت‌کننده هیچ شناختی از یکدیگر ندارند.
- هر صحنه را می‌توان به شکل مجزا برای تست در ادیتور ران کرد بدون آنکه به دلیل نبودن منیجرها کرش کند.
- امکان شبیه‌سازی و بالا بردن رویدادها (Trigger Event) مستقیماً از داخل Inspector در حین اجرای بازی برای دیباگ سریع.`
  },
  {
    id: "save-architecture",
    letter: "J",
    titleEn: "Save & Persistence Architecture",
    titleFa: "معماری ذخیره‌سازی و تداوم داده‌ها",
    summaryEn: "Robust atomic serialization with JSON, schema version migration, and corrupt-proof backup files.",
    summaryFa: "سیستم ذخیره‌سازی اتمیک با فرمت JSON، قابلیت ارتقاء نسخه (Migration) و حفاظت در برابر خرابی با فایل بک‌آپ.",
    keyPoints: [
      {
        en: "Atomic Writes (.tmp -> .sav): Files written to temporary buffer first; power loss never corrupts active save.",
        fa: "نوشتن اتمیک فایل: داده ابتدا در فایل موقت ذخیره شده و پس از اعتبارسنجی جایگزین می‌شود تا قطعی برق سیو را تخریب نکند."
      },
      {
        en: "Automated Backup (.bak): Previous valid save retained as failover if primary file suffers bit-rot or crash.",
        fa: "فایل پشتیبان خودکار (.bak): نگهداری نسخه سالم قبلی تا در صورت بروز هر خطایی، پیشرفت کاربر بازیابی شود."
      },
      {
        en: "Save Data Versioning: 'SaveVersion' integer enables backward-compatible migrations when game updates launch.",
        fa: "نسخه‌بندی فایل سیو: وجود فیلد SaveVersion امکان پشتیبانی از سیوهای قدیمی در نسخه‌های بعدی بازی را تضمین می‌کند."
      }
    ],
    detailsEn: `Save System Data Model:
- Header: SaveVersion, ProfileID, Timestamp, TotalPlaytimeSeconds.
- Character State: MaxHealth, CurrentHealth, Position, SceneIndex, CheckpointID.
- Progression Flags: List<string> UnlockedAbilities (e.g. "DoubleJump", "AirDash", "SpectralGrip").
- World State: VisitedRooms, OpenedDoors, ActivatedLevers, DefeatedBosses, CollectedRelics.
- ISaveable Contract:
  Any object in the world needing persistence implements ISaveable:
  \`string UniqueID { get; }\`
  \`object CaptureState();\`
  \`void RestoreState(object state);\`
  The SaveManager collects states upon checkpoint interaction and saves to disk on a background thread.`,
    detailsFa: `مدل داده سیستم ذخیره‌سازی:
- مشخصات فایل: نسخه سیو (SaveVersion)، شناسه پروفایل، تاریخ ذخیره و زمان بازی انجام شده.
- وضعیت کاراکتر: حداکثر جان، جان فعلی، موقعیت آخرین چک‌پوینت و نام صحنه مربوطه.
- پرچم‌های پیشرفت: لیست قابلیت‌های آزاد شده، درهای میانبر باز شده، باس‌های کشته شده و یادگارها.
- قرارداد ISaveable:
  هر شیء در محیط که وضعیت آن ماندگار است (صندوق‌ها، اهرم‌ها، پلتفرم‌های شکسته) اینترفیس ISaveable را پیاده‌سازی می‌کند تا به طور خودکار دیتای آن خوانده و بازگردانی شود.`
  },
  {
    id: "git-strategy",
    letter: "K",
    titleEn: "Git & Version Control Strategy",
    titleFa: "استراتژی گیت و مدیریت نسخه‌ها",
    summaryEn: "Clean trunk-based development with semantic commits and Git LFS configuration for Unity binaries.",
    summaryFa: "توسعه مبتنی بر شاخه‌های تمیز با استاندارد کامیت‌های معنادار (Conventional Commits) و مدیریت فایل‌های سنگین با Git LFS.",
    keyPoints: [
      {
        en: "Conventional Commits: feat(scope): message, fix(scope): message, refactor(scope): message.",
        fa: "استاندارد کامیت‌ها: تفکیک بر اساس نوع تغییر (feat, fix, refactor, perf, docs) و محدوده تغییرات."
      },
      {
        en: "Git LFS Rules: *.psd, *.png, *.wav, *.ogg, *.fbx, *.blend tracked via Git Large File Storage.",
        fa: "قوانین Git LFS: فایل‌های باینری سنگین صوتی و تصویری از طریق LFS رهگیری می‌شوند تا ریپازیتوری سبک بماند."
      },
      {
        en: "Unity YAML Merge Tool: Resolves scene and prefab merge conflicts deterministically.",
        fa: "ابزار Unity YAML Merge: ادغام هوشمندانه کانفلیکت‌های احتمالی در فایل‌های Scene و Prefab."
      }
    ],
    detailsEn: `Git Configuration Guidelines:
1. .gitignore: Excludes [Library/, Temp/, Obj/, Build/, Builds/, Logs/, UserSettings/].
2. Git LFS: Configured in .gitattributes for binary art and sound formats to keep repo download sizes minimal.
3. Branching Model:
   - main: Production-ready releases and playable milestone builds.
   - dev: Integration branch for completed phases.
   - phase/{phase_number}-{phase_name}: Isolated feature development (e.g. phase/01-player-movement).
4. Merge Policy: Pull requests with compile validation and zero regression before merging into dev.`,
    detailsFa: `اصول مدیریت نسخه:
۱. فایل .gitignore استاندارد یونیتی: حذف کامل فولدرهای موقت و کش یونیتی (Library, Temp, UserSettings).
۲. فعال‌سازی Git LFS در فایل .gitattributes برای اسپرایت‌ها، صداها و تکسچرها تا حجم ریپازیتوری همواره چابک بماند.
۳. استراتژی شاخه‌ها: شاخه main برای بیلد نهایی، شاخه dev برای فازهای تکمیل شده، و برنچ‌های اختصاصی برای هر فاز (مانند phase/01-movement).
۴. سیاست ادغام: هر فاز پس از پاس کردن تمامی تست‌ها و بدون هیچ خطای کامپایل به شاخه اصلی ادغام می‌شود.`
  },
  {
    id: "roadmap",
    letter: "L",
    titleEn: "Development Roadmap (Phases 1–22)",
    titleFa: "نقشه راه توسعه (فاز ۱ تا فاز ۲۲)",
    summaryEn: "Chronological milestone pipeline building logically from foundation to final polished commercial release.",
    summaryFa: "پایپ‌لاین زمان‌بندی شده و منطقی پروژه از پایه‌های فیزیک تا ساخت برشی عمودی (Vertical Slice) و بیلد نهایی.",
    keyPoints: [
      {
        en: "Phase 1 to 5: Core gameplay loop (Movement, Abilities, Camera, Combat, Enemy AI).",
        fa: "فاز ۱ تا ۵: حلقه اصلی گیم‌پلی (حرکت، قابلیت‌ها، دوربین، مبارزات و هوش مصنوعی دشمنان)."
      },
      {
        en: "Phase 6 to 10: Metroidvania progression (World, Map, Abilities, Bosses, Puzzles).",
        fa: "فاز ۶ تا ۱۰: ساختار مترویدوانیا (بایوم‌ها، نقشه، سیستم پیشرفت، باس‌فایت‌ها و پازل‌ها)."
      },
      {
        en: "Phase 11 to 22: Polish, Audio, Art, Vertical Slice, Optimization, QA, and Gold Master.",
        fa: "فاز ۱۱ تا ۲۲: صداگذاری، جلوه‌های بصری، برش عمودی باکیفیت، بهینه‌سازی فنی و انتشار نسخه تجاری."
      }
    ],
    detailsEn: `Complete Phase Sequence:
- Phase 0: Architecture & Foundation (Current Phase)
- Phase 1: Player Core Movement (Run, Jump, Fall, Ground Detection, Coyote Time, Jump Buffer)
- Phase 2: Advanced Movement & Abilities (Wall Slide, Wall Jump, Dash, Double Jump, Glide)
- Phase 3: Camera System (Cinemachine 2D, Deadzones, Lookahead, Target Framing, Screen Shake)
- Phase 4: Combat Engine (Hitboxes, Hurtboxes, Damage Calculation, Knockback, Hitstop, Invulnerability)
- Phase 5: Enemy Framework & AI (Sensors, Patrol, Chase, Attack, Hit Reaction, FSM States)
- Phase 6: World & Biomes (Tilemap architecture, Palettes, Hazards, Parallax Backgrounds)
- Phase 7: Metroidvania Map (Room tracking, Fog of War, Map UI, Icons, Shortcuts)
- Phase 8: Ability Progression & Gating (Unlock statues, Ability gates, Progression logic)
- Phase 9: Boss Framework (Phase transitions, Arena confinement, Telegraphs, Boss Health UI)
- Phase 10: Environment Interactions & Puzzles (Levers, Breakable walls, Moving platforms, Keys)
- Phase 11: Save & Load System (Checkpoint integration, Persistence, Profile management)
- Phase 12: UI / UX (HUD, Pause Menu, Inventory, Settings, Controller remapping)
- Phase 13: Narrative & Dialogue (Dialogue boxes, Lore stones, NPC interactions)
- Phase 14: Art Direction & Visual Aesthetics (Original atmospheric concepting, Palettes)
- Phase 15: Animation Pipeline (Sprite animations, Squash & Stretch, Transition graphs)
- Phase 16: VFX (Particle systems, Slash trails, Impact bursts, Dissolve shaders)
- Phase 17: Audio & Soundscapes (Dynamic interactive music layers, Sound banks, Footsteps)
- Phase 18: Vertical Slice (15–20 minutes polished cohesive experience in First Biome)
- Phase 19: Polish (Game feel, Micro-interactions, Camera juice, Particle timing)
- Phase 20: Optimization (Draw calls, Texture atlasing, Memory profiling, GC minimization)
- Phase 21: QA & Regression Testing (Stress tests, Boundary tests, Automated validation)
- Phase 22: Final Build & Distribution (PC release packaging, Localization verification)`,
    detailsFa: `فازبندی کامل ۲۳ مرحله‌ای پروژه به صورت گام‌به‌گام و بدون بازنویسی (No Rewrite): هر فاز بر روی پایه‌های استوار فاز پیشین ساخته شده و در فاز ۱۸ یک برش عمودی (Vertical Slice) کامل ارائه می‌شود.`
  },
  {
    id: "risks",
    letter: "M",
    titleEn: "Technical Risks & Mitigation",
    titleFa: "ریسک‌های فنی و استراتژی مهار آنها",
    summaryEn: "Proactive identification of physics drift, memory fragmentation, save corruption, and scope inflation.",
    summaryFa: "شناسایی زودهنگام ریسک‌های عدم قطعی فیزیک، زباله‌روبی مکرر، نشت حافظه و از دست رفتن داده‌ها.",
    keyPoints: [
      {
        en: "Physics Inconsistency: Mitigated by executing all movement equations in FixedUpdate with fixed delta time.",
        fa: "ناهماهنگی فیزیک: مهار با اجرای تمام معادلات حرکتی در FixedUpdate با گام‌های زمانی کاملاً ثابت."
      },
      {
        en: "GC Allocations & Stutter: Mitigated by zero LINQ/string allocations in hot gameplay update loops and object pooling.",
        fa: "افت فریم ناشی از GC: مهار با حذف کامل استفاده از LINQ یا تخصیص حافظه در توابع Update و استفاده از Object Pooling."
      },
      {
        en: "Sequence Breaks: Mitigated by designing robust ability gate validation in World Architecture.",
        fa: "شکست نامطلوب توالی مراحل (Sequence Break): مهار با آزمون دقیق ارتفاع موانع و گیت‌های فیزیکی در لول دیزاین."
      }
    ],
    detailsEn: `Risk Matrix & Countermeasures:
1. Physics Snappiness vs Unity Rigidbody2D:
   - Risk: Default Rigidbody2D forces feel 'floaty' or inconsistent across different refresh rates.
   - Mitigation: Custom kinematic velocity calculation using deterministic kinematic physics simulation with custom raycasts or manual velocity overrides inside FixedUpdate.
2. Scene Loading Frame Drops:
   - Risk: Hitches when loading new rooms.
   - Mitigation: Additive async scene loading combined with gateway corridors that visually hide preloading.
3. Save Data Corruption:
   - Risk: Player closes game during write.
   - Mitigation: Atomic temp-file swap (.tmp to .sav) plus backup file preservation (.bak).
4. Memory Leaks from C# Events:
   - Risk: Objects destroyed without unsubscribing from C# delegates remain rooted in memory.
   - Mitigation: ScriptableObject Event Channels with automated subscription unbinding in OnDisable.`,
    detailsFa: `ماتریس ریسک و راهکارهای خنثی‌سازی:
۱. شناور بودن فیزیک دیفالت یونیتی:
   - خطر: اعمال نیروهای پیش‌فرض فیزیک ممکن است حس شناور و غیردقیق بدهد.
   - راهکار: استفاده از محاسبات مستقیم بردار سرعت (Velocity Integration) درون FixedUpdate و استفاده از Raycastهای دقیق برای لبه‌ها و زمین.
۲. افت فریم در زمان ورود به اتاق جدید:
   - خطر: لگ و وقفه در هنگام بارگذاری داده‌ها.
   - راهکار: لودینگ ادتیو پس‌زمینه (Async) و طراحی راهروهای ارتباطی (Transition Airlocks).
۳. خرابی فایل‌های سیو:
   - خطر: قطع بازی در حین نوشتن روی دیسک.
   - راهکار: ایجاد فایل موقت و تعویض اتمیک، همراه با حفظ فایل بک‌آپ نسخه قبلی.
۴. نشت حافظه ناشی از Eventها:
   - خطر: فراموشی لغو عضویت اکشن‌ها و باقی ماندن آبجکت‌ها در رم.
   - راهکار: استفاده از Event Channels بر پایه SO با اطمینان از خروج در OnDisable.`
  },
  {
    id: "definition-of-done",
    letter: "N",
    titleEn: "Definition of Done (Phase 0)",
    titleFa: "معیار پذیرش و پایان فاز صفر (DoD)",
    summaryEn: "Clear, verifiable verification criteria determining successful completion of Phase 0.",
    summaryFa: "معیارهای شفاف و قابل راستی‌آزمایی برای اعلام رسمی تکمیل موفقیت‌آمیز فاز صفر.",
    keyPoints: [
      {
        en: "Architectural blueprint fully documented and aligned with no unaddressed dependencies.",
        fa: "مستندات معماری به طور جامع و منطبق بر تمام الزامات مهندسی تدوین شده باشد."
      },
      {
        en: "Core foundation scripts (Interfaces, FSM, EventChannels, Save, ServiceLocator) written and error-free.",
        fa: "اسکریپت‌های زیربنایی (اینترفیس‌ها، ماشین وضعیت، کانال رویداد، سیو و سرویس لوکیتور) بدون باگ و آماده باشند."
      },
      {
        en: "Zero premature gameplay implementations created (no unguided player or enemy scripts).",
        fa: "هیچ لاجیک زودهنگامی برای گیم‌پلی (مانند حرکت پلیر یا هوش مصنوعی) بدون ورود به فازهای مربوطه نوشته نشده باشد."
      }
    ],
    detailsEn: `Phase 0 Acceptance Checklist:
[x] Current project baseline analyzed and validated.
[x] Complete folder structure designed and standardized.
[x] Core systems delineated with zero circular coupling.
[x] Class responsibilities documented under Single Responsibility Principle.
[x] Dependency map and Assembly Definition layout established.
[x] Additive scene streaming architecture planned.
[x] Data architecture and ScriptableObject schemas formulated.
[x] Event channel architecture established for decoupled messaging.
[x] Atomic versioned save system designed with backup redundancy.
[x] Git version control conventions and LFS strategy codified.
[x] 22-phase development roadmap outlined with dependencies.
[x] Technical risks and mitigations identified.
[x] Foundation C# source code ready for import into Unity project.`,
    detailsFa: `چک‌لیست نهایی پذیرش فاز صفر:
[x] وضعیت فعلی پروژه تحلیل و تأیید شد.
[x] ساختار کامل پوشه‌بندی تجاری استانداردسازی شد.
[x] سیستم‌های اصلی با حذف کامل کوپلینگ چرخشی مشخص شدند.
[x] مسئولیت تک‌تک کلاس‌ها طبق اصل SRP مستند شد.
[x] نقشه وابستگی‌ها و چارچوب Assembly Definition تبیین گردید.
[x] معماری استریم ادتیو صحنه‌ها طراحی شد.
[x] معماری داده و ساختار ScriptableObjectها فرمول‌بندی شد.
[x] کانال‌های رویداد جهت تبادل پیام بدون رفرنس مستقیم ایجاد شد.
[x] سیستم ذخیره‌سازی اتمیک، نسخه‌بندی‌شده و ضد تخریب طراحی شد.
[x] استراتژی گیت، کامیت‌ها و Git LFS تدوین گردید.
[x] نقشه راه ۲۲ فاز آینده همراه با توالی منطقی ثبت شد.
[x] ریسک‌های فنی و راه‌حل‌های مهار آنها شناسایی شد.
[x] کدهای پایه سی‌شارپ فاز صفر آماده بهره‌برداری در یونیتی ارائه گردید.`
  }
];
