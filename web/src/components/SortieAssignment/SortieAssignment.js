import { Box, Grid } from '@mui/material'
import { format } from 'date-fns'
import { useDrag } from 'react-dnd'
import { useQuery } from '@redwoodjs/web'

const QUERY = gql`
  query SortieQuery($id: Int!) {
    sortie(id: $id) {
      aircraft_id
    }
  }
`

const SortieAssignment = ({ sortie }) => {
  const { data } = useQuery(QUERY, {
    variables: { id: sortie.id },
    pollInterval: 500,
  })

  // DRAG HOOK DEFINITION /////////////////////////////
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sortie',
    item: { sortie: sortie },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const isScheduled = data?.sortie?.aircraft_id

  const formatTime = (date) => {
    return format(new Date(date), 'kk:mm')
  }

  return (
    <Box
      ref={drag}
      sx={{
        border: isScheduled ? '2px solid green' : '1px solid lightgrey',
        marginTop: '10px',
        borderRadius: '5px',
        padding: '15px',
        maxWidth: isDragging ? '500px' : null,
      }}
    >
      <Box>
        <Grid container rowSpacing={1}>
          <Grid item xs={6}>
            {sortie.call_sign}
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            {formatTime(sortie.projected_launch)}
            {' - '}
            {formatTime(sortie.projected_land)}
          </Grid>
          <Grid item xs={2}>
            {sortie.required_fuel}K
          </Grid>
          <Grid item xs={10} sx={{ textAlign: 'right' }}>
            {sortie.config}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SortieAssignment
