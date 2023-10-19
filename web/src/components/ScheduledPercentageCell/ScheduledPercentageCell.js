import { nextMonday, lastDayOfWeek } from 'date-fns'
import { Typography } from '@mui/material'

const start = nextMonday(new Date())
const end = lastDayOfWeek(new Date(start), { weekStartsOn: 1 })

export const beforeQuery = ({ unit_id }) => {
  return {
    variables: { start, end, unit_id },
    fetchPolicy: 'network-only',
    pollInterval: 500,
  }
}

export const QUERY = gql`
  query SortiesDateRangeQuery(
    $start: DateTime!
    $end: DateTime!
    $unit_id: Int!
  ) {
    sorties: sortiesInDateRange(start: $start, end: $end, unit_id: $unit_id) {
      id
      aircraft {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sorties }) => {
  const scheduledSorties = sorties.filter(
    (schedSortie) => schedSortie.aircraft !== null
  )

  return (
    <Typography variant="h7" sx={{ color: 'gray' }}>
      {scheduledSorties.length} of {sorties.length} sorties scheduled
    </Typography>
  )
}
