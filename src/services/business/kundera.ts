import { hoursToMinutes, type WeeklySchedule } from '@/utils/schedule'

const WEEKDAY_HOURS = [
  { open: hoursToMinutes(8), close: hoursToMinutes(15) },
  { open: hoursToMinutes(17), close: hoursToMinutes(21) },
]
const WEEKEND_HOURS = [{ open: hoursToMinutes(8), close: hoursToMinutes(15) }]

export const KUNDERA = {
  name: 'KUNDERA',
  address: 'Donato Guerra #63 Tala Jal.',
  mapUrl:
    'https://maps.google.com/maps?q=20.6518783,-103.7016811&z=17&output=embed',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=20.6518783,-103.7016811',
  schedule: {
    0: WEEKEND_HOURS,
    1: WEEKDAY_HOURS,
    2: WEEKDAY_HOURS,
    3: WEEKDAY_HOURS,
    4: WEEKDAY_HOURS,
    5: WEEKDAY_HOURS,
    6: WEEKEND_HOURS,
  } satisfies WeeklySchedule,
  scheduleLines: [
    'Lunes a Viernes de 8:00 am a 3:00 pm y 5:00 pm a 9:00 pm',
    'Sábado y Domingo de 8:00 am a 3:00 pm',
  ],
} as const
