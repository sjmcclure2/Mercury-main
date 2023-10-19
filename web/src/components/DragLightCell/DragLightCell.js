import { useQuery } from '@redwoodjs/web'
import * as React from 'react'
import { useContext } from 'react'

import { Box, Chip } from '@mui/material'
import { ActionsContext } from '../ScheduleTodayCard/ScheduleTodayCard'

export const QUERY = gql`
  query FindDragLightQuery($id: Int!) {
    sortie(id: $id) {
      crew_ready
      id
      crew_show
      engine_start
      taxi
      engine_shutdown
      actual_launch
      actual_land
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sortie }) => {
  const { data } = useQuery(QUERY, {
    variables: { id: sortie.id, sortie },
    pollInterval: 30000,
  })

  const { crewReady, crewShow, engineStart, taxi, takeOff } =
    useContext(ActionsContext)

  return (
    <Box
      sx={{
        height: '440px',
        maxWidth: '50',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '1px solid lightgrey',
      }}
    >
      {[
        takeOff || data.sortie.actual_launch,
        taxi || data.sortie.taxi,
        engineStart || data.sortie.engine_start,
        crewShow || data.sortie.crew_show,
        crewReady || data.sortie.crew_ready,
      ].map((v, i) => (
        <Chip
          key={i}
          color={v ? 'success' : 'default'}
          sx={{ height: '50px', width: '10px' }}
        />
      ))}
    </Box>
  )
}
