import { faker } from '@faker-js/faker'

import Aircraft from './Aircrafts'

const AircraftNotes = [
  {
    note: 'Checked in with JETS EXPO, They were tooling up to do the #3 Engine on 100128',
    user_id: 5,
    aircraft_id: 100124,
  },
  {
    note: 'Bolt Stuck on the engine mount, Structures called out',
    user_id: 5,
    aircraft_id: 100124,
  },
  {
    note: 'CANN of a Flight Computer due to delays on 100124',
    user_id: 5,
    aircraft_id: 100124,
  },
  {
    timestamp: '2022-08-25T10:00:00Z',
    note: 'Refuel required prior to crew ready',
    user_id: 5,
    aircraft_id: 929000,
  },
  {
    timestamp: '2022-08-25T10:30:00Z',
    note: 'I&E delayed due to maint availability',
    user_id: 5,
    aircraft_id: 929000,
  },
  {
    timestamp: '2022-08-25T14:00:00Z',
    note: 'Berev called for A8, C3, ensure A-shop check prior to shutdown',
    user_id: 5,
    aircraft_id: 929000,
  },
  {
    timestamp: '2022-08-25T17:00:00Z',
    note: 'Code 3 for Processor fail',
    user_id: 5,
    aircraft_id: 929000,
    jcn_id: 8001,
  },
  {
    timestamp: '2022-08-25T17:30:00Z',
    note: 'AVI at jet for R2',
    user_id: 5,
    aircraft_id: 929000,
    jcn_id: 8001,
  },
  {
    timestamp: '2022-08-25T21:03:00Z',
    note: 'AVI await age for ops check',
    user_id: 5,
    aircraft_id: 929000,
    jcn_id: 8001,
  },
  {
    timestamp: '2022-08-25T23:18:00Z',
    note: 'Age delivered',
    user_id: 5,
    aircraft_id: 929000,
    jcn_id: 8001,
  },
  {
    timestamp: '2022-08-26T01:23:00Z',
    note: 'Ops check good, status back to FMC',
    user_id: 5,
    aircraft_id: 929000,
    jcn_id: 8001,
  },
  {
    timestamp: '2022-08-26T04:46:00Z',
    note: 'Refuel C/w',
    user_id: 5,
    aircraft_id: 929000,
  },
]
for (let plane of Aircraft) {
  if (plane.id != 929000) {
    AircraftNotes.push({
      timestamp: faker.date.recent(2, Date.now()),
      note: faker.lorem.lines(1),
      user_id: 5,
      aircraft_id: plane.id,
    })
  }
}

export default AircraftNotes
