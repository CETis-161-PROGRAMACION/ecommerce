const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

export function formatPrice(amount: number) {
  return currency.format(amount)
}
