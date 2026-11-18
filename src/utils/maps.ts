export function buildMapUrl(address: string) {
  const query = encodeURIComponent(`${address}, Tala, Jalisco`)
  return `https://maps.google.com/maps?q=${query}&z=16&output=embed`
}

interface MappableBranch {
  address: string
  latitude: number
  longitude: number
}

// Coordenadas provisionales que usa el catálogo para negocios sin ubicación exacta.
const PLACEHOLDER_LATITUDE = 20.6537
const PLACEHOLDER_LONGITUDE = -103.7012

function hasExactCoordinates(branch: MappableBranch) {
  return !(
    branch.latitude === PLACEHOLDER_LATITUDE &&
    branch.longitude === PLACEHOLDER_LONGITUDE
  )
}

export function branchMapUrl(branch: MappableBranch) {
  if (!hasExactCoordinates(branch)) return buildMapUrl(branch.address)
  return `https://maps.google.com/maps?q=${branch.latitude},${branch.longitude}&z=17&output=embed`
}

export function branchDirectionsUrl(branch: MappableBranch) {
  const destination = hasExactCoordinates(branch)
    ? `${branch.latitude},${branch.longitude}`
    : encodeURIComponent(`${branch.address}, Tala, Jalisco`)
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}
