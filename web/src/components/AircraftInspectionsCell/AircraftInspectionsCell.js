import CalendarInspectionsCard from '../CalendarInspectionsCard'
import HourlyInspectionsCard from '../HourlyInspectionsCard'

export const QUERY = gql`
  query AircraftInspectionsQuery($id: Int!) {
    aircraft(id: $id) {
      id
      flight_hours
      calendar_inspections {
        aircraft_id
        id
        name
        inspection_details
        frequency
        last_completed
      }
      hourly_inspection {
        aircraft_id
        id
        name
        inspection_details
        frequency
        last_completed
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraft }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
      }}
    >
      <CalendarInspectionsCard
        calendarInspections={aircraft.calendar_inspections}
      />
      <HourlyInspectionsCard
        hourlyInspections={aircraft.hourly_inspection}
        aircraft={aircraft}
      />
    </div>
  )
}
