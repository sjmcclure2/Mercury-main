import { faker } from '@faker-js/faker'
import { parseISO } from 'date-fns'
import lastDayOfISOWeekYear from 'date-fns/esm/fp/lastDayOfISOWeekYear/index.js'
import { lastDayOfWeekWithOptions } from 'date-fns/fp'

import Aircraft from './Aircrafts'
import Shops from './Shops'
import WhenDiscovereds from './WhenDiscovereds'
import WorkUnitCodes from './WorkUnitCodes'

const components = [
  'Brakes',
  'Tires',
  'UHF Radio #1',
  'UHF Radio #2',
  'VHF Radio #1',
  'VHF Radio #2',
  'Toliet',
  'Data Bus',
  'Compass',
  'Processor #1',
  'Processor #2',
  'Panel',
  'Circut-Breaker',
  'Fill-Port',
  'Reciever/Transmitter',
  'Transformer / Rectifier #1',
  'Transformer / Rectifier #2',
  'Transformer / Rectifier #3',
  'Transformer / Rectifier #4',
  'Wiper Moter #1',
  'Wiper Moter #2',
  'Hydro Pump #1',
  'Hydro Pump #2',
  'Pressure Sensor',
  'FWD Engine #1 Temp Sensor',
  'RW Engine #1 Temp Sensor',
  'FWD Engine #2 Temp Sensor',
  'RW Engine #2 Temp Sensor',
  'Pitot Membrane',
  'Pilot Drink Holder',
  'Central Display Screen',
  'Standby Flight Instruments',
]
const actions = [
  'replacement',
  'inspection',
  're-install',
  'ops-check',
  'removal',
]
const intervals = ['before next flight', 'after next flight', 'next power-up']
export const symbol = ['/', 'X', '-']
const JCNs = []
for (let plane of Aircraft) {
  for (let i = 0; i < 20; i++) {
    let whenCreated = faker.date.recent(0.5)
    JCNs.push({
      jcn_id: faker.unique(
        () => {
          return (
            '21' +
            faker.datatype.number(1, { max: 2 }).toString() +
            faker.datatype.number(1).toString() +
            faker.datatype.number(1).toString() +
            faker.random.numeric(4).toString()
          )
        },
        { maxReries: 300 }
      ),
      aircraft_id: plane.id,
      unit_id: plane.unit_id,
      work_unit_code_id: faker.helpers.arrayElement(WorkUnitCodes).id,
      discrepancy: `Aircraft ${faker.helpers.arrayElement(
        components
      )} requires ${faker.helpers.arrayElement(
        actions
      )} ${faker.helpers.arrayElement(intervals)}`,
      symbol: faker.helpers.arrayElement(symbol),
      when_discovered_id: faker.helpers.arrayElement(WhenDiscovereds).id,
      is_repeat: false,
      is_recur: false,
      shop_id: faker.helpers.arrayElement(Shops).id,
      discovered_by_user_id: faker.datatype.number({ min: 1, max: 8 }),
      when_created: whenCreated,
      etic: faker.date.soon(0.8, whenCreated),
    })
  }
}

JCNs.push(
  {
    id: 8001,
    jcn_id: '222352001',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '53BD1',
    discrepancy: 'Avionic Processor #1 requires R2',
    symbol: 'X',
    when_discovered_id: 'D',
    is_repeat: false,
    is_recur: false,
    shop_id: 'AOXED',
    discovered_by_user_id: 7,
    when_created: '2022-08-25T23:00:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-25T23:00:00Z')),
  },
  {
    id: 8002,
    jcn_id: '222358900',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '53BD1',
    discrepancy: 'Aircraft Batt #2 low indicator',
    symbol: '/',
    when_discovered_id: 'D',
    is_repeat: false,
    is_recur: false,
    shop_id: 'ATGOX',
    discovered_by_user_id: 7,
    when_created: '2022-08-24T05:00:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-24T05:00:00Z')),
  },
  {
    id: 8003,
    jcn_id: '222358902',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '53BD1',
    discrepancy: '#3 hydro return line leaking at pump, Out of Limits',
    symbol: 'X',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'AOXBA',
    discovered_by_user_id: 6,
    when_created: '2022-08-24T08:48:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-24T08:48:00Z')),
  },
  {
    id: 8004,
    jcn_id: '222358985',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '18CB0',
    discrepancy: 'Pre-cooler blower inop',
    symbol: 'X',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'ATGOX',
    discovered_by_user_id: 7,
    when_created: '2022-08-23T08:48:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-23T08:48:00Z')),
  },
  {
    id: 8005,
    jcn_id: '222358904',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '23F00',
    discrepancy: 'Maint interphone station #2 hotmic',
    symbol: '/',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'AOXED',
    discovered_by_user_id: 7,
    when_created: '2022-08-24T08:00:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-24T08:00:00Z')),
  },
  {
    id: 8006,
    jcn_id: '222358980',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '53BD1',
    discrepancy: 'Avioncs Processor #1 requires reconfig',
    symbol: '/',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'AOXEW',
    discovered_by_user_id: 6,
    when_created: '2022-08-24T08:48:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-24T08:48:00Z')),
  },
  {
    id: 8007,
    jcn_id: '222358984',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '97R00',
    discrepancy: 'Radar sweep intermit',
    symbol: '/',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'AOXEW',
    discovered_by_user_id: 7,
    when_created: '2022-08-23T08:48:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-23T08:48:00Z')),
  },
  {
    id: 8008,
    jcn_id: '222358983',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '45ET5',
    discrepancy: 'Bell-check required before next flight',
    symbol: '-',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'ATGOX',
    discovered_by_user_id: 7,
    when_created: '2022-08-23T08:48:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-23T08:48:00Z')),
  },
  {
    id: 8009,
    jcn_id: '222358904',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '34GI0',
    discrepancy: 'GPS INU shows excessive Drift within Limits',
    symbol: '/',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'AOXEW',
    discovered_by_user_id: 7,
    when_created: '2022-08-24T08:00:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-24T08:00:00Z')),
  },
  {
    id: 8010,
    jcn_id: '222358980',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '75DB0',
    discrepancy: 'Brake Pads Worn, require R2',
    symbol: 'x',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'ATGOX',
    discovered_by_user_id: 6,
    when_created: '2022-08-24T08:48:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-24T08:48:00Z')),
  },
  {
    id: 8011,
    jcn_id: '222358982',
    aircraft_id: 929000,
    unit_id: 1113,
    work_unit_code_id: '18CB0',
    discrepancy: 'Apply Rain Repelant IAW 00-20-6',
    symbol: '-',
    when_discovered_id: 'F',
    is_repeat: false,
    is_recur: false,
    shop_id: 'AOXEW',
    discovered_by_user_id: 7,
    when_created: '2022-08-23T08:48:00Z',
    etic: faker.date.soon(0.8, parseISO('2022-08-23T08:48:00Z')),
  }
)
export default JCNs
