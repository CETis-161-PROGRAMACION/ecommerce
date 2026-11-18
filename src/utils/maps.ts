export function buildMapUrl(address: string) {
  const query = encodeURIComponent(`${address}, Tala, Jalisco`)
  return `https://maps.google.com/maps?q=${query}&z=16&output=embed`
}
