import { isDemo } from '@/demo/demo.js'

function seedFromTokenId(tokenId, salt = 0) {
  const s = String(tokenId ?? '')
  let acc = 0
  for (let i = 0; i < s.length; i++) acc = (acc * 31 + s.charCodeAt(i) + salt) >>> 0
  return acc
}

/**
 * Demo-only traits generator for composing DeGamer skins locally.
 * Returns the same shape the backend used: { type, body, clothe, eyes, hairs, mouth }.
 */
export function demoTraitsForTokenId(tokenId) {
  const seed = seedFromTokenId(tokenId)

  // 1 default (dummy) + 2 random-ish is handled by the caller;
  // here we just produce a stable selection for a given tokenId.
  const pool = [
    { type: 'male', bodyMax: 3 },
    { type: 'female', bodyMax: 3 },
    { type: 'robot', bodyMax: 2 },
    { type: 'ape', bodyMax: 2 },
  ]

  const picked = pool[(seed % 3) + 1] // bias away from always male
  const body = (seed % picked.bodyMax) + 1

  return {
    type: picked.type,
    body,
    clothe: ((seed >>> 3) % 12) + 1,
    eyes: ((seed >>> 7) % 8) + 1,
    hairs: ((seed >>> 11) % 8) + 1,
    mouth: ((seed >>> 15) % 8) + 1,
  }
}

