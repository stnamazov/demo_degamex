export const isDemo = import.meta.env.VITE_DEMO_MODE === 'true'

const STORAGE_KEY = 'degamex_demo_state_v1'

function loadState() {
  if (!isDemo) return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveState(state) {
  if (!isDemo) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getDemoState() {
  const existing = loadState()
  if (existing) {
    // one-time migration: generate a stable random set of degamers
    if (!existing.__demoDegamersRandomized) {
      const randomIds = Array.from({ length: 5 }).map(() => 100 + Math.floor(Math.random() * 9000))
      const next = {
        ...existing,
        __demoDegamersRandomized: true,
        degamers: randomIds,
        activeDegamer: randomIds[0],
      }
      saveState(next)
      return next
    }
    return existing
  }

  const initial = {
    address: '0xDEMO00000000000000000000000000000000DEMO',
    authToken: 'demo-auth-token',
    __demoDegamersRandomized: true,
    degamers: Array.from({ length: 5 }).map(() => 100 + Math.floor(Math.random() * 9000)),
    activeDegamer: null,
    lootboxes: [
      { type: 'base', count: 99 },
      { type: 'rare', count: 99 },
      { type: 'myth', count: 99 },
    ],
    arena: {
      played: 12,
      wins: 7,
      losses: 5,
    },
    points: 4200,
    lastAccrual: [],
  }
  initial.activeDegamer = initial.degamers[0]
  saveState(initial)
  return initial
}

export function setDemoState(patch) {
  const next = { ...getDemoState(), ...patch }
  saveState(next)
  return next
}

export function setDemoLootboxes(lootboxes) {
  const next = { ...getDemoState(), lootboxes }
  saveState(next)
  return next
}

export function getDemoLootboxesTotalCount() {
  const state = getDemoState()
  return (state.lootboxes || []).reduce((sum, l) => sum + (parseInt(l.count) || 0), 0)
}

export function demoPickLootboxContents(type) {
  // Keep it simple but “gamey”: base -> smaller points, rare -> bigger, myth -> biggest
  const roll = Math.random()
  const points =
    type === 'myth'
      ? Math.floor(400 + roll * 600)
      : type === 'rare'
        ? Math.floor(150 + roll * 350)
        : Math.floor(50 + roll * 150)

  return [
    { title: 'DeGameX Points', value: points },
  ]
}

export function demoLeaderboard(page = 1, pageSize = 15) {
  const state = getDemoState()
  const total = 60
  const pages = Math.ceil(total / pageSize)
  const current = Math.min(Math.max(1, page), pages)
  const offset = (current - 1) * pageSize

  const list = Array.from({ length: pageSize }).map((_, i) => {
    const n = offset + i + 1
    const addr = n === 3 ? state.address : `0x${(100000 + n).toString(16).padStart(40, '0')}`
    return {
      address: addr,
      plays: 10 + (n % 17),
      wins: 4 + (n % 9),
      losses: 3 + (n % 8),
      recent_win_points: (n % 2 === 0 ? 1 : -1) * (n % 7),
      win_points: 100 + n * 3,
      points: 1000 + n * 25,
    }
  })

  return { list, offset, current, pages }
}

