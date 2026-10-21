/** Formatea un importe en pesos mexicanos con dos decimales. */
export function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`
}
