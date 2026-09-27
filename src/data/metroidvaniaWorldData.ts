export interface BiomeInfo {
  id: string;
  nameEn: string;
  nameFa: string;
  themeEn: string;
  themeFa: string;
  accentColor: string;
  descriptionEn: string;
  descriptionFa: string;
  abilityGatedBy: string;
  keyRooms: number;
  hazards: string[];
}

export const ORIGINAL_BIOMES: BiomeInfo[] = [
  {
    id: "arboretum",
    nameEn: "The Whispering Arboretum",
    nameFa: "باغ گیاه‌شناسی نجوای کهن",
    themeEn: "Ancient Overgrown Conservatory & Luminous Flora",
    themeFa: "گلخانه عظیم کهن با گیاهان درخشان شب‌تاب و ریشه‌های غول‌آسا",
    accentColor: "#10b981", // Emerald
    descriptionEn: "The opening canopy filled with suspended bridges, bioluminescent moss, and crumbling crystal domes. Serves as the introductory movement tutorial biome.",
    descriptionFa: "منطقه آغازین بازی متشکل از پل‌های معلق چوبی، خزه‌های درخشان و گنبدهای شیشه‌ای فروریخته. محل یادگیری مکانیک‌های پایه‌ای حرکت.",
    abilityGatedBy: "None (Starting Hub)",
    keyRooms: 8,
    hazards: ["Briar Thorns", "Decaying Platforms", "Spore Spouts"]
  },
  {
    id: "catacombs",
    nameEn: "Sunken Catacombs",
    nameFa: "دخمه‌های غرق‌شده در مه",
    themeEn: "Subterranean Aqueducts & Water Gates",
    themeFa: "آب‌انبارهای باستانی زیرزمینی با دروازه‌های سنگی و آبشارها",
    accentColor: "#06b6d4", // Cyan
    descriptionEn: "Damp tunnels beneath the sanctuary with shifting water levels. Requires Wall Cling & Wall Jump to navigate the vertical drainage shafts.",
    descriptionFa: "کانال‌های مرطوب و راه‌آب‌های کهن با سطح آب متغیر. برای صعود از شفت‌های عمودی آن نیاز به مهارت بالا رفتن از دیوار است.",
    abilityGatedBy: "Wall Cling & Wall Jump",
    keyRooms: 12,
    hazards: ["Acidic Water Pools", "Dropping Stalactites", "Submerged Currents"]
  },
  {
    id: "spire",
    nameEn: "Crystalline Spire",
    nameFa: "برج مراقبت کریستالی",
    themeEn: "Fractured Prisms & Shimmering Vertical Ledges",
    themeFa: "سازه‌های بلورین درخشان، شکست نور و پرتگاه‌های بادخیز",
    accentColor: "#8b5cf6", // Violet
    descriptionEn: "Towering crystal formations emitting ethereal resonance. Strong upward air currents and wide ravines that demand the Spectral Dash ability.",
    descriptionFa: "صخره‌های کریستالی عظیم که طنین جادویی دارند. شیارهای پهن و جریان‌های شدید باد نیازمند توانایی جهش روحی (Spectral Dash) هستند.",
    abilityGatedBy: "Spectral Dash",
    keyRooms: 14,
    hazards: ["Shattering Prisms", "High Altitude Gale", "Laser Beam Focusing"]
  },
  {
    id: "hollows",
    nameEn: "Eclipse Hollow",
    nameFa: "شکاف تاریک خورشیدگرفتگی",
    themeEn: "Bioluminescent Abyss & Echoing Caverns",
    themeFa: "غارهای تاریک با نورهای ارگانیک کم‌سو و جانوران سایه‌روشن",
    accentColor: "#f59e0b", // Amber
    descriptionEn: "Deep underground hollow where light scarcely penetrates. Relies on player-generated light orbs and unlocks the Double Jump / Feather Ascension.",
    descriptionFa: "اعماق تاریک زیرین که نور به آن نمی‌رسد. متکی بر گوی‌های نورانی همراه پلیر، محل دریافت توانایی پرش مضاعف.",
    abilityGatedBy: "Light Tether & Double Jump",
    keyRooms: 15,
    hazards: ["Deep Shadow Darkness", "Spike Pits", "Shadow Stalker Prowlers"]
  },
  {
    id: "sanctuary",
    nameEn: "Astral Sanctuary",
    nameFa: "معبد ستارگان ابدی",
    themeEn: "Floating Celestial Architecture & Anti-Gravity Vaults",
    themeFa: "معابد شناور در میان ابرها و طاق‌های معلق جاذبه متغیر",
    accentColor: "#ec4899", // Pink
    descriptionEn: "The endgame climax area high in the stratosphere. Intricate spatial puzzles, zero-gravity pockets, and final boss arena gate.",
    descriptionFa: "قله آسمانی و نقطه اوج پایانی بازی. ترکیبی از پازل‌های فضایی پیچیده، جاذبه معلق و درگاه نبرد نهایی.",
    abilityGatedBy: "Aether Glide & Master Crest",
    keyRooms: 10,
    hazards: ["Void Disintegration", "Gravity Flip Fields", "Celestial Sentry Orbs"]
  }
];

export interface AbilityGatingRule {
  abilityNameEn: string;
  abilityNameFa: string;
  biomeUnlockedIn: string;
  gatesOpenedEn: string;
  gatesOpenedFa: string;
  mechanicTuning: string;
}

export const ABILITY_GATING_MATRIX: AbilityGatingRule[] = [
  {
    abilityNameEn: "Ground & Air Dash (Spectral Dash)",
    abilityNameFa: "دش زمینی و هوایی (جهش روحی)",
    biomeUnlockedIn: "The Whispering Arboretum (Mid-Point)",
    gatesOpenedEn: "Passes through shimmering spectral gates & crosses 6-unit horizontal chasms",
    gatesOpenedFa: "عبور از دروازه‌های جادویی فرکانسی و عبور از دره‌های افقی عریض ۶ واحدی",
    mechanicTuning: "Distance: 5.5 units, Duration: 0.18s, Invulnerability: First 12 frames, Cooldown: 0.7s (Resets on ground or wall)"
  },
  {
    abilityNameEn: "Wall Cling & Wall Jump",
    abilityNameFa: "چسبیدن و پرش دیواری",
    biomeUnlockedIn: "Sunken Catacombs (Depths)",
    gatesOpenedEn: "Ascends narrow vertical chimneys and slippery moss chutes to reach higher biomes",
    gatesOpenedFa: "صعود از شفت‌های باریک عمودی و دسترسی به بخش‌های بالادست نقشه",
    mechanicTuning: "Slide terminal speed: 2.8 units/s, Wall push impulse: (11.0, 13.5), Wall stick buffer: 0.12s"
  },
  {
    abilityNameEn: "Double Jump (Ascendant Leap)",
    abilityNameFa: "پرش مضاعف (جهش صعودی)",
    biomeUnlockedIn: "Eclipse Hollow (Heart)",
    gatesOpenedEn: "Reaches elevated 6-meter ledges in Crystalline Spire previously inaccessible",
    gatesOpenedFa: "رسیدن به صخره‌های مرتفع ۶ متری که قبلاً با پرش عادی غیرقابل دسترس بودند",
    mechanicTuning: "Second jump height: 3.8 units, Cancels downward falling momentum, Spawns small ethereal ring effect"
  },
  {
    abilityNameEn: "Light Tether (Grapple / Slingshot)",
    abilityNameFa: "کمند نوری (پرتاب به نقاط جادویی)",
    biomeUnlockedIn: "Crystalline Spire (Apex)",
    gatesOpenedEn: "Latches onto dormant celestial sparks suspended in the air to launch across massive voids",
    gatesOpenedFa: "قلاب شدن به جرقه‌های شناور معلق در آسمان و پرتاب با شتاب بالا به سمت هدف",
    mechanicTuning: "Target auto-lock radius: 7 units, Time dilation upon aiming: 0.25x timescale for 1.2s max, Launch speed: 18 units/s"
  },
  {
    abilityNameEn: "Aether Glide (Feather Descent)",
    abilityNameFa: "شناوری اتری (سقوط آرام)",
    biomeUnlockedIn: "Astral Sanctuary (Vestibule)",
    gatesOpenedEn: "Allows riding violent thermal updrafts and traversing spike floors safely",
    gatesOpenedFa: "امکان پرواز بر روی جریان‌های باد گرم و عبور ایمن از روی بسترهای تیغ‌دار طولانی",
    mechanicTuning: "Max downward drift velocity capped at 1.5 units/s, Horizontal drift speed maintained at 8.0 units/s"
  }
];
