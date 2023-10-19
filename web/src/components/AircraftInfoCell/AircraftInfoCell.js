import { startOfWeek, endOfWeek, nextMonday } from 'date-fns'

import AircraftInfo from '../AircraftInfo/AircraftInfo'

const start = startOfWeek(new Date())
const end = endOfWeek(new Date())

const start2 = nextMonday(new Date())
const end2 = endOfWeek(new Date(start2), { weekStartsOn: 1 })

const last = new Date(Date.now())

export const beforeQuery = ({ id }) => {
  const INTERVAL = 30000

  return {
    variables: {
      id: id,
      start: start,
      end: end,
      start2: start2,
      end2: end2,
      last: last,
    },
    pollInterval: INTERVAL,
  }
}

export const QUERY = gql`
  query FindAircraftInfoQuery(
    $id: Int!
    $start: DateTime!
    $end: DateTime!
    $start2: DateTime!
    $end2: DateTime!
    $last: DateTime!
  ) {
    aircraftInfo: aircraft(id: $id) {
      config
      cur_oxygen
      flight_hours
      fuel_quant
      id
      status_id
      driver_jcn {
        etic
        work_unit_code_id
      }
      parking_location
      preflight_inspection
      sorties: sortiesInDateRange(start: $start, end: $end) {
        actual_land
        projected_launch
      }
      spare: spareFlyersInDateRange(start: $start, end: $end) {
        date
      }
      lastSortieFlown(end: $last) {
        actual_land
      }
    }
    insp: calendarInspectionInDateRange(id: $id, end: $end, start: $start) {
      inspection_details
      next_due
    }
    aircraftInfo2: aircraft(id: $id) {
      config
      cur_oxygen
      flight_hours
      fuel_quant
      id
      status_id
      driver_jcn {
        etic
        work_unit_code_id
      }
      parking_location
      preflight_inspection
      sorties: publishedSortiesRange(start: $start2, end: $end2) {
        actual_land
        projected_launch
      }
      spare: publishedSpareFlyersInDateRange(start: $start2, end: $end2) {
        date
      }
    }
    insp2: calendarInspectionInDateRange(id: $id, end: $end2, start: $start2) {
      inspection_details
      next_due
    }
    nextSortie(aircraft_id: $id, start: $last) {
      projected_land
      projected_launch
      id
      call_sign
      required_fuel
      config
    }
  }
`

export const Loading = () => <div></div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  aircraftInfo,
  insp,
  aircraftInfo2,
  insp2,
  nextSortie,
}) => {
  return (
    <>
      <AircraftInfo
        aircraftInfo={aircraftInfo}
        insp={insp}
        aircraftInfo2={aircraftInfo2}
        insp2={insp2}
        nextSortie={nextSortie[0]}
      />
    </>
  )
}
