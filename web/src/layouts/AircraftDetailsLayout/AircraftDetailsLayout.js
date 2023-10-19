import { Link, routes, useParams } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web/toast'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import formatTailNumber from 'src/functions/formatTailNumber'

const QUERY = gql`
  query GetAircraft($id: Int!) {
    aircraft(id: $id) {
      id
      name
      status_id
      unit_id
      driver_jcn {
        id
        discrepancy
      }
    }
  }
`

export default function AircraftDetailsLayout(params) {
  const { id } = useParams()

  const { data } = useQuery(QUERY, {
    variables: { id },
  })

  const aircraft = {
    id: data?.aircraft.id,
    unit_id: data?.aircraft.unit_id,
    name: data?.aircraft.name,
    status: data?.aircraft.status_id,
    driver_jcn: {
      discrepancy: data?.aircraft.driver_jcn?.discrepancy,
    },
  }

  const statColor = (stat) => {
    let textColor = null
    if (stat.includes('FMC')) {
      textColor = 'green'
    } else if (stat.includes('PMC')) {
      textColor = 'orange'
    } else if (stat.includes('NMC')) {
      textColor = 'red'
    } else {
      textColor = 'blue'
    }

    return (
      <Typography variant="h5" sx={{ textAlign: 'center', color: textColor }}>
        {stat}
      </Typography>
    )
  }

  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '115px',
        }}
      >
        <Box style={{ display: 'flex' }}>
          <Avatar
            alt="nose art"
            src="https://c8.alamy.com/comp/E9CRGP/nose-art-of-memphis-belle-world-war-2-b-17-flying-fortress-bomber-E9CRGP.jpg"
            sx={{ margin: '1.5vw', top: '-.8vh', width: 75, height: 75 }}
          />
          <Box style={{ paddingTop: '20px' }}>
            <Grid container spacing={0}>
              <Grid item sm={12} lg={3}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {aircraft.id ? formatTailNumber(aircraft.id) : null}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} lg={9}>
                <Typography variant="h6" sx={{ paddingTop: '7px' }}>
                  {aircraft.name}
                </Typography>
              </Grid>
              <Grid item sm={12} lg={3}>
                {!aircraft.id ? null : statColor(aircraft.status)}
              </Grid>
              <Grid item sm={12} lg={6}>
                <Box sx={{ width: '320px' }}>
                  <Typography
                    sx={{
                      paddingTop: '5px',
                      color: '#6b6d6e',
                    }}
                    noWrap
                  >
                    {aircraft.driver_jcn.discrepancy}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          style={{
            paddingTop: '35px',
            paddingRight: '15px',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Link
              to={routes.aircraftDetails({ id })}
              style={{ textDecoration: 'none' }}
            >
              <Button disableElevation variant="contained">
                Details / JCNs
              </Button>
            </Link>
            <Link
              to={routes.aircraftInspections({ id })}
              style={{ textDecoration: 'none' }}
            >
              <Button disableElevation variant="contained">
                Inspections
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
      <Divider flexItem sx={{ color: 'divider' }} />
      {params.children}
    </>
  )
}
