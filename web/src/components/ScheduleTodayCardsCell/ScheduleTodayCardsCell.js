import ScheduleTodayCard from '../ScheduleTodayCard'

export const QUERY = gql`
  query ScheduleTodayCardsQuery(
    $start: DateTime!
    $end: DateTime!
    $unit_id: Int!
  ) {
    scheduleTodayCards: sortiesInDateRange(
      start: $start
      end: $end
      unit_id: $unit_id
    ) {
      id
      aircraft_id
      projected_launch
      aircraft {
        status_id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ scheduleTodayCards }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 470px)',
        gap: '48px',
        justifyContent: 'space-evenly',
      }}
    >
      {scheduleTodayCards.map((sortie) => (
        <ScheduleTodayCard key={sortie.id} sortie={sortie} />
      ))}
    </div>
  )
}
