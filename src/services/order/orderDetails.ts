export const SERVICE_FEE = 25
export const RECIPIENT_NAME = 'Michell Hernandez'
export const SAVED_ADDRESSES = ['Adoquinada #19', 'Centro #17A'] as const

export type SavedAddress = (typeof SAVED_ADDRESSES)[number]
