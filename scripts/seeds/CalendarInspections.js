import { faker } from '@faker-js/faker'
import { add } from 'date-fns'

import Aircraft from './Aircrafts'

const CalenderInspections = []
const scheduled = [
  {
    name: 'VLF Batts require insp/replace',
    inspection_details: 'VLF BATTS',
    frequency: 90,
    aircraft_id: '',
  },
  {
    name: 'Inspect main landing gear every 75 flhs',
    inspection_details: 'MLG',
    frequency: 75,
    aircraft_id: '',
  },
  {
    name: 'Rain Repellant requires re-application',
    inspection_details: 'Rain Rep',
    frequency: 7,
    aircraft_id: '',
  },
  {
    name: 'Drag Chutes require insp/replace',
    inspection_details: 'Drag Chutes',
    frequency: 90,
    aircraft_id: '',
  },
]

for (let x of scheduled) {
  for (let y of Aircraft) {
    const lastCompleted = faker.date.recent(25)
    CalenderInspections.push({
      ...x,
      last_completed: lastCompleted,
      next_due: add(new Date(lastCompleted), {
        days: x.frequency,
      }).toISOString(),
      aircraft_id: y.id,
    })
  }
}

export default CalenderInspections
