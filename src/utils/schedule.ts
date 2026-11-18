export interface TimeRange {
  open: number
  close: number
}

export type WeeklySchedule = Record<number, readonly TimeRange[]>

export function isOpenAt(schedule: WeeklySchedule, date: Date) {
  const minutes = date.getHours() * 60 + date.getMinutes()
  const ranges = schedule[date.getDay()] ?? []
  return ranges.some((range) => minutes >= range.open && minutes < range.close)
}

export function hoursToMinutes(hours: number, minutes = 0) {
  return hours * 60 + minutes
}
