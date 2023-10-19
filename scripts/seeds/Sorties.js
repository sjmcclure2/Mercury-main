import { faker } from '@faker-js/faker'
import { eachWeekOfInterval, nextMonday, startOfWeek, sub } from 'date-fns'
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'

import Aircraft from './Aircrafts'
import Configs from './Configs'

const Sorties = []
const callSignNames = ['Doom', 'Death', 'Bone']

const weeks = eachWeekOfInterval(
  { start: sub(Date.now(), { years: 1 }), end: sub(Date.now(), { weeks: 1 }) },
  { weekStartsOn: 1 }
)
let weekstart = startOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString()
let projectedLand,
  projectedLaunch,
  actualLand,
  actualLaunch,
  taxi,
  engineStart,
  crewReady,
  crewShow,
  landingStatus,
  requiredFuel,
  config,
  callSign,
  aircraftId,
  unitId,
  engineShutdown

//Generates Sorties for the Current and 1 Week in the Past
for (let i = 0; i <= 15; i++) {
  requiredFuel = faker.datatype.number({ min: 180, max: 295 })
  config = faker.helpers.arrayElement(Configs)
  callSign =
    faker.helpers.arrayElement(callSignNames) +
    ' ' +
    Math.floor(Math.random() * 25)
  projectedLaunch = faker.date.soon(5, weekstart)
  projectedLand = faker.date.soon(0.25, projectedLaunch)
  crewReady = null
  crewShow = null
  taxi = null
  engineStart = null
  actualLaunch = null
  actualLand = null
  landingStatus = null
  engineShutdown = null
  if (projectedLaunch < new Date()) {
    if (projectedLand < new Date()) {
      actualLand = faker.date.soon(0.25, projectedLaunch)
      engineShutdown = faker.date.soon(0.08, actualLand)
      actualLaunch = faker.date.recent(0.25, actualLand)
      taxi = faker.date.recent(0.02, actualLaunch)
      engineStart = faker.date.recent(0.05, taxi)
      crewShow = faker.date.recent(0.05, engineStart)
      crewReady = faker.date.recent(0.1, crewShow)
    } else {
      actualLaunch = faker.date.soon(0.2, projectedLaunch)
      taxi = faker.date.recent(0.02, actualLaunch)
      engineStart = faker.date.recent(0.05, taxi)
      crewShow = faker.date.recent(0.05, engineStart)
      crewReady = faker.date.recent(0.1, crewShow)
    }
  }

  let ids = Aircraft.filter((plane) => {
    let isAvailable = true
    for (let x = 0; x < Sorties.length; x++) {
      if (Sorties[x].aircraft_id.id == plane.id) {
        if (
          areIntervalsOverlapping(
            {
              start: new Date(Sorties[x].projectedLaunch),
              end: new Date(Sorties[x].projectedLand),
            },
            {
              start: new Date(projectedLaunch),
              end: new Date(projectedLand),
            }
          )
        ) {
          isAvailable = false
        }
      }
    }
    return isAvailable
  })
  aircraftId = faker.helpers.arrayElement(ids)
  unitId = aircraftId.unit_id
  Sorties.push({
    projected_launch: projectedLaunch,
    projected_land: projectedLand,
    unit_id: unitId,
    required_fuel: requiredFuel,
    config: config,
    aircraft_id: aircraftId.id,
    call_sign: callSign,
    crew_ready: crewReady,
    crew_show: crewShow,
    taxi: taxi,
    engine_start: engineStart,
    actual_land: actualLand,
    actual_launch: actualLaunch,
    land_status: landingStatus,
    engine_shutdown: engineShutdown,
  })
}
//Generates Unassigned Sorties for the Following Week

for (let x = 0; x < 20; x++) {
  const callSign =
    faker.helpers.arrayElement(callSignNames) +
    ' ' +
    Math.floor(Math.random() * (25 - 1) + 1)
  Sorties.push({
    projected_launch: faker.date.soon(5, nextMonday(new Date())),
    projected_land: faker.date.soon(0.25, projectedLaunch),
    unit_id: 1113,
    required_fuel: faker.datatype.number({ min: 180, max: 295 }),
    config: faker.helpers.arrayElement(Configs),
    call_sign: callSign,
  })
}

//Generates Sorties for the Past 52 Weeks

for (let x = 0; x < weeks.length; x++) {
  for (let i = 0; i <= faker.datatype.number({ max: 20, min: 12 }); i++) {
    requiredFuel = faker.datatype.number({ min: 180, max: 295 })
    config = faker.helpers.arrayElement(Configs)
    callSign =
      faker.helpers.arrayElement(callSignNames) +
      ' ' +
      Math.floor(Math.random() * (25 - 1) + 1)
    //Sortie has finished
    projectedLand = faker.date.soon(5, weeks[x])
    projectedLaunch = faker.date.soon(0.25, projectedLand)
    actualLand = faker.date.soon(0.25, projectedLaunch)
    engineShutdown = faker.date.soon(0.08, actualLand)
    actualLaunch = faker.date.recent(0.25, actualLand)
    taxi = faker.date.recent(0.02, actualLaunch)
    engineStart = faker.date.recent(0.05, taxi)
    crewShow = faker.date.recent(0.05, engineStart)
    crewReady = faker.date.recent(0.1, crewShow)
    landingStatus = faker.datatype.number({ min: 1, max: 3 })
    //add Debrief Form field here const aircraftId = faker.helpers.arrayElement(ids)

    aircraftId = faker.helpers.arrayElement(Aircraft)
    unitId = aircraftId.unit_id
    Sorties.push({
      projected_launch: projectedLaunch,
      projected_land: projectedLand,
      unit_id: unitId,
      required_fuel: requiredFuel,
      config: config,
      aircraft_id: aircraftId.id,
      call_sign: callSign,
      crew_ready: crewReady,
      crew_show: crewShow,
      taxi: taxi,
      engine_start: engineStart,
      actual_land: actualLand,
      actual_launch: actualLaunch,
      land_status: landingStatus,
      engine_shutdown: engineShutdown,
    })
  }
}
Sorties.push(
  {
    projected_launch: '2022-08-26T13:30:00Z',
    projected_land: '2022-08-26T18:30:00Z',
    unit_id: 1113,
    required_fuel: 220,
    config: '8x: LRSO',
    aircraft_id: 929000,
    call_sign: 'Death 1',
    crew_ready: null,
    crew_show: null,
    taxi: null,
    engine_start: null,
    actual_land: null,
    actual_launch: null,
    land_status: null,
    engine_shutdown: null,
  },
  {
    projected_launch: '2022-08-26T08:30:00Z',
    projected_land: '2022-08-26T22:30:00Z',
    unit_id: 1113,
    required_fuel: 200,
    config: '8x: LRSO',
    aircraft_id: 200129,
    call_sign: 'Death 2',
    crew_ready: '2022-08-26T06:34:00Z',
    crew_show: '2022-08-26T06:48:00Z',
    taxi: '2022-08-26T08:13:00Z',
    engine_start: '2022-08-26T07:16:00Z',
    actual_land: null,
    actual_launch: '2022-08-26T08:26:00Z',
    land_status: null,
    engine_shutdown: null,
  },
  {
    projected_launch: '2022-08-26T11:00:00Z',
    projected_land: '2022-08-26T22:30:00Z',
    unit_id: 1113,
    required_fuel: 200,
    config: '8x: LRSO',
    aircraft_id: 402072,
    call_sign: 'Death 3',
    crew_ready: null,
    crew_show: null,
    taxi: null,
    engine_start: null,
    actual_land: null,
    actual_launch: null,
    land_status: null,
    engine_shutdown: null,
  }
)

export default Sorties
