# Aethelgard — 2D Original Metroidvania Game (Unity C# Architecture)
### بازی دو بعدی اصیل در سبک مترویدوانیا — معماری پیشرفته یونیتی و سی‌شارپ

[![Unity Version](https://img.shields.io/badge/Unity-2022.3%20LTS%20%7C%206000%2B-blue.svg)](https://unity.com/)
[![Render Pipeline](https://img.shields.io/badge/Render%20Pipeline-URP%202D-success.svg)](https://unity.com/srp/Universal-Render-Pipeline)
[![Language](https://img.shields.io/badge/Language-C%23%209.0%2B-purple.svg)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20%26%20Data--Driven-orange.svg)]()
[![Status](https://img.shields.io/badge/Phase%200-Completed-emerald.svg)]()

---

## 🇬🇧 English Documentation

### Project Overview
**Aethelgard** is an original 2D Action Platformer & Metroidvania video game engineered with enterprise-grade architecture in Unity and C#. Drawing experiential inspiration from fluid atmospheric titles while maintaining **100% original intellectual property (IP), characters, lore, world design, mechanics, and assets**.

### Architectural Principles
1. **Phase-Based Incremental Development (Phases 0–22):** Systems are built sequentially without rewriting previous functional layers.
2. **Zero Monolithic Classes:** Completely rejects bloated `PlayerController` scripts in favor of single-responsibility modular components (`PlayerMovement`, `PlayerCombat`, `PlayerHealth`, `PlayerAbilityCoordinator`) coordinated by a clean `PlayerRoot`.
3. **Decoupled Event Channels (ScriptableObjects):** Systems broadcast and listen to events via ScriptableObject assets instead of tight C# delegates, eliminating memory leaks upon scene unloading.
4. **Data-Driven Configuration:** Physics parameters, jump heights, coyote times, combat timings, and enemy stats reside purely in ScriptableObjects (`MovementDataSO`, `CombatDataSO`, `EnemyStatsSO`), enabling game designers to tune feel in real time without touching code.
5. **Additive Scene Streaming:** Seamless room-by-room streaming (`SceneLoader`) with a persistent manager scene (`Scene_PersistentManagers`) keeping HUD, audio, camera, and state alive without loading screens.
6. **Corrupt-Resistant Atomic Save System:** Two-stage disk writing (`.tmp` to `.sav`) paired with automatic backup recovery (`.bak`) and schema version migration (`SaveVersion`).

### Directory Layout (`Assets/_Game/`)
```
Assets/
├── _Game/
│   ├── Core/
│   │   ├── Managers/              # ServiceLocator, GameFlowManager
│   │   ├── Events/                # VoidEventChannelSO, GenericEventChannelSO
│   │   ├── StateMachine/          # IState, StateMachine, BaseState
│   │   ├── Interfaces/            # IDamageable, IInteractable, ISaveable, IAbility
│   │   └── Utilities/             # MathExtensions, PhysicsProbes, FrameTimer
│   ├── Gameplay/
│   │   ├── Player/                # PlayerRoot, PlayerMovement, PlayerSensors
│   │   ├── Enemies/               # EnemyRoot, BaseEnemy, EnemySensors
│   │   ├── Combat/                # Hitbox2D, Hurtbox2D, DamageInfo, KnockbackReceiver
│   │   ├── Abilities/             # BaseAbility, DashAbility, DoubleJumpAbility
│   │   ├── Bosses/                # BossPhaseController, BossArenaTrigger
│   │   └── Interactions/          # CheckpointObject, LoreStone, DoorMechanism
│   ├── World/
│   │   ├── Areas/                 # RoomBounds, TransitionCurtain
│   │   ├── Biomes/                # BiomeProfiles, Hazards2D
│   │   ├── Checkpoints/           # CheckpointManager, RespawnAnchor
│   │   └── WorldMap/              # MapFogGrid, RoomDataNode
│   ├── Systems/
│   │   ├── Save/                  # SaveSystem, GameSaveData, SaveSlotHandler
│   │   ├── Audio/                 # AudioDirector, AudioEmitter2D, SoundBankSO
│   │   ├── Camera/                # CameraZoneConfiner, ShakeManager
│   │   ├── UI/                    # HUDController, PauseMenu, RemapOverlay
│   │   └── SceneManagement/       # SceneLoader, GatewayTrigger
│   ├── Data/
│   │   ├── Player/                # MovementDataSO, CombatParametersSO
│   │   ├── Enemies/               # EnemyStatsSO, PatrolRouteConfigSO
│   │   ├── Abilities/             # AbilityConfigSO
│   │   └── Audio/                 # AudioCueSO, SoundPresetSO
│   ├── Art/                       # Sprites, Materials, Shaders, Tilesets
│   ├── Audio/                     # Music, Ambience, SFX
│   ├── Prefabs/                   # Player, Enemies, Props, Hazards
│   └── Scenes/                    # Bootstrapper, PersistentManagers, Biomes
└── ThirdParty/
```

### Core Contracts (Phase 0 Foundation)
- `IDamageable`: Universal interface for entities receiving damage, knockback, and hit-stop.
- `IInteractable`: Universal interface for world props, checkpoints, and NPC dialogues.
- `ISaveable`: Contract enabling automatic state capture and restoration for persistent objects.
- `IState` & `StateMachine`: Decoupled finite state machine for deterministic entity logic.
- `VoidEventChannelSO` & `GenericEventChannelSO<T>`: ScriptableObject broadcast channels.
- `MovementDataSO`: Designer-friendly tuning asset containing jump curves and assist windows.
- `ServiceLocator`: Decoupled service registry replacing static singletons.

---

## 🇮🇷 مستندات فارسی (راهنمای جامع فارسی)

### معرفی پروژه
**اثل‌گارد (Aethelgard)** یک بازی دوبعدی اصیل در سبک اکشن پلتفرمر و مترویدوانیا (2D Metroidvania + Action Platformer) است که با برترین استانداردهای مهندسی نرم‌افزار در موتور یونیتی و زبان C# طراحی شده است. این اثر با الهام از اتمسفر گیرا، فیزیک سیال و حس اکتشاف بدون کپی‌برداری، دارای **داستان، شخصیت‌ها، جهان، مکانیک‌ها و جلوه‌های بصری ۱۰۰٪ اورجینال** است.

### اصول اساسی معماری
۱. **توسعه مرحله‌به‌مرحله و قانون عدم بازنویسی (No Rewrite):** توسعه در ۲۳ فاز مشخص (فاز ۰ تا ۲۲) پیش می‌رود و سیستم‌های هر فاز بر روی لایه‌های پایدار قبلی ساخته می‌شوند.
۲. **حذف مونوپولی‌ها (Monolithic God Classes):** جلوگیری از فایل‌های حجیم نظیر `PlayerController`؛ تفکیک به کامپوننت‌های تک‌مسئولیتی (`PlayerMovement`، `PlayerCombat`، `PlayerHealth`، `PlayerAbilityCoordinator`) به همراه یک هماهنگ‌کننده ریشه (`PlayerRoot`).
۳. **کانال‌های رویداد ScriptableObject:** ارتباط میان بخش‌های مستقل از طریق دارایی‌های SO برقرار شده و از نشت حافظه (Memory Leak) به هنگام تخلیه صحنه‌ها جلوگیری می‌شود.
۴. **معماری مبتنی بر داده (Data-Driven):** تمامی مقادیر تنظیمی نظیر سرعت، ارتفاع پرش، پنجره‌های زمانی کایوتی (Coyote Time) و بافر ورودی درون اسکریپتبل آبجکت‌ها نگهداری می‌شوند تا طراح بازی بدون نیاز به تغییر کدها، حس بازی را بالانس کند.
۵. **استریم ادتیو صحنه‌ها (Additive Scene Streaming):** بارگذاری نامحسوس اتاق‌های نقشه در پس‌زمینه بدون ایجاد صفحات لودینگ اسکرین.
۶. **سیستم ذخیره‌سازی اتمیک و مقاوم در برابر خرابی:** ذخیره دو مرحله‌ای (`.tmp` سپس `.sav`) به همراه فایل پشتیبان خودکار (`.bak`) و نسخه‌بندی دیتا (`SaveVersion`).

### ساختار فازهای توسعه (Roadmap)
- **فاز ۰:** معماری و پایه‌ریزی زیرساخت (تکمیل شده)
- **فاز ۱:** حرکت پایه بازیکن (Movement, Gravity & Jump Curves)
- **فاز ۲:** حرکات پیشرفته (Wall Jump, Wall Slide, Dash, Double Jump, Glide)
- **فاز ۳:** سیستم دوربین سینماچین (Lookahead, Deadzones, Trauma Shake)
- **فاز ۴:** موتور مبارزات (Hitbox, Hurtbox, Knockback, Hit-stop)
- **فاز ۵:** فریم‌ورک دشمنان و هوش مصنوعی (Patrol, Chase, Attack FSM)
- **فاز ۶:** جهان و بایوم‌های مترویدوانیا (Tilemaps, Parallax, Hazards)
- **فاز ۷:** نقشه محیطی و مه نقشه (Fog of War, Map Grid)
- **فاز ۸:** گیت‌های پیشرفت و توانایی‌ها (Progression Gating)
- **فاز ۹:** فریم‌ورک باس‌ها (Boss Phases, Arena Lockdown)
- **فاز ۱۰:** پازل‌ها و تعاملات محیطی (Levers, Breakable Walls)
- **فاز ۱۱:** یکپارچه‌سازی سیستم ذخیره و چک‌پوینت‌ها (Checkpoints, Profiles)
- **فاز ۱۲:** رابط کاربری و HUD اتمسفریک (UI/UX, Menus)
- **فاز ۱۳:** روایت داستان و دیالوگ‌ها (Lore Tablets, Dialogue Trees)
- **فاز ۱۴:** کارگردانی هنری و شیدرهای ۲ بعدی (URP 2D Shaders)
- **فاز ۱۵:** پایپ‌لاین انیمیشن و پاسخگویی بصری (Squash & Stretch)
- **فاز ۱۶:** جلوه‌های بصری و ذرات (VFX & Particle Pools)
- **فاز ۱۷:** طراحی صدا و موسیقی تطبیقی (Dynamic Music Stems, SFX)
- **فاز ۱۸:** برش عمودی (Vertical Slice — 15-20 Min Polished Gameplay)
- **فاز ۱۹:** صیقل نهایی و حس بازی (Game Feel & Juice)
- **فاز ۲۰:** بهینه‌سازی فنی و پروفایلینگ (Draw Calls, GC Minimization)
- **فاز ۲۱:** کنترل کیفی و تست‌های رگرسیون (QA & Boundary Tests)
- **فاز ۲۲:** بیلد نهایی و انتشار (Gold Master & Distribution)

---

## 🚀 نحوه استفاده در پروژه یونیتی (How to Use in Unity)
۱. بسته پروژه را دانلود کرده یا محتویات فولدر `Assets/_Game` را درون پوشه `Assets` پروژه یونیتی خود کپی کنید.
۲. از نصب پکیج‌های الزامی در Package Manager مطمئن شوید:
   - Universal RP (URP)
   - New Input System
   - 2D Tilemap Extras
   - Cinemachine
۳. دارایی‌های تنظیمی خود را با کلیک راست در پنجره Project بسازید:
   `Right Click -> Create -> Aethelgard -> Data -> Player Movement Data`

---

## 📜 License
MIT License / Proprietary Indie Game Architecture. All rights reserved.
