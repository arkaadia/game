export interface UnityScriptFile {
  name: string;
  path: string;
  category: 'Interfaces' | 'Events' | 'StateMachine' | 'Save' | 'Scene' | 'Data' | 'Core';
  descriptionEn: string;
  descriptionFa: string;
  code: string;
}

export const UNITY_PHASE0_SCRIPTS: UnityScriptFile[] = [
  {
    name: "IDamageable.cs",
    path: "Assets/_Game/Core/Interfaces/IDamageable.cs",
    category: "Interfaces",
    descriptionEn: "Universal contract for any entity that can receive damage, knockback, and hit reactions.",
    descriptionFa: "اینترفیس عمومی برای هر موجودیتی که می‌تواند دمیج، ضربه به عقب (Knockback) و واکنش ضربه دریافت کند.",
    code: `using UnityEngine;

namespace Aethelgard.Core.Interfaces
{
    /// <summary>
    /// Contract for entities that can take damage.
    /// Completely decouples the damage dealer from the damage receiver.
    /// </summary>
    public interface IDamageable
    {
        int CurrentHealth { get; }
        int MaxHealth { get; }
        bool IsDead { get; }
        bool IsInvulnerable { get; }

        void TakeDamage(DamageInfo damageInfo);
        void Heal(int amount);
    }

    /// <summary>
    /// Value object containing damage metadata.
    /// Prevents long parameter lists and enables rich combat feedback.
    /// </summary>
    [System.Serializable]
    public struct DamageInfo
    {
        public int Amount;
        public DamageType Type;
        public Vector2 KnockbackForce;
        public Vector2 HitPoint;
        public GameObject Instigator;
        public bool IsCritical;

        public DamageInfo(int amount, DamageType type, Vector2 knockbackForce, Vector2 hitPoint, GameObject instigator = null, bool isCritical = false)
        {
            Amount = amount;
            Type = type;
            KnockbackForce = knockbackForce;
            HitPoint = hitPoint;
            Instigator = instigator;
            IsCritical = isCritical;
        }
    }

    public enum DamageType
    {
        Physical,
        Spectral,
        Hazard,
        TrueDamage
    }
}`
  },
  {
    name: "IInteractable.cs",
    path: "Assets/_Game/Core/Interfaces/IInteractable.cs",
    category: "Interfaces",
    descriptionEn: "Contract for world entities that the player can interact with (Checkpoints, NPCs, Gates, Lore stones).",
    descriptionFa: "اینترفیس برای اشیاء قابل تعامل در دنیای بازی (چک‌پوینت‌ها، دروازه‌ها، یادداشت‌های داستانی).",
    code: `using UnityEngine;

namespace Aethelgard.Core.Interfaces
{
    public interface IInteractable
    {
        string InteractionPrompt { get; }
        bool CanInteract { get; }
        Transform InteractionTransform { get; }

        void Interact(GameObject interactor);
        void OnFocusEnter();
        void OnFocusExit();
    }
}`
  },
  {
    name: "ISaveable.cs",
    path: "Assets/_Game/Core/Interfaces/ISaveable.cs",
    category: "Interfaces",
    descriptionEn: "Interface implemented by any game component that persists state between sessions.",
    descriptionFa: "اینترفیس مورد نیاز برای تمام سیستم‌ها و اشیائی که باید وضعیت آنها ذخیره شود.",
    code: `namespace Aethelgard.Core.Interfaces
{
    public interface ISaveable
    {
        /// <summary>
        /// Unique persistent identifier for this entity across scenes.
        /// </summary>
        string UniqueID { get; }

        /// <summary>
        /// Captures the current state of this object as serializable data.
        /// </summary>
        object CaptureState();

        /// <summary>
        /// Restores object state from serialized data.
        /// </summary>
        void RestoreState(object state);
    }
}`
  },
  {
    name: "IState.cs",
    path: "Assets/_Game/Core/StateMachine/IState.cs",
    category: "StateMachine",
    descriptionEn: "Base contract for finite state machine states (Enter, Execute, PhysicsExecute, Exit).",
    descriptionFa: "قرارداد استاندارد برای حالت‌های ماشین وضعیت (ورود، فریم منطقی، فریم فیزیک، خروج).",
    code: `namespace Aethelgard.Core.StateMachine
{
    public interface IState
    {
        void Enter();
        void Execute();
        void PhysicsExecute();
        void Exit();
    }
}`
  },
  {
    name: "StateMachine.cs",
    path: "Assets/_Game/Core/StateMachine/StateMachine.cs",
    category: "StateMachine",
    descriptionEn: "Generic, robust finite state machine implementation with transition safety and debug hooks.",
    descriptionFa: "پیاده‌سازی ماژولار و امن ماشین وضعیت برای پلیر و انمی بدون هیچگونه وابستگی سخت.",
    code: `using System;
using UnityEngine;

namespace Aethelgard.Core.StateMachine
{
    public class StateMachine
    {
        public IState CurrentState { get; private set; }
        public IState PreviousState { get; private set; }
        public bool IsTransitioning { get; private set; }

        public event Action<IState, IState> OnStateChanged;

        public void Initialize(IState startingState)
        {
            if (startingState == null)
            {
                Debug.LogError("[StateMachine] Cannot initialize with a null starting state!");
                return;
            }

            CurrentState = startingState;
            CurrentState.Enter();
        }

        public void ChangeState(IState newState)
        {
            if (newState == null)
            {
                Debug.LogError("[StateMachine] Attempted to change to a null state!");
                return;
            }

            if (CurrentState == newState && !IsTransitioning)
            {
                return; // Prevent redundant re-entry unless explicitly supported
            }

            IsTransitioning = true;
            PreviousState = CurrentState;

            CurrentState?.Exit();
            CurrentState = newState;
            CurrentState.Enter();

            IsTransitioning = false;
            OnStateChanged?.Invoke(PreviousState, CurrentState);
        }

        public void Update()
        {
            CurrentState?.Execute();
        }

        public void FixedUpdate()
        {
            CurrentState?.PhysicsExecute();
        }
    }
}`
  },
  {
    name: "VoidEventChannelSO.cs",
    path: "Assets/_Game/Core/Events/VoidEventChannelSO.cs",
    category: "Events",
    descriptionEn: "ScriptableObject event channel for zero-parameter broadcasts (e.g., PlayerDied, CheckpointReached).",
    descriptionFa: "کانال رویداد ScriptableObject بدون پارامتر برای ارتباط کاملاً مجزای سیستم‌ها.",
    code: `using System;
using UnityEngine;

namespace Aethelgard.Core.Events
{
    [CreateAssetMenu(fileName = "NewVoidEventChannel", menuName = "Aethelgard/Events/Void Event Channel")]
    public class VoidEventChannelSO : ScriptableObject
    {
        private Action _onEventRaised;

        public void RaiseEvent()
        {
            if (_onEventRaised != null)
            {
                _onEventRaised.Invoke();
            }
            else
            {
                #if UNITY_EDITOR
                Debug.Log($"[EventChannel] {name} was raised, but has no listeners.");
                #endif
            }
        }

        public void Subscribe(Action listener)
        {
            _onEventRaised += listener;
        }

        public void Unsubscribe(Action listener)
        {
            _onEventRaised -= listener;
        }
    }
}`
  },
  {
    name: "GenericEventChannelSO.cs",
    path: "Assets/_Game/Core/Events/GenericEventChannelSO.cs",
    category: "Events",
    descriptionEn: "Generic typed ScriptableObject event channel for passing payload data between systems without coupling.",
    descriptionFa: "کانال رویداد ژنریک با پارامتر تایپ‌شده برای انتقال داده بین سیستم‌ها بدون ایجاد Coupling.",
    code: `using System;
using UnityEngine;

namespace Aethelgard.Core.Events
{
    public abstract class GenericEventChannelSO<T> : ScriptableObject
    {
        private Action<T> _onEventRaised;

        public void RaiseEvent(T parameter)
        {
            if (_onEventRaised != null)
            {
                _onEventRaised.Invoke(parameter);
            }
            #if UNITY_EDITOR
            else
            {
                Debug.Log($"[EventChannel] {name} was raised with {parameter}, but has no active listeners.");
            }
            #endif
        }

        public void Subscribe(Action<T> listener)
        {
            _onEventRaised += listener;
        }

        public void Unsubscribe(Action<T> listener)
        {
            _onEventRaised -= listener;
        }
    }
}`
  },
  {
    name: "SaveData.cs",
    path: "Assets/_Game/Systems/Save/SaveData.cs",
    category: "Save",
    descriptionEn: "Versioned serializable game state model containing player stats, abilities, checkpoints, and visited rooms.",
    descriptionFa: "مدل داده ذخیره‌سازی دارای نسخه‌بندی (Versioned) جهت جلوگیری از فساد فایل سیو با آپدیت‌های آینده.",
    code: `using System;
using System.Collections.Generic;
using UnityEngine;

namespace Aethelgard.Systems.Save
{
    [Serializable]
    public class GameSaveData
    {
        public int SaveVersion = 1;
        public string Timestamp;
        public float PlaytimeSeconds;
        public string ProfileID;

        // Player Progress
        public Vector3 LastCheckpointPosition;
        public string LastCheckpointScene;
        public int CurrentHealth;
        public int MaxHealth;

        // Metroidvania Progression & Ability Flags
        public List<string> UnlockedAbilities = new List<string>();
        public List<string> DefeatedBosses = new List<string>();
        public List<string> CollectedRelics = new List<string>();
        public List<string> OpenedShortcuts = new List<string>();

        // World Fog & Exploration
        public List<string> VisitedRoomIDs = new List<string>();

        // Custom Key-Value Storage for Extensibility
        public Dictionary<string, string> CustomWorldFlags = new Dictionary<string, string>();

        public GameSaveData()
        {
            Timestamp = DateTime.UtcNow.ToString("o");
            CurrentHealth = 100;
            MaxHealth = 100;
        }
    }
}`
  },
  {
    name: "SaveSystem.cs",
    path: "Assets/_Game/Systems/Save/SaveSystem.cs",
    category: "Save",
    descriptionEn: "Robust atomic save/load manager with JSON serialization, backup file protection, and validation.",
    descriptionFa: "مدیریت ذخیره و بازیابی اتمیک با پشتیبان‌گیری خودکار برای جلوگیری از خراب شدن فایل‌ها در زمان قطع ناگهانی برق یا کرش.",
    code: `using System;
using System.IO;
using UnityEngine;

namespace Aethelgard.Systems.Save
{
    public static class SaveSystem
    {
        private const string SAVE_DIR = "SaveGames";
        private const string FILE_EXTENSION = ".sav";
        private const string BACKUP_EXTENSION = ".bak";

        private static string GetDirectoryPath()
        {
            return Path.Combine(Application.persistentDataPath, SAVE_DIR);
        }

        private static string GetFilePath(int slotIndex)
        {
            return Path.Combine(GetDirectoryPath(), $"save_slot_{slotIndex}{FILE_EXTENSION}");
        }

        public static bool Save(int slotIndex, GameSaveData data)
        {
            try
            {
                string dir = GetDirectoryPath();
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                string filePath = GetFilePath(slotIndex);
                string backupPath = filePath + BACKUP_EXTENSION;

                // Create backup if save exists
                if (File.Exists(filePath))
                {
                    File.Copy(filePath, backupPath, true);
                }

                data.Timestamp = DateTime.UtcNow.ToString("o");
                string json = JsonUtility.ToJson(data, true);

                // Write atomically using temporary file
                string tempPath = filePath + ".tmp";
                File.WriteAllText(tempPath, json);
                if (File.Exists(filePath)) File.Delete(filePath);
                File.Move(tempPath, filePath);

                Debug.Log($"[SaveSystem] Successfully saved slot {slotIndex} at {filePath}");
                return true;
            }
            catch (Exception ex)
            {
                Debug.LogError($"[SaveSystem] Failed to save slot {slotIndex}: {ex.Message}");
                return false;
            }
        }

        public static GameSaveData Load(int slotIndex)
        {
            string filePath = GetFilePath(slotIndex);
            string backupPath = filePath + BACKUP_EXTENSION;

            if (!File.Exists(filePath))
            {
                if (File.Exists(backupPath))
                {
                    Debug.LogWarning($"[SaveSystem] Primary save corrupted or missing, recovering from backup: {backupPath}");
                    filePath = backupPath;
                }
                else
                {
                    Debug.Log($"[SaveSystem] No save file found for slot {slotIndex}. Creating initial state.");
                    return new GameSaveData();
                }
            }

            try
            {
                string json = File.ReadAllText(filePath);
                GameSaveData data = JsonUtility.FromJson<GameSaveData>(json);
                return data ?? new GameSaveData();
            }
            catch (Exception ex)
            {
                Debug.LogError($"[SaveSystem] Failed reading save: {ex.Message}");
                return new GameSaveData();
            }
        }
    }
}`
  },
  {
    name: "SceneLoader.cs",
    path: "Assets/_Game/Systems/SceneManagement/SceneLoader.cs",
    category: "Scene",
    descriptionEn: "Additive scene manager for seamless Metroidvania room streaming and area transitions without loading screens.",
    descriptionFa: "مدیریت لودینگ ادتیو (Additive) برای استریم پیوسته محیط‌ها و اتاق‌های مترویدوانیا بدون وقفه لودینگ.",
    code: `using System;
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Aethelgard.Systems.SceneManagement
{
    public class SceneLoader : MonoBehaviour
    {
        [Header("Event Channels")]
        [SerializeField] private Core.Events.VoidEventChannelSO _onTransitionStarted;
        [SerializeField] private Core.Events.VoidEventChannelSO _onTransitionEnded;

        private bool _isLoading = false;

        public void LoadAreaAdditive(string sceneName, Action onComplete = null)
        {
            if (_isLoading) return;
            StartCoroutine(LoadSceneRoutine(sceneName, onComplete));
        }

        public void UnloadAreaAsync(string sceneName, Action onComplete = null)
        {
            StartCoroutine(UnloadSceneRoutine(sceneName, onComplete));
        }

        private IEnumerator LoadSceneRoutine(string sceneName, Action onComplete)
        {
            _isLoading = true;
            _onTransitionStarted?.RaiseEvent();

            AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(sceneName, LoadSceneMode.Additive);
            asyncLoad.allowSceneActivation = true;

            while (!asyncLoad.isDone)
            {
                yield return null;
            }

            _isLoading = false;
            _onTransitionEnded?.RaiseEvent();
            onComplete?.Invoke();
        }

        private IEnumerator UnloadSceneRoutine(string sceneName, Action onComplete)
        {
            Scene scene = SceneManager.GetSceneByName(sceneName);
            if (scene.isLoaded)
            {
                AsyncOperation asyncUnload = SceneManager.UnloadSceneAsync(scene);
                while (!asyncUnload.isDone)
                {
                    yield return null;
                }
            }
            onComplete?.Invoke();
        }
    }
}`
  },
  {
    name: "MovementDataSO.cs",
    path: "Assets/_Game/Data/Player/MovementDataSO.cs",
    category: "Data",
    descriptionEn: "Designer-friendly ScriptableObject isolating all movement tuning variables (Coyote time, Jump cut, Acceleration).",
    descriptionFa: "اسکریپتبل آبجکت تنظیمات فیزیک و حرکت پلیر بدون نیاز به تغییر منطق کد، مخصوص دیزاینرها.",
    code: `using UnityEngine;

namespace Aethelgard.Data.Player
{
    [CreateAssetMenu(fileName = "PlayerMovementData", menuName = "Aethelgard/Data/Player Movement Data")]
    public class MovementDataSO : ScriptableObject
    {
        [Header("Horizontal Movement")]
        [Tooltip("Maximum ground running speed in units/sec")]
        public float MoveSpeed = 9.5f;
        [Tooltip("Acceleration rate towards target horizontal speed")]
        public float Acceleration = 60f;
        [Tooltip("Deceleration rate when releasing horizontal input")]
        public float Deceleration = 75f;

        [Header("Jump Physics (Ori-like Fluidity)")]
        [Tooltip("Maximum jump peak height in world units")]
        public float MaxJumpHeight = 4.2f;
        [Tooltip("Time to reach max jump height in seconds")]
        public float TimeToJumpApex = 0.35f;
        [Tooltip("Gravity multiplier applied when falling for snappy weight")]
        public float FallGravityMultiplier = 1.8f;
        [Tooltip("Gravity multiplier applied when releasing jump button early (variable jump cut)")]
        public float JumpCutMultiplier = 2.4f;

        [Header("Assists & Polish Windows")]
        [Tooltip("Coyote time duration allowed after walking off an edge")]
        [Range(0.01f, 0.2f)]
        public float CoyoteTime = 0.12f;
        [Tooltip("Jump buffer duration allowed before landing")]
        [Range(0.01f, 0.25f)]
        public float JumpBufferTime = 0.15f;

        [Header("Wall Mechanics Parameters")]
        public float WallSlideSpeed = 2.8f;
        public Vector2 WallJumpForce = new Vector2(11f, 13f);
        public float WallStickTime = 0.1f;

        // Computed physics values calculated at runtime
        public float CalculatedGravity => -(2f * MaxJumpHeight) / Mathf.Pow(TimeToJumpApex, 2f);
        public float CalculatedJumpVelocity => Mathf.Abs(CalculatedGravity) * TimeToJumpApex;
    }
}`
  },
  {
    name: "ServiceLocator.cs",
    path: "Assets/_Game/Core/Managers/ServiceLocator.cs",
    category: "Core",
    descriptionEn: "Clean decoupled service registry preventing static singletons and circular dependencies.",
    descriptionFa: "سرویس لوکیتور تمیز جهت دسترسی به سرویس‌های اصلی بدون استفاده از سینگلتون‌های چسبنده و ضد الگو.",
    code: `using System;
using System.Collections.Generic;
using UnityEngine;

namespace Aethelgard.Core.Managers
{
    /// <summary>
    /// Lightweight decoupled service locator pattern.
    /// Provides access to core global services without tight singleton coupling.
    /// </summary>
    public static class ServiceLocator
    {
        private static readonly Dictionary<Type, object> _services = new Dictionary<Type, object>();

        public static void Register<T>(T service) where T : class
        {
            Type type = typeof(T);
            if (_services.ContainsKey(type))
            {
                Debug.LogWarning($"[ServiceLocator] Service {type.Name} is already registered. Overwriting.");
                _services[type] = service;
            }
            else
            {
                _services.Add(type, service);
            }
        }

        public static void Unregister<T>() where T : class
        {
            Type type = typeof(T);
            if (_services.ContainsKey(type))
            {
                _services.Remove(type);
            }
        }

        public static T Get<T>() where T : class
        {
            Type type = typeof(T);
            if (_services.TryGetValue(type, out object service))
            {
                return (T)service;
            }

            Debug.LogError($"[ServiceLocator] Service {type.Name} not found!");
            return null;
        }

        public static bool TryGet<T>(out T service) where T : class
        {
            Type type = typeof(T);
            if (_services.TryGetValue(type, out object obj))
            {
                service = (T)obj;
                return true;
            }
            service = null;
            return false;
        }
    }
}`
  }
];
