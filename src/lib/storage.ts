const STORAGE_KEY = 'bundle-builder:config'

export interface SavedConfig {
  quantities: Record<string, number>
  activeVariant: Record<string, string>
}

export function saveConfig(config: SavedConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

export function loadConfig(): SavedConfig | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as SavedConfig
  } catch {
    return null
  }
}