const MIN_CONTAINED_LENGTH = 3
const CONTAINED_SCORE = 0.8
const MIN_SCORE = 0.6

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toSegments(path: string): string[] {
  return normalize(path)
    .split('/')
    .filter((segment) => segment.length > 0)
}

function toRouteUnits(path: string): string[] {
  const segments = toSegments(path)
  const words = segments.flatMap((segment) => segment.split('-'))
  return [...new Set([...segments, ...words, segments.join('/')])].filter(
    (unit) => unit.length > 0,
  )
}

function levenshtein(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      current[j] = Math.min(
        (previous[j] ?? 0) + 1,
        (current[j - 1] ?? 0) + 1,
        (previous[j - 1] ?? 0) + cost,
      )
    }
    previous = current
  }

  return previous[b.length] ?? 0
}

function similarity(typed: string, candidate: string): number {
  if (typed === candidate) {
    return 1
  }

  const longest = Math.max(typed.length, candidate.length)
  const base = 1 - levenshtein(typed, candidate) / longest
  const isContained =
    Math.min(typed.length, candidate.length) >= MIN_CONTAINED_LENGTH &&
    (candidate.includes(typed) || typed.includes(candidate))

  return isContained ? Math.max(base, CONTAINED_SCORE) : base
}

function scoreRoute(typedSegments: string[], route: string): number {
  const units = toRouteUnits(route)

  const total = typedSegments.reduce(
    (sum, segment) =>
      sum + Math.max(0, ...units.map((unit) => similarity(segment, unit))),
    0,
  )

  return total / typedSegments.length
}

export function suggestRoutes<T extends string>(
  pathname: string,
  routes: readonly T[],
  limit = 3,
): T[] {
  const typedSegments = toSegments(pathname)

  if (typedSegments.length === 0) {
    return []
  }

  return routes
    .map((route) => ({ route, score: scoreRoute(typedSegments, route) }))
    .filter((entry) => entry.score >= MIN_SCORE)
    .sort((first, second) => second.score - first.score)
    .slice(0, limit)
    .map((entry) => entry.route)
}
