import JSZip from 'jszip';
import { UNITY_PHASE0_SCRIPTS } from '../data/unityScripts';

export async function exportUnityScaffoldZip(): Promise<Blob> {
  const zip = new JSZip();

  // Root README
  zip.file(
    "Assets/_Game/README_PHASE0.txt",
    `=============================================================
AETHELGARD: ORIGINAL 2D METROIDVANIA GAME ARCHITECTURE
Phase 0: Foundation & Core Contracts (Unity 2022.3 LTS / Unity 6)
=============================================================

This directory contains the foundational, decoupled C# architecture
designed specifically to eliminate monolithic codebases and tight coupling.

DIRECTORY LAYOUT:
Assets/_Game/
  ├── Core/
  │   ├── Interfaces/        (IDamageable, IInteractable, ISaveable)
  │   ├── StateMachine/      (IState, StateMachine)
  │   ├── Events/            (VoidEventChannelSO, GenericEventChannelSO)
  │   └── Managers/          (ServiceLocator)
  ├── Gameplay/
  │   ├── Player/
  │   ├── Enemies/
  │   ├── Combat/
  │   └── Abilities/
  ├── Systems/
  │   ├── Save/              (SaveSystem, GameSaveData)
  │   └── SceneManagement/   (SceneLoader)
  └── Data/
      └── Player/            (MovementDataSO)

HOW TO USE IN UNITY:
1. Copy the 'Assets/_Game' folder directly into your Unity project Assets folder.
2. In Project Settings > Package Manager, ensure Universal RP, New Input System, and 2D Tilemap Extras are installed.
3. Create your first MovementDataSO asset via: Right Click -> Create -> Aethelgard -> Data -> Player Movement Data.
4. Enjoy a pristine, modular codebase ready for Phase 1 (Player Core Movement)!
`
  );

  // Add all C# scripts
  for (const script of UNITY_PHASE0_SCRIPTS) {
    // Strip leading "Assets/" because zip root is Assets/
    zip.file(script.path, script.code);
  }

  // Add standard .gitattributes for Unity Git LFS
  zip.file(
    ".gitattributes",
    `# Unity Git LFS configuration
*.psd filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text
*.mp3 filter=lfs diff=lfs merge=lfs -text
*.ogg filter=lfs diff=lfs merge=lfs -text
*.fbx filter=lfs diff=lfs merge=lfs -text
*.blend filter=lfs diff=lfs merge=lfs -text
*.asset filter=lfs diff=lfs merge=lfs -text
`
  );

  // Add standard Unity .gitignore
  zip.file(
    ".gitignore",
    `# Unity default ignores
[Ll]ibrary/
[Tt]emp/
[Oo]bj/
[Bb]uild/
[Bb]uilds/
[Ll]ogs/
[Uu]serSettings/
[Mm]emoryCaptures/
*.pidb.meta
*.pdb.meta
sysinfo.txt
`
  );

  return await zip.generateAsync({ type: 'blob' });
}
